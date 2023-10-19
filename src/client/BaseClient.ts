import { AIPacaAPI } from '../lib/AIPaca';
import { AuthAPI } from '../lib/Auth';
import { BlockAPI } from '../lib/Block';
import { CallAPI } from '../lib/Call';
import { ChatAPI } from '../lib/Chat';
import { ConfigAPI } from '../lib/Config';
import { GameAPI } from '../lib/Game';
import { GiftAPI } from '../lib/Gift';
import { GroupAPI } from '../lib/Group';
import { HiddenAPI } from '../lib/Hidden';
import { MiscAPI } from '../lib/Misc';
import { MuteKeywordAPI } from '../lib/MuteKeyword';
import { NotificationAPI } from '../lib/Notification';
import { PostAPI } from '../lib/Post';
import { ReviewAPI } from '../lib/Review';
import { ThreadAPI } from '../lib/Thread';
import { UserAPI } from '../lib/User';
import { REST } from '../lib/Rest';

import { BASE_API_URL, DEFAULT_DEVICE } from '../util/Constants';
import { Cookie } from '../util/Cookie';
import {
	AuthenticationError,
	BadRequestError,
	ErrorCode,
	ForbiddenError,
	HTTPError,
	NotFoundError,
	RateLimitError,
	ServerError,
} from '../lib/Errors';
import { Events } from '../util/Events';
import { HeaderInterceptor } from '../util/HeaderInterceptor';
import { WebSocketInteractor } from '../util/WebSocketInteractor';
import { LoginUserResponse } from '../util/Responses';
import { ClientOptions, CookieProps, ErrorResponse, LoginEmailUserRequest, RequestOptions } from '../util/Types';
import { YJSLogger } from '../util/Logger';

import { packageVersion } from '../util/version';
import { AxiosResponse } from 'axios';
import EventEmitter from 'node:events';

/**
 * yay.js クライアントの基底クラス
 *
 * @remarks
 * クライアント処理を担当する、yay.js の基底クラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class BaseClient extends EventEmitter {
	private rest: REST;
	private cookie: Cookie;
	private headerInterceptor: HeaderInterceptor;
	private maxRetries: number;
	private backoffFactor: number;
	private waitOnRateLimit: boolean;
	private retryStatuses: number[];
	private intents: string[];

	protected readonly aiPacaAPI: AIPacaAPI;
	protected readonly authAPI: AuthAPI;
	protected readonly blockAPI: BlockAPI;
	protected readonly callAPI: CallAPI;
	protected readonly chatAPI: ChatAPI;
	protected readonly configAPI: ConfigAPI;
	protected readonly gameAPI: GameAPI;
	protected readonly giftAPI: GiftAPI;
	protected readonly groupAPI: GroupAPI;
	protected readonly hiddenAPI: HiddenAPI;
	protected readonly miscAPI: MiscAPI;
	protected readonly muteKeywordAPI: MuteKeywordAPI;
	protected readonly notificationAPI: NotificationAPI;
	protected readonly postAPI: PostAPI;
	protected readonly reviewAPI: ReviewAPI;
	protected readonly threadAPI: ThreadAPI;
	protected readonly userAPI: UserAPI;

	protected ws: WebSocketInteractor;

	public logger: YJSLogger;

	public constructor(options?: ClientOptions) {
		super();

		options = options || {};

		this.maxRetries = options.maxRetries ?? 3;
		this.backoffFactor = options.backoffFactor ?? 1.5;
		this.waitOnRateLimit = options.waitOnRateLimit ?? true;
		this.retryStatuses = [500, 502, 503, 504];
		this.intents = options.intents ?? [];

		this.cookie = new Cookie(options.saveCookie, options.cookieFilePath, options.cookiePassword);
		this.logger = new YJSLogger(options.debugMode, options.disableLog);

		this.headerInterceptor = new HeaderInterceptor(DEFAULT_DEVICE, this.cookie);
		this.headerInterceptor.setConnectionSpeed('0');

		this.ws = new WebSocketInteractor(this);

		this.rest = new REST({
			logger: this.logger,
			baseURL: BASE_API_URL,
			proxy: options.proxy,
			timeout: options.timeout,
			defaultHeaders: this.headerInterceptor.intercept(),
		});

		this.aiPacaAPI = new AIPacaAPI(this);
		this.authAPI = new AuthAPI(this);
		this.blockAPI = new BlockAPI(this);
		this.callAPI = new CallAPI(this);
		this.chatAPI = new ChatAPI(this);
		this.configAPI = new ConfigAPI(this);
		this.gameAPI = new GameAPI(this);
		this.giftAPI = new GiftAPI(this);
		this.groupAPI = new GroupAPI(this);
		this.hiddenAPI = new HiddenAPI(this);
		this.miscAPI = new MiscAPI(this);
		this.muteKeywordAPI = new MuteKeywordAPI(this);
		this.notificationAPI = new NotificationAPI(this);
		this.postAPI = new PostAPI(this);
		this.reviewAPI = new ReviewAPI(this);
		this.threadAPI = new ThreadAPI(this);
		this.userAPI = new UserAPI(this);
	}

	public get cookies(): CookieProps {
		return this.cookie.get();
	}

	public get userId(): number {
		return this.cookie.userId;
	}

	public get uuid(): string {
		return this.cookie.uuid;
	}

	public get deviceUuid(): string {
		return this.cookie.deviceUuid;
	}

	protected get accessToken(): string {
		return this.cookie.accessToken;
	}

	protected get refreshToken(): string {
		return this.cookie.refreshToken;
	}

	/**
	 * 認証します
	 *
	 * @param options - 認証情報のオプション
	 */
	private async authenticate(options: { email: string; password: string }): Promise<LoginUserResponse> {
		try {
			this.cookie.load(options.email);
			return {
				accessToken: this.accessToken,
				refreshToken: this.refreshToken,
				userId: this.userId,
			};
		} catch (error) {
			const res = await this.authAPI.loginWithEmail({
				email: options.email,
				password: options.password,
			});
			if (!res.accessToken) {
				throw new ForbiddenError({
					result: 'error',
					message: 'invalid email or password',
					errorCode: ErrorCode.InvalidEmailOrPassword,
					banUntil: null,
				});
			}
			this.cookie.set({
				authentication: { accessToken: res.accessToken, refreshToken: res.refreshToken },
				user: { userId: res.userId, email: options?.email, uuid: this.uuid },
				device: { deviceUuid: this.deviceUuid },
			});
			this.cookie.save();
			return res;
		}
	}

	/**
	 * クライアントを初期化します
	 */
	protected async prepare(options: LoginEmailUserRequest): Promise<LoginUserResponse> {
		const res = await this.authenticate(options);

		this.logger.info(`yay.js v${packageVersion} - UID: ${this.userId}`);

		if (this.intents.length) {
			this.logger.info('Connecting to Gateway.');

			const wsToken = (await this.miscAPI.getWebSocketToken()).token;
			this.ws.connect(wsToken, this.intents);

			this.on(Events.WebSocketTokenExpire, async () => {
				this.logger.debug('WebSocket token expired.');

				const wsToken = (await this.miscAPI.getWebSocketToken()).token;
				this.ws.connect(wsToken, this.intents);
			});
		}

		// 利用規約に同意する
		const policyResponse = await this.miscAPI.getPolicyAgreements();
		if (!policyResponse.latestPrivacyPolicyAgreed) this.miscAPI.acceptPolicyAgreement({ type: 'privacy_policy' });
		if (!policyResponse.latestTermsOfUseAgreed) this.miscAPI.acceptPolicyAgreement({ type: 'terms_of_use' });

		return res;
	}

	/**
	 * HTTPリクエストを送信します
	 *
	 * @param options - リクエストを送信するためのオプション
	 */
	public async request(options: RequestOptions): Promise<any> {
		// X-Client-IPがヘッダーになければ設定する
		if (!this.headerInterceptor.getClientIP() && options.route !== 'v2/users/timestamp') {
			const res = await this.userAPI.getTimestamp();
			this.headerInterceptor.setClientIP(res.ipAddress);
		}

		let response: AxiosResponse | undefined = undefined;
		let backoffDuration: number = 0;
		let authRetryCount: number = 0;
		const maxAuthRetries: number = 2;
		const maxRateLimitRetries: number = 15;

		for (let i = 0; i < this.maxRetries; i++) {
			if (backoffDuration > 0) {
				await new Promise((resolve) => setTimeout(resolve, backoffDuration));
			}

			const defaultHeaders = { ...this.headerInterceptor.intercept() };
			const customHeaders = { ...options.headers, ...defaultHeaders };

			options.headers = customHeaders || defaultHeaders;

			response = await this.rest.request(options);

			// アクセストークンの有効期限が切れたらリフレッシュする
			if (this.isAccessTokenExpiredError(response)) {
				if (options.route === 'api/v1/oauth/token') {
					throw new AuthenticationError(response.data);
				}

				authRetryCount++;

				if (authRetryCount < maxAuthRetries) {
					await this.refreshTokens();
					continue;
				} else {
					this.cookie.destroy();
					response.data.message = '認証の再試行に失敗しました。再ログインしてください。';
					throw new AuthenticationError(response.data);
				}
			}

			// レート制限の場合は待機する
			if (this.waitOnRateLimit && this.isRateLimitError(response)) {
				let rateLimitRetryCount: number = 1;

				while (rateLimitRetryCount < maxRateLimitRetries) {
					const retryAfter: number = 60 * 5;
					this.logger.warn(`レート制限に達しました。再試行まで ${retryAfter}秒 待機します。`);

					await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
				}

				options.headers['X-Timestamp'] = Date.now().toString();

				const response = await this.rest.request(options);

				if (!this.isRateLimitError(response)) {
					break;
				}

				rateLimitRetryCount++;

				if (rateLimitRetryCount >= maxRateLimitRetries) {
					response.data.message = 'レート制限の最大再試行回数に達しました。';
					throw new RateLimitError(response.data);
				}
			}

			if (response && !this.retryStatuses.includes(response.status)) {
				break;
			}

			if (response) {
				this.logger.error(`リクエストに失敗しました。再試行しています。[code: ${response.status}]`);
			} else {
				this.logger.error('リクエストに失敗しました。再試行しています。');
			}

			backoffDuration = this.backoffFactor * Math.pow(2, i);
		}

		if (response) {
			return this.handleResponse(response);
		}
	}

	private isAccessTokenExpiredError(response: AxiosResponse): boolean {
		return (
			response.status === 401 &&
			(response.data.errorCode === ErrorCode.AccessTokenExpired ||
				response.data.errorCode === ErrorCode.AccessTokenInvalid)
		);
	}

	private isRateLimitError(response: AxiosResponse): boolean {
		if (response.status === 429) {
			return true;
		}
		if (response.status === 400) {
			if (response.data.errorCode === ErrorCode.QuotaLimitExceeded) {
				return true;
			}
		}
		return false;
	}

	private async refreshTokens(): Promise<void> {
		const res = await this.authAPI.getToken({ grantType: 'refresh_token', refreshToken: this.refreshToken });

		this.cookie.set({
			...this.cookies,
			authentication: { accessToken: res.accessToken, refreshToken: res.refreshToken },
		});
		this.cookie.save();
	}

	private handleResponse(response: AxiosResponse): any {
		const { status, data } = response;
		switch (status) {
			case 400:
				throw new BadRequestError(data as ErrorResponse);
			case 401:
				throw new AuthenticationError(data as ErrorResponse);
			case 403:
				throw new ForbiddenError(data as ErrorResponse);
			case 404:
				throw new NotFoundError(data as ErrorResponse);
			case 429:
				throw new RateLimitError(data as ErrorResponse);
			case 500:
				throw new ServerError(data as ErrorResponse);
			default:
				if (status >= 200 && status < 300) {
					return data;
				} else {
					throw new HTTPError(data as ErrorResponse);
				}
		}
	}

	protected getPostType(options: Record<string, any>): string {
		if (options.choices) {
			return 'survey';
		} else if (options.sharedUrl) {
			return 'shareable_url';
		} else if (options.videoFileName) {
			return 'video';
		} else if (options.attachmentFileName) {
			return 'image';
		} else {
			return 'text';
		}
	}
}
