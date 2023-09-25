import * as fs from 'fs';
import * as crypto from 'crypto';
import { promisify } from 'util';
import { Cookie } from './Types';

const fileWriter = promisify(fs.writeFile);
const fileReader = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

export class CookieManager {
	private algorithm: string;
	private filePath: string;
	private encryptionKey: Buffer | undefined;

	private email: string = '';
	private userId: number = 0;
	private uuid: string = '';
	private deviceUuid: string = '';
	private accessToken: string = '';
	private refreshToken: string = '';

	public constructor(filePath: string, password?: string) {
		this.algorithm = 'aes-256-ctr';
		this.filePath = filePath;

		if (password) {
			this.encryptionKey = this.generateKey(password);
		}
	}

	private generateKey(password: string): Buffer {
		const salt = crypto.randomBytes(16);
		const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
		return key;
	}

	private encrypt(text: string): string {
		if (this.encryptionKey) {
			const iv = crypto.randomBytes(16);
			const cipher = crypto.createCipheriv(this.algorithm, this.encryptionKey, iv);
			let encrypted = cipher.update(text);
			encrypted = Buffer.concat([encrypted, cipher.final()]);
			return iv.toString('hex') + ':' + encrypted.toString('hex');
		} else {
			throw new Error('パスワードが設定されていません。');
		}
	}

	private decrypt(text: string): string {
		if (this.encryptionKey) {
			const [ivHex, encryptedTextHex] = text.split(':');
			const iv = Buffer.from(ivHex, 'hex');
			const decipher = crypto.createDecipheriv(this.algorithm, this.encryptionKey, iv);
			let decrypted = decipher.update(encryptedTextHex, 'hex', 'utf-8');
			decrypted += decipher.final('utf-8');
			return decrypted;
		} else {
			throw new Error('パスワードが設定されていません。');
		}
	}

	public setCookie(cookie: Cookie) {
		this.setEmail(cookie.user.email);
		this.setUserId(cookie.user.userId);
		this.setUuid(cookie.user.uuid);
		this.setDeviceUuid(cookie.device.deviceUuid);
		this.setAccessToken(cookie.authentication.accessToken);
		this.setRefreshToken(cookie.authentication.refreshToken);
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
		const data: Cookie = {
			user: {
				email: this.email,
				userId: this.userId,
				uuid: this.encryptionKey ? this.encrypt(this.uuid) : this.uuid,
			},
			device: {
				deviceUuid: this.encryptionKey ? this.encrypt(this.deviceUuid) : this.deviceUuid,
			},
			authentication: {
				accessToken: this.encryptionKey ? this.encrypt(this.accessToken) : this.accessToken,
				refreshToken: this.encryptionKey ? this.encrypt(this.refreshToken) : this.refreshToken,
			},
		};

		const cookie = JSON.stringify(data);

		try {
			await fileWriter(this.filePath, cookie, 'utf-8');
		} catch (error) {
			throw new Error('クッキーデータの保存に失敗しました。');
		}
	}

	public async loadCookie(): Promise<Cookie> {
		try {
			const data = await fileReader(this.filePath, 'utf-8');
			const cookie: Cookie = JSON.parse(data);

			if (this.encryptionKey) {
				return {
					...cookie,
					user: {
						...cookie.user,
						uuid: this.decrypt(cookie.user.uuid),
					},
					device: {
						...cookie.device,
						deviceUuid: this.decrypt(cookie.device.deviceUuid),
					},
					authentication: {
						...cookie.authentication,
						accessToken: this.decrypt(cookie.authentication.accessToken),
						refreshToken: this.decrypt(cookie.authentication.refreshToken),
					},
				};
			}

			return cookie;
		} catch (error) {
			throw new Error('クッキーデータの読み込みに失敗しました。');
		}
	}

	public async deleteCookie() {
		try {
			await unlink(this.filePath);
		} catch (error) {
			throw new Error('クッキーデータの削除に失敗しました。');
		}
	}
}
