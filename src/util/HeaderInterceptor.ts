import { API_VERSION_NAME, BASE_HOST, VERSION_NAME } from './Constants';
import { Cookie, Device, RequestHeaders } from './Types';

export class HeaderInterceptor {
	private clientIP: string;
	private connectionSpeed: string;
	private connectionType: string;
	private Authorization: string;
	private userAgent: string;
	private device: Device;
	private deviceInfo: string;
	private deviceUuid: string;
	private locale: string;

	public constructor(device: Device, deviceUuid: string, locale: string) {
		this.device = device;
		this.locale = locale;
		this.userAgent = `${this.device.deviceType} ${this.device.osVersion} (${this.device.screenDensity}x ${this.device.screenSize} ${this.device.model})`;
		this.deviceInfo = 'yay ' + VERSION_NAME + ' ' + this.userAgent;
		this.deviceUuid = deviceUuid;
		this.connectionType = 'wifi';
		this.clientIP = '';
		this.connectionSpeed = '';
		this.Authorization = '';
	}

	public intercept(): RequestHeaders {
		const headers: RequestHeaders = {
			Host: BASE_HOST,
			'User-Agent': this.userAgent,
			'X-Timestamp': Date.now().toString(),
			'X-App-Version': API_VERSION_NAME,
			'X-Device-Info': this.deviceInfo,
			'X-Device-UUID': this.deviceUuid,
			'X-Client-IP': this.clientIP,
			'X-Connection-Type': this.connectionType,
			'X-Connection-Speed': this.connectionSpeed,
			'Accept-Language': this.locale,
			'Content-Type': 'application/json;charset=UTF-8',
		};

		if (this.clientIP.length > 0) {
			headers['X-Client-IP'] = this.clientIP;
		}

		if (this.Authorization.length > 0) {
			headers.Authorization = this.Authorization;
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

	public setAuthHeader(accessToken: string): void {
		this.Authorization = 'Bearer ' + accessToken;
	}

	public setHeadersByCookie(cookie: Cookie): void {
		this.setAuthHeader(cookie.authentication.accessToken);
		this.deviceUuid = cookie.device.deviceUuid;
	}
}
