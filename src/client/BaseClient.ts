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
import { LoginApi } from '../lib/Login';
import { MiscApi } from '../lib/Misc';
import { MuteKeywordApi } from '../lib/MuteKeyword';
import { PostApi } from '../lib/Post';
import { ReviewApi } from '../lib/Review';
import { ThreadApi } from '../lib/Thread';
import { UserApi } from '../lib/User';
import { REST } from '../lib/Rest';

import { API_KEY, BASE_API_URL, DEFAULT_DEVICE } from '../util/Constants';
import { CookieManager } from '../util/CookieManager';
import { AuthenticationError, ErrorCode } from '../lib/Errors';
import { HeaderInterceptor } from '../util/HeaderInterceptor';
import { LoginUserResponse, UserTimestampResponse } from '../util/Responses';
import { ClientOptions, Cookie, RequestOptions } from '../util/Types';

import { v4 as uuid } from 'uuid';

export class BaseClient {
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
	public readonly login: LoginApi;
	public readonly misc: MiscApi;
	public readonly muteKeyword: MuteKeywordApi;
	public readonly post: PostApi;
	public readonly review: ReviewApi;
	public readonly thread: ThreadApi;
	public readonly user: UserApi;

	private headerInterceptor: HeaderInterceptor;
	private cookieManager?: CookieManager;
	public cookie?: Cookie;
	public deviceUuid: string;
	public uuid: string;
	private rest: REST;

	public constructor(options: ClientOptions) {
		this.deviceUuid = uuid();
		this.uuid = uuid();

		this.headerInterceptor = new HeaderInterceptor(DEFAULT_DEVICE, this.deviceUuid, 'ja');
		this.headerInterceptor.setConnectionSpeed('0');

		this.rest = new REST({
			baseURL: BASE_API_URL,
			proxy: options.proxy,
			timeout: options.timeout,
			device: DEFAULT_DEVICE,
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
		this.login = new LoginApi(this);
		this.misc = new MiscApi(this);
		this.muteKeyword = new MuteKeywordApi(this);
		this.post = new PostApi(this);
		this.review = new ReviewApi(this);
		this.thread = new ThreadApi(this);
		this.user = new UserApi(this);

		this.initUser(options);
	}

	private async initUser(options: ClientOptions) {
		const userTimestampResponse = await this.user.getTimestamp();
		const ipAddress = userTimestampResponse.ipAddress;
		this.headerInterceptor.setClientIP(ipAddress);

		if (!options.cookieFilePath) {
			options.cookieFilePath = './cookie.json';
		}

		this.cookieManager = new CookieManager(options.cookieFilePath, options.cookiePassword);

		if (options.email && options.password) {
			if (this.cookieManager.exists(options.email)) {
				this.cookie = this.cookieManager.loadCookie(options.email);
				this.deviceUuid = this.cookie.device.deviceUuid;
				this.uuid = this.cookie.user.uuid;
			} else {
				const loginResponse = await this.login.loginWithEmail({
					apiKey: API_KEY,
					email: options.email,
					password: options.password,
					uuid: this.uuid,
				});

				if (!loginResponse.accessToken) {
					throw new AuthenticationError({
						result: 'error',
						message: 'invalid email or password',
						errorCode: ErrorCode.InvalidEmailOrPassword,
						banUntil: null,
					});
				}

				this.cookie = {
					authentication: { accessToken: loginResponse.accessToken, refreshToken: loginResponse.refreshToken },
					user: { userId: loginResponse.userId, email: options.email ?? '', uuid: this.uuid },
					device: { deviceUuid: this.deviceUuid },
				};
			}
		}

		console.log(this.cookie);

		if (this.cookie !== undefined) {
			this.headerInterceptor.setHeadersByCookie(this.cookie);
			this.cookieManager.setCookie(this.cookie);
			this.deviceUuid = this.cookie.device.deviceUuid;
			this.uuid = this.cookie.user.uuid;
			this.cookieManager.saveCookie();
		}
	}

	public async request(options: RequestOptions): Promise<any> {
		const defaultHeaders = { ...this.headerInterceptor.intercept() };
		const customHeaders = { ...defaultHeaders, ...options.headers };

		options.headers = customHeaders || defaultHeaders;

		return await this.rest.request(options);
	}
}
