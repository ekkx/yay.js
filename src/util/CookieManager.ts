import * as fs from 'fs';
import * as crypto from 'crypto';
import { v4 as uuid } from 'uuid';
import { Cookie } from './Types';
import { YJSError } from '../lib/Errors';

export class CookieManager {
	private algorithm: string;
	private saveCookies: boolean;
	private filePath: string;
	private encryptionKey: Buffer | undefined;
	private email: string;
	private userId: number;
	private uuid: string;
	private deviceUuid: string;
	private accessToken: string;
	private refreshToken: string;

	public constructor(saveCookie: boolean, filePath: string, password?: string) {
		this.algorithm = 'aes-256-ctr';
		this.saveCookies = saveCookie;
		this.filePath = filePath;
		this.email = '';
		this.userId = 0;
		this.uuid = uuid();
		this.deviceUuid = uuid();
		this.accessToken = '';
		this.refreshToken = '';

		if (password) {
			this.encryptionKey = this.generateKey(password);
		}
	}

	private isEncrypted(cookie: Cookie): boolean {
		return cookie.authentication.accessToken.includes(':');
	}

	private generateKey(password: string): Buffer {
		const key = Buffer.alloc(32);
		const passwordBuffer = Buffer.from(password, 'utf8');
		passwordBuffer.copy(key);
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

	private encryptCookie(cookie: Cookie): Cookie {
		return {
			...cookie,
			user: {
				...cookie.user,
				uuid: this.encrypt(cookie.user.uuid),
			},
			device: {
				...cookie.device,
				deviceUuid: this.encrypt(cookie.device.deviceUuid),
			},
			authentication: {
				...cookie.authentication,
				accessToken: this.encrypt(cookie.authentication.accessToken),
				refreshToken: this.encrypt(cookie.authentication.refreshToken),
			},
		};
	}

	private decryptCookie(cookie: Cookie): Cookie {
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

	public setCookie(cookie: Cookie): void {
		this.setEmail(cookie.user.email);
		this.setUserId(cookie.user.userId);
		this.setUuid(cookie.user.uuid);
		this.setDeviceUuid(cookie.device.deviceUuid);
		this.setAccessToken(cookie.authentication.accessToken);
		this.setRefreshToken(cookie.authentication.refreshToken);
	}

	public setEmail(email: string): void {
		this.email = email;
	}

	public setUserId(userId: number): void {
		this.userId = userId;
	}

	public setUuid(uuid: string): void {
		this.uuid = uuid;
	}

	public setDeviceUuid(deviceUuid: string): void {
		this.deviceUuid = deviceUuid;
	}

	public setAccessToken(accessToken: string): void {
		this.accessToken = accessToken;
	}

	public setRefreshToken(refreshToken: string): void {
		this.refreshToken = refreshToken;
	}

	private hash(str: string): string {
		const sha256Hash = crypto.createHash('sha256');
		sha256Hash.update(str);
		return sha256Hash.digest('hex');
	}

	public getCookie(): Cookie {
		return {
			authentication: { accessToken: this.accessToken, refreshToken: this.refreshToken },
			user: { email: this.email, userId: this.userId, uuid: this.uuid },
			device: { deviceUuid: this.deviceUuid },
		};
	}

	public exists(email: string): boolean {
		try {
			const exists = fs.existsSync(this.filePath);
			if (!exists) {
				return false;
			}
			this.loadCookie(email);
			return true;
		} catch (error) {
			return false;
		}
	}

	public saveCookie(cookie?: Cookie): void {
		if (!this.saveCookies) {
			return;
		}

		if (!cookie) {
			cookie = this.getCookie();
			if (this.encryptionKey) {
				cookie = this.encryptCookie(cookie);
			}
		}
		cookie.user.email = this.hash(cookie.user.email);

		fs.writeFileSync(this.filePath, JSON.stringify(cookie), 'utf-8');
	}

	public loadCookie(email: string): Cookie {
		const data = fs.readFileSync(this.filePath, 'utf-8');
		let loadedCookie: Cookie = JSON.parse(data);

		if (this.hash(email) !== loadedCookie.user.email) {
			throw new YJSError('メールアドレスが一致しませんでした。');
		}

		loadedCookie.user.email = email;

		if (this.encryptionKey) {
			if (!this.isEncrypted(loadedCookie)) {
				loadedCookie = this.encryptCookie(loadedCookie);
				this.saveCookie(loadedCookie);
			}
			loadedCookie = this.decryptCookie(loadedCookie);
		}

		this.setCookie(loadedCookie);

		return this.getCookie();
	}

	public deleteCookie(): void {
		try {
			fs.unlinkSync(this.filePath);
		} catch (error) {
			throw new Error('クッキーデータの削除に失敗しました。');
		}
	}
}
