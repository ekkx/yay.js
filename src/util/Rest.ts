import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { v4 as uuid } from 'uuid';

import { RequestMethod } from './Types';
import type { RESTOptions, RequestHeaders } from './Types';
import { BASE_API_URL } from './Constants';
import {
	AuthenticationError,
	BadRequestError,
	ForbiddenError,
	HTTPError,
	NotFoundError,
	RateLimitError,
	ServerError,
} from '../lib/Errors';

/**
 * Represents the class that manages handlers for endpoints
 */
export class REST {
	private host: string;
	private api: AxiosInstance;

	public constructor(private options: RESTOptions = { host: BASE_API_URL, timeout: 30 }) {
		this.host = options.host;
		this.api = axios.create({
			baseURL: this.host,
			proxy: options.proxy || undefined,
			timeout: options.timeout * 1000,
			headers: options.headers,
			validateStatus: function (status) {
				return true;
			},
		});
	}

	public async request(
		method: string,
		route: string,
		params?: Record<string, any>,
		json?: Record<string, any>,
	): Promise<any> {
		try {
			const config: AxiosRequestConfig = {
				method,
				url: this.host + route,
				params: params,
				data: json,
			};

			const response: AxiosResponse = await this.api(config);

			if (response.status === 400) {
				throw new BadRequestError(response.data);
			}
			if (response.status === 401) {
				throw new AuthenticationError(response.data);
			}
			if (response.status === 403) {
				throw new ForbiddenError(response.data);
			}
			if (response.status === 404) {
				throw new NotFoundError(response.data);
			}
			if (response.status === 429) {
				throw new RateLimitError(response.data);
			}
			if (response.status === 500) {
				throw new ServerError(response.data);
			}

			if (200 <= response.status && response.status < 300) {
				return response.data;
			} else {
				throw new HTTPError(response.data);
			}
		} catch (error) {
			throw error;
		}
	}
}
