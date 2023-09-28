import { AIPacaApi } from '../lib/AIPaca';
import { BlockApi } from '../lib/Block';
import { CallApi } from '../lib/Call';
import { CassandraApi } from '../lib/Cassandra';
import { ChatApi } from '../lib/Chat';
import { ConfigApi } from '../lib/Config';
import { GameApi } from '../lib/Game';
import { GiftApi } from '../lib/Gift';
import { GroupApi } from '../lib/Group';
import { HiddenApi } from '../lib/Hidden';
import { AuthApi } from '../lib/Auth';
import { MiscApi } from '../lib/Misc';
import { MuteKeywordApi } from '../lib/MuteKeyword';
import { PostApi } from '../lib/Post';
import { ReviewApi } from '../lib/Review';
import { ThreadApi } from '../lib/Thread';
import { UserApi } from '../lib/User';
import { REST } from '../lib/Rest';

import { BASE_API_URL, DEFAULT_DEVICE } from '../util/Constants';
import { Cookie } from '../util/Cookie';
import { ErrorCode, ForbiddenError } from '../lib/Errors';
import { HeaderInterceptor } from '../util/HeaderInterceptor';
import { LoginUserResponse, UserTimestampResponse } from '../util/Responses';
import { ClientOptions, CookieProps, LoginEmailUserRequest, RequestOptions } from '../util/Types';

export class BaseClient {
	private rest: REST;
	private headerInterceptor: HeaderInterceptor;
	public cookie: Cookie;

	public readonly AIPaca: AIPacaApi;
	public readonly block: BlockApi;
	public readonly call: CallApi;
	public readonly cassandra: CassandraApi;
	public readonly chat: ChatApi;
	public readonly config: ConfigApi;
	public readonly game: GameApi;
	public readonly gift: GiftApi;
	public readonly group: GroupApi;
	public readonly hidden: HiddenApi;
	public readonly auth: AuthApi;
	public readonly misc: MiscApi;
	public readonly muteKeyword: MuteKeywordApi;
	public readonly post: PostApi;
	public readonly review: ReviewApi;
	public readonly thread: ThreadApi;
	public readonly user: UserApi;

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

		this.AIPaca = new AIPacaApi(this);
		this.block = new BlockApi(this);
		this.call = new CallApi(this);
		this.cassandra = new CassandraApi(this);
		this.chat = new ChatApi(this);
		this.config = new ConfigApi(this);
		this.game = new GameApi(this);
		this.gift = new GiftApi(this);
		this.group = new GroupApi(this);
		this.hidden = new HiddenApi(this);
		this.auth = new AuthApi(this);
		this.misc = new MiscApi(this);
		this.muteKeyword = new MuteKeywordApi(this);
		this.post = new PostApi(this);
		this.review = new ReviewApi(this);
		this.thread = new ThreadApi(this);
		this.user = new UserApi(this);

		this.user.getTimestamp().then((userTimestampResponse: UserTimestampResponse) => {
			const ipAddress = userTimestampResponse.ipAddress;
			this.headerInterceptor.setClientIP(ipAddress);
		});
	}

	public async request(options: RequestOptions): Promise<any> {
		const defaultHeaders = { ...this.headerInterceptor.intercept() };
		const customHeaders = { ...defaultHeaders, ...options.headers };

		options.headers = customHeaders || defaultHeaders;

		return await this.rest.request(options);
	}

	public async _authenticate(options: LoginEmailUserRequest): Promise<LoginUserResponse> {
		if (this.cookie.exists(options.email)) {
			const cookie = this.cookie.load(options.email);
			return {
				accessToken: cookie.authentication.accessToken,
				refreshToken: cookie.authentication.refreshToken,
				userId: cookie.user.userId,
			};
		}
		const res = await this.auth.loginWithEmail({
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
			user: { userId: res.userId, email: options.email ?? '', uuid: this.cookie.uuid },
			device: { deviceUuid: this.cookie.deviceUuid },
		});
		this.cookie.save();
		return res;
	}
}
