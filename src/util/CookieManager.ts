import * as fs from 'fs';
import * as readline from 'readline';
import * as crypto from 'crypto';
import { promisify } from 'util';
import { CookieOptions } from './Types';

const fileWriter = promisify(fs.writeFile);
const fileReader = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

export class CookieManager {
	private algorithm: string;
	private encryptEnabled: boolean;
	private fileName: string;

	private email: string = '';
	private userId: number = 0;
	private uuid: string = '';
	private deviceUuid: string = '';
	private accessToken: string = '';
	private refreshToken: string = '';

	private encryptionKey: string | undefined;

	public constructor(encryptEnabled: boolean, fileName: string, password?: string, filePath?: string) {
		this.algorithm = 'aes-256-ctr';
		this.encryptEnabled = encryptEnabled;
		this.fileName = filePath ? `${filePath}/${fileName}` : fileName;
		this.encryptionKey = password;

		if (this.encryptEnabled && !this.encryptionKey) {
			this.setEncryptionKey();
		}
	}

	private async setEncryptionKey() {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		this.encryptionKey = await new Promise<string>((resolve) => {
			rl.question('パスワードを設定してください: ', (key) => {
				rl.close();
				resolve(key);
			});
		});
	}

	private encrypt(text: string): string {
		if (this.encryptionKey) {
			const iv = crypto.randomBytes(16);
			const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.encryptionKey, 'hex'), iv);
			let encrypted = cipher.update(text);
			encrypted = Buffer.concat([encrypted, cipher.final()]);
			return iv.toString('hex') + ':' + encrypted.toString('hex');
		} else {
			throw new Error('パスワードが設定されていません。');
		}
	}

	private decrypt(text: string): string {
		if (this.encryptionKey) {
			const textParts = text.split(':');
			const iv = Buffer.from(textParts.shift() as string, 'hex');
			const encryptedText = Buffer.from(textParts.join(':'), 'hex');
			const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.encryptionKey, 'hex'), iv);
			let decrypted = decipher.update(encryptedText);
			decrypted = Buffer.concat([decrypted, decipher.final()]);
			return decrypted.toString();
		} else {
			throw new Error('パスワードが設定されていません。');
		}
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
				uuid: this.encryptEnabled ? this.encrypt(this.uuid) : this.uuid,
			},
			device: {
				deviceUuid: this.encryptEnabled ? this.encrypt(this.deviceUuid) : this.deviceUuid,
			},
			authentication: {
				accessToken: this.encryptEnabled ? this.encrypt(this.accessToken) : this.accessToken,
				refreshToken: this.encryptEnabled ? this.encrypt(this.refreshToken) : this.refreshToken,
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

			if (this.encryptEnabled) {
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
			await unlink(this.fileName);
		} catch (error) {
			throw new Error('クッキーデータの削除に失敗しました。');
		}
	}
}
