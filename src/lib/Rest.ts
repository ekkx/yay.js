import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import { v4 as uuid } from 'uuid';

import { CookieProps, Device, RequestHeaders, RequestOptions } from '../util/Types';
import { RESTOptions } from '../util/Types';
import { API_VERSION_NAME, BASE_API_URL, DEFAULT_DEVICE} from '../util/Constants';
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
    private cookie?: CookieProps;
    private device: Device;
    private userAgent: string;
    private deviceInfo: string;
    private headers?: RequestHeaders;

	public constructor(options: RESTOptions) {
		this.api = axios.create({
			baseURL: options.baseURL ? options.baseURL : BASE_API_URL,
			proxy: options.proxy,
			timeout: options.timeout ? options.timeout : 30000,
			validateStatus: function (status) {
				return true;
			},
		});

        this.device = options.device
        this.userAgent = `${this.device.deviceType} ${this.device.osVersion} (${this.device.screenDensity}x ${this.device.screenSize} ${this.device.model})`;
        this.deviceInfo = "yay " + this.userAgent;
        this.connectionType = "wifi";
        this.clientIP = "";
        this.connectionSpeed = "";
	}

	private async send(options: RequestOptions): Promise<any> {
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

    public setHeaders(headers?: RequestHeaders) {
        // if (!headers) {
        //     this.headers = {
        //         Host: BASE_API_URL,
        //         "User-Agent": 
        //     }
        // } else {
        //     this.headers = headers;
        // }
    }

    public setAuthorizationHeader() {}

    public getAuthorizationHeader() {}
}
