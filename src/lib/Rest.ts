import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import { v4 as uuid } from 'uuid';

import { Cookie, Device, RequestHeaders, RequestOptions } from '../util/Types';
import { RESTOptions } from '../util/Types';
import { API_VERSION_NAME, BASE_API_URL, BASE_HOST, DEFAULT_DEVICE, VERSION_NAME } from '../util/Constants';
import {
	AuthenticationError,
	BadRequestError,
	ForbiddenError,
	HTTPError,
	NotFoundError,
	RateLimitError,
	ServerError,
} from './Errors';

/**
 * Represents the class that manages handlers for endpoints
 */
export class REST {
	private api: AxiosInstance;
	private clientIP: string;
	private connectionSpeed: string;
	private connectionType: string;
	private cookie?: Cookie;
	private device: Device;
	private userAgent: string;
	private deviceInfo: string;
	private deviceUuid: string;
	private uuid: string;
	private defautHeaders?: RequestHeaders;

	public constructor(options: RESTOptions) {
		this.device = options.device;
		this.userAgent = `${this.device.deviceType} ${this.device.osVersion} (${this.device.screenDensity}x ${this.device.screenSize} ${this.device.model})`;
		this.deviceInfo = 'yay ' + VERSION_NAME + ' ' + this.userAgent;
		this.deviceUuid = uuid();
		this.uuid = uuid();
		this.connectionType = 'wifi';
		this.clientIP = '';
		this.connectionSpeed = '0';
		this.defautHeaders = {
			Host: BASE_HOST,
			'User-Agent': this.userAgent,
			'X-Timestamp': Date.now().toString(),
			'X-App-Version': API_VERSION_NAME,
			'X-Device-Info': this.deviceInfo,
			'X-Device-UUID': this.deviceUuid,
			'X-Client-IP': this.clientIP,
			'X-Connection-Type': this.connectionType,
			'X-Connection-Speed': this.connectionSpeed,
			'Accept-Language': 'ja',
			'Content-Type': 'application/json;charset=UTF-8',
		};

		this.api = axios.create({
			baseURL: options.baseURL ? options.baseURL : BASE_API_URL,
			proxy: options.proxy,
			timeout: options.timeout ? options.timeout : 30000,
			headers: this.defautHeaders,
			validateStatus: function (status) {
				return true;
			},
		});
	}

	private async send(options: RequestOptions): Promise<any> {
		let headers = { ...this.defautHeaders };
		if (options.accessToken) {
			headers.Authorization = 'Bearer ' + options.accessToken;
		}

		const config: AxiosRequestConfig = {
			method: options.method,
			url: options.route,
			params: options.params,
			data: options.json,
		};

		try {
			const response: AxiosResponse = await this.api(config);
			const { status, data } = response;

			switch (status) {
				case 400:
					throw new BadRequestError(data);
				case 401:
					throw new AuthenticationError(data);
				case 403:
					throw new ForbiddenError(data);
				case 404:
					throw new NotFoundError(data);
				case 429:
					throw new RateLimitError(data);
				case 500:
					throw new ServerError(data);
				default:
					if (status >= 200 && status < 300) {
						return data;
					} else {
						throw new HTTPError(data);
					}
			}
		} catch (error) {
			throw error;
		}
	}

	public async request(options: RequestOptions): Promise<any> {
		return await this.send(options);
	}

	public getUuid(): string {
		return this.uuid;
	}

	public setUuid(uuid: string) {
		this.uuid = uuid;
	}

	public setAuthorizationHeader() {}

	public getAuthorizationHeader() {}
}
