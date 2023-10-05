import { API_VERSION_NAME, BASE_HOST, VERSION_NAME } from './Constants';
import { Cookie } from './Cookie';
import { Device } from './Types';

export class HeaderInterceptor {
	private clientIP: string;
	private connectionSpeed: string;
	private connectionType: string;
	private userAgent: string;
	private device: Device;
	private deviceInfo: string;
	private cookie: Cookie;
	private locale: string;

	public constructor(device: Device, cookie: Cookie, locale: string = 'ja') {
		this.device = device;
		this.locale = locale;
		this.userAgent = `${this.device.deviceType} ${this.device.osVersion} (${this.device.screenDensity}x ${this.device.screenSize} ${this.device.model})`;
		this.deviceInfo = 'yay ' + VERSION_NAME + ' ' + this.userAgent;
		this.cookie = cookie;
		this.connectionType = 'wifi';
		this.clientIP = '';
		this.connectionSpeed = '';
	}

	public intercept(): Record<string, any> {
		const headers: Record<string, any> = {
			Host: BASE_HOST,
			'User-Agent': this.userAgent,
			'X-Timestamp': Date.now().toString(),
			'X-App-Version': API_VERSION_NAME,
			'X-Device-Info': this.deviceInfo,
			'X-Device-UUID': this.cookie.deviceUuid,
			'X-Client-IP': this.clientIP,
			'X-Connection-Type': this.connectionType,
			'X-Connection-Speed': this.connectionSpeed,
			'Accept-Language': this.locale,
			'Content-Type': 'application/json;charset=UTF-8',
		};

		if (this.clientIP.length > 0) {
			headers['X-Client-IP'] = this.clientIP;
		}

		if (this.cookie.accessToken.length > 0) {
			headers.Authorization = 'Bearer ' + this.cookie.accessToken;
		}

		return headers;
	}

	public getClientIP(): string {
		return this.clientIP;
	}

	public getConnectionSpeed(): string {
		return this.connectionSpeed;
	}

	public setClientIP(clientIP: string): void {
		this.clientIP = clientIP;
	}

	public setConnectionSpeed(connectionSpeed: string): void {
		this.connectionSpeed = connectionSpeed;
	}
}
