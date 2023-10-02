import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { objectToCamel } from '../util/CaseConverter';
import { ErrorResponse, RequestOptions } from '../util/Types';
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

/**
 * Represents the class that manages handlers for endpoints
 */
export class REST {
	private api: AxiosInstance;

	public constructor(options: RESTOptions) {
		this.api = axios.create({
			baseURL: options.baseURL ? options.baseURL : BASE_API_URL,
			proxy: options.proxy,
			timeout: options.timeout ? options.timeout : 30000,
			headers: options.defaultHeaders,
			validateStatus: function (status) {
				return true;
			},
		});
	}

	public async request(options: RequestOptions): Promise<any> {
		const config: AxiosRequestConfig = {
			method: options.method,
			url: options.route,
			params: options.params,
			data: options.json,
			headers: options.headers,
		};

		const response: AxiosResponse = await this.api(config);
		const { status, data } = response;

		const camelCasedResponse = objectToCamel(data);

		switch (status) {
			case 400:
				throw new BadRequestError(camelCasedResponse as ErrorResponse);
			case 401:
				throw new AuthenticationError(camelCasedResponse as ErrorResponse);
			case 403:
				throw new ForbiddenError(camelCasedResponse as ErrorResponse);
			case 404:
				throw new NotFoundError(camelCasedResponse as ErrorResponse);
			case 429:
				throw new RateLimitError(camelCasedResponse as ErrorResponse);
			case 500:
				throw new ServerError(camelCasedResponse as ErrorResponse);
			default:
				if (status >= 200 && status < 300) {
					return camelCasedResponse;
				} else {
					throw new HTTPError(camelCasedResponse as ErrorResponse);
				}
		}
	}
}
