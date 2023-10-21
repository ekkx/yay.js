import * as fs from 'fs';
import * as crypto from 'crypto';
import { v4 as uuid } from 'uuid';
import { CookieProps } from './Types';
import { YJSError } from './Errors';

const defaultFilePath = process.cwd() + '/cookie.json';

/**
 * クッキー管理クラス
 *
 * @remarks
 * ファイル操作や認証情報の暗号化処理を担当します
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class Cookie {
	private algorithm: string;
	private saveCookie: boolean;
	private filePath: string;
	private encryptionKey: Buffer | undefined;
	public email: string;
	public userId: number;
	public uuid: string;
	public deviceUuid: string;
	public accessToken: string;
	public refreshToken: string;

	public constructor(saveCookie: boolean = true, filePath: string = defaultFilePath, password?: string) {
		this.algorithm = 'aes-256-ctr';
		this.saveCookie = saveCookie;
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

	private isEncrypted(cookie: CookieProps): boolean {
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
			throw new YJSError('パスワードが設定されていません。');
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
			throw new YJSError('パスワードが設定されていません。');
		}
	}

	private encryptCookie(cookie: CookieProps): CookieProps {
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

	private decryptCookie(cookie: CookieProps): CookieProps {
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

	public set(cookie: CookieProps): void {
		this.email = cookie.user.email;
		this.userId = cookie.user.userId;
		this.uuid = cookie.user.uuid;
		this.deviceUuid = cookie.device.deviceUuid;
		this.accessToken = cookie.authentication.accessToken;
		this.refreshToken = cookie.authentication.refreshToken;
	}

	private hash(str: string): string {
		const sha256Hash = crypto.createHash('sha256');
		sha256Hash.update(str);
		return sha256Hash.digest('hex');
	}

	public get(): CookieProps {
		return {
			authentication: { accessToken: this.accessToken, refreshToken: this.refreshToken },
			user: { email: this.email, userId: this.userId, uuid: this.uuid },
			device: { deviceUuid: this.deviceUuid },
		};
	}

	public save(cookie?: CookieProps): void {
		if (!this.saveCookie) {
			return;
		}

		if (!cookie) {
			cookie = this.get();
			if (this.encryptionKey) {
				cookie = this.encryptCookie(cookie);
			}
		}
		cookie.user.email = this.hash(cookie.user.email);

		fs.writeFileSync(this.filePath, JSON.stringify(cookie), 'utf-8');
	}

	public load(email: string): CookieProps {
		const data = fs.readFileSync(this.filePath, 'utf-8');
		let loadedCookie: CookieProps = JSON.parse(data);

		if (this.hash(email) !== loadedCookie.user.email) {
			throw new YJSError('メールアドレスが一致しませんでした。');
		}

		loadedCookie.user.email = email;

		const isEncrypted = this.isEncrypted(loadedCookie);

		if (isEncrypted && !this.encryptionKey) {
			throw new YJSError('このクッキーは暗号化されています。');
		}

		if (this.encryptionKey) {
			if (!isEncrypted) {
				loadedCookie = this.encryptCookie(loadedCookie);
				this.save(loadedCookie);
			}
			loadedCookie = this.decryptCookie(loadedCookie);
		}

		this.set(loadedCookie);

		return this.get();
	}

	public destroy(): void {
		try {
			fs.unlinkSync(this.filePath);
		} catch (error) {
			throw new YJSError('クッキーデータの削除に失敗しました。');
		}
	}
}
