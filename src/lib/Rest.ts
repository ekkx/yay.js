import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

import { Cookie, RequestOptions } from '../util/Types';
import { RESTOptions } from '../util/Types';
import { BASE_API_URL } from '../util/Constants';
import {
	AuthenticationError,
	BadRequestError,
	ForbiddenError,
	HTTPError,
	NotFoundError,
	RateLimitError,
	ServerError,
} from './Errors';
import { HeaderInterceptor } from '../util/HeaderInterceptor';

/**
 * Represents the class that manages handlers for endpoints
 */
export class REST {
	private headerInterceptor: HeaderInterceptor;
	private api: AxiosInstance;

	public constructor(options: RESTOptions) {
		this.headerInterceptor = options.headerInterceptor;

		this.api = axios.create({
			baseURL: options.baseURL ? options.baseURL : BASE_API_URL,
			proxy: options.proxy,
			timeout: options.timeout ? options.timeout : 30000,
			headers: this.headerInterceptor.intercept(),
			validateStatus: function (status) {
				return true;
			},
		});
	}

	private async send(options: RequestOptions): Promise<any> {
		let headers = { ...this.headerInterceptor.intercept() };

		const config: AxiosRequestConfig = {
			method: options.method,
			url: options.route,
			params: options.params,
			data: options.json,
			headers: headers,
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
}
