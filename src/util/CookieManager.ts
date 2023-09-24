import * as fs from 'fs';
import { promisify } from 'util';
import { CookieOptions } from './Types';

const fileWriter = promisify(fs.writeFile);
const fileReader = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

export class CookieManager {
	private encryptEnabled: boolean;
	private fileName: string;

	private email: string = '';
	private userId: number = 0;
	private uuid: string = '';
	private deviceUuid: string = '';
	private accessToken: string = '';
	private refreshToken: string = '';

	public constructor(encryptEnabled: boolean, fileName: string, filePath?: string) {
		this.encryptEnabled = encryptEnabled;
		this.fileName = filePath ? `${filePath}/${fileName}` : fileName;
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

	public async saveCookie() {
		const data: CookieOptions = {
			user: {
				email: this.email,
				userId: this.userId,
				uuid: this.uuid,
			},
			device: {
				deviceUuid: this.deviceUuid,
			},
			authentication: {
				accessToken: this.accessToken,
				refreshToken: this.refreshToken,
			},
		};

		const cookie = JSON.stringify(data);

		try {
			await fileWriter(this.fileName, cookie, 'utf-8');
		} catch (error) {
			throw new Error('クッキーデータの保存に失敗しました。');
		}
	}

	public async loadCookie(): Promise<CookieOptions> {
		try {
			const data = await fileReader(this.fileName, 'utf-8');
			const cookie: CookieOptions = JSON.parse(data);
			return cookie;
		} catch (error) {
			throw new Error('クッキーデータの読み込みに失敗しました。');
		}
	}

	public async deleteCookie() {
		try {
			await unlink(this.fileName);
		} catch (error) {
			throw new Error('クッキーデータの削除に失敗しました。');
		}
	}
}
