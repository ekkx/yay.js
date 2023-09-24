import { CookieOptions } from './Types';

export class CookieManager {
	private filePath: string;
	private fileName: string;
	private encryptEnabled: boolean;

	private email: string = '';
	private userId: number = 0;
	private uuid: string = '';
	private deviceUuid: string = '';
	private accessToken: string = '';
	private refreshToken: string = '';

	public constructor(filePath: string, fileName: string, encryptEnabled: boolean) {
		this.filePath = filePath;
		this.fileName = fileName;
		this.encryptEnabled = encryptEnabled;
	}

	public setCookie(options: CookieOptions) {
		this.setEmail(options.user.email);
		this.setUserId(options.user.userId);
		this.setUuid(options.user.uuid);
		this.setDeviceUuid(options.device.deviceUuid);
		this.setAccessToken(options.authentication.accessToken);
		this.setRefreshToken(options.authentication.refreshToken);
	}

	public setEmail(email: string) {
		this.email = email;
	}

	public setUserId(userId: number) {
		this.userId = userId;
	}

	public setUuid(uuid: string) {
		this.uuid = uuid;
	}

	public setDeviceUuid(deviceUuid: string) {
		this.deviceUuid = deviceUuid;
	}

	public setAccessToken(accessToken: string) {
		this.accessToken = accessToken;
	}

	public setRefreshToken(refreshToken: string) {
		this.refreshToken = refreshToken;
	}

	public saveCookie() {}

	public loadCookie() {}

	public deleteCookie() {}
}
