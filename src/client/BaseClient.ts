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
import { ErrorCode, ForbiddenError } from '../lib/Errors';
import { HeaderInterceptor } from '../util/HeaderInterceptor';
import { LoginUserResponse } from '../util/Responses';
import { ClientOptions, CookieProps, LoginEmailUserRequest, RequestOptions } from '../util/Types';
import { YJSLogger } from '../util/Logger';

import * as pkg from '../../package.json';

export class BaseClient {
	private rest: REST;
	private cookie: Cookie;
	private headerInterceptor: HeaderInterceptor;

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

	protected logger: YJSLogger;

	public constructor(options?: ClientOptions) {
		options = options || {};

		this.cookie = new Cookie(options.saveCookie, options.cookieFilePath, options.cookiePassword);
		this.logger = new YJSLogger(options.debugMode, options.disableLog);
		this.headerInterceptor = new HeaderInterceptor(DEFAULT_DEVICE, this.cookie);
		this.headerInterceptor.setConnectionSpeed('0');

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

	protected get accessToken(): string {
		return this.cookie.accessToken;
	}

	protected get refreshToken(): string {
		return this.cookie.refreshToken;
	}

	protected get uuid(): string {
		return this.cookie.uuid;
	}

	protected get deviceUuid(): string {
		return this.cookie.deviceUuid;
	}

	protected async authenticate(options: LoginEmailUserRequest): Promise<LoginUserResponse> {
		try {
			this.cookie.load(options.email);
			this.logger.info(`yay.js v${pkg.version} - UID: ${this.userId}`);
			return {
				accessToken: this.accessToken,
				refreshToken: this.refreshToken,
				userId: this.userId,
			};
		} catch (error) {
			const res = await this.authAPI.loginWithEmail({
				apiKey: options.apiKey,
				email: options.email,
				password: options.password,
				uuid: options.uuid,
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
				user: { userId: res.userId, email: options.email ?? '', uuid: this.uuid },
				device: { deviceUuid: this.deviceUuid },
			});
			this.cookie.save();
			this.logger.info(`yay.js v${pkg.version} - UID: ${this.userId}`);
			return res;
		}
	}

	public async request(options: RequestOptions): Promise<any> {
		const defaultHeaders = { ...this.headerInterceptor.intercept() };
		const customHeaders = { ...defaultHeaders, ...options.headers };

		options.headers = customHeaders || defaultHeaders;

		return await this.rest.request(options);
	}
}
