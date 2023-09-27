import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import snakecaseKeys from 'snakecase-keys';

import { objectToCamel } from '../util/CaseConverter';
import { Cookie, ErrorResponse, RequestOptions } from '../util/Types';
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

	public async request(options: RequestOptions): Promise<any> {
		const config: AxiosRequestConfig = {
			method: options.method,
			url: options.route,
			params: snakecaseKeys(options.params || {}, { deep: true }),
			data: snakecaseKeys(options.json || {}, { deep: true }),
			headers: options.headers,
		};

        const response: AxiosResponse = await this.api(config);
        const { status, data } = response;

        const camelCasedData = objectToCamel(data);

        switch (status) {
            case 400:
                throw new BadRequestError(camelCasedData as ErrorResponse);
            case 401:
                throw new AuthenticationError(camelCasedData as ErrorResponse);
            case 403:
                throw new ForbiddenError(camelCasedData as ErrorResponse);
            case 404:
                throw new NotFoundError(camelCasedData as ErrorResponse);
            case 429:
                throw new RateLimitError(camelCasedData as ErrorResponse);
            case 500:
                throw new ServerError(camelCasedData as ErrorResponse);
            default:
                if (status >= 200 && status < 300) {
                    return camelCasedData;
                } else {
                    throw new HTTPError(camelCasedData as ErrorResponse);
                }
        }
	}
}
