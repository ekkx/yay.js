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
import { ClientOptions, Cookie } from '../util/Types';

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
	public rest: REST;

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
			headerInterceptor: this.headerInterceptor,
		});

		this.AIPaca = new AIPacaApi(this.rest);
		this.block = new BlockApi(this.rest);
		this.call = new CallApi(this.rest);
		this.cassandra = new CassandraApi(this.rest);
		this.chat = new ChatApi(this.rest);
		this.config = new ConfigApi(this.rest);
		this.game = new GameApi(this.rest);
		this.gift = new GiftApi(this.rest);
		this.group = new GroupApi(this.rest);
		this.hidden = new HiddenApi(this.rest);
		this.login = new LoginApi(this.rest);
		this.misc = new MiscApi(this.rest);
		this.muteKeyword = new MuteKeywordApi(this.rest);
		this.post = new PostApi(this.rest);
		this.review = new ReviewApi(this.rest);
		this.thread = new ThreadApi(this.rest);
		this.user = new UserApi(this.rest);

		this.user.getTimestamp().then((userTimestampResponse: UserTimestampResponse) => {
			const ipAddress = userTimestampResponse.ipAddress;
			this.headerInterceptor.setClientIP(ipAddress);
		});

		if (options.saveCookie && options.email && options.password) {
			if (!options.cookieFilePath) {
				options.cookieFilePath = './cookie.json';
			}

			this.cookieManager = new CookieManager(options.cookieFilePath, options.cookiePassword);
			if (this.cookieManager.exists()) {
				this.cookie = this.cookieManager.loadCookie();
				this.deviceUuid = this.cookie.device.deviceUuid;
				this.uuid = this.cookie.user.uuid;
			} else {
				this.login
					.loginWithEmail({
						apiKey: API_KEY,
						email: options.email,
						password: options.password,
						uuid: this.uuid,
					})
					.then((loginResponse: LoginUserResponse) => {
						if (!loginResponse.accessToken) {
							throw new AuthenticationError({
								result: 'error',
								message: 'invalid email or password',
								error_code: ErrorCode.InvalidEmailOrPassword,
								ban_until: null,
							});
						}
						this.cookie = {
							authentication: { accessToken: loginResponse.accessToken, refreshToken: loginResponse.refreshToken },
							user: { userId: loginResponse.userId, email: options.email ?? '', uuid: this.uuid },
							device: { deviceUuid: this.deviceUuid },
						};
					});
			}
			this.headerInterceptor.setAuthHeader(this.cookie?.authentication.accessToken ?? '');
			// なぜかクッキーの値が保存されない
			if (this.cookie !== undefined) {
				console.log(this.cookie);
				this.cookieManager.setCookie(this.cookie);
			}
			this.cookieManager.saveCookie();
		}
	}
}
