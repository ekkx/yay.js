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

export class BaseClient {
	private rest: REST;
	private cookie: Cookie;
	private headerInterceptor: HeaderInterceptor;

	public readonly aiPacaAPI: AIPacaAPI;
	public readonly authAPI: AuthAPI;
	public readonly blockAPI: BlockAPI;
	public readonly callAPI: CallAPI;
	public readonly chatAPI: ChatAPI;
	public readonly configAPI: ConfigAPI;
	public readonly gameAPI: GameAPI;
	public readonly giftAPI: GiftAPI;
	public readonly groupAPI: GroupAPI;
	public readonly hiddenAPI: HiddenAPI;
	public readonly miscAPI: MiscAPI;
	public readonly muteKeywordAPI: MuteKeywordAPI;
	public readonly notificationAPI: NotificationAPI;
	public readonly postAPI: PostAPI;
	public readonly reviewAPI: ReviewAPI;
	public readonly threadAPI: ThreadAPI;
	public readonly userAPI: UserAPI;

	public constructor(options: ClientOptions) {
		if (!options.cookieFilePath) {
			options.cookieFilePath = process.cwd() + '/cookie.json';
		}

		this.cookie = new Cookie(options.saveCookie ?? false, options.cookieFilePath, options.cookiePassword);

		this.headerInterceptor = new HeaderInterceptor(DEFAULT_DEVICE, this.cookie, 'ja');
		this.headerInterceptor.setConnectionSpeed('0');

		this.rest = new REST({
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

		this.userAPI.getTimestamp().then((userTimestampResponse) => {
			const ipAddress = userTimestampResponse.ipAddress;
			this.headerInterceptor.setClientIP(ipAddress);
		});
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
