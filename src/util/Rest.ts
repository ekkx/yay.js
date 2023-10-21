import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { objectToCamel } from './CaseConverter';
import { RequestObject, RequestOptions } from './Types';
import { RESTOptions } from './Types';
import { BASE_API_URL } from './Constants';
import { YJSLogger } from './Logger';

/**
 * Rest API のクラス
 *
 * @remarks
 * サーバーサイドとのHTTP通信を担当するクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class REST {
	private logger: YJSLogger;
	private api: AxiosInstance;

	public constructor(options: RESTOptions) {
		this.logger = options.logger;
		this.api = axios.create({
			baseURL: options.baseURL ?? BASE_API_URL,
			proxy: options.proxy,
			timeout: options.timeout ?? 30000,
			headers: options.defaultHeaders,
			validateStatus: function (status) {
				return true;
			},
		});
	}

	private filterRequests(obj?: RequestObject): RequestObject | undefined {
		if (!obj) {
			return undefined;
		}
		const newObj: RequestObject = {};
		for (const key in obj) {
			if (obj[key] !== undefined) {
				newObj[key] = obj[key];
			}
		}
		return newObj;
	}

	public async request(options: RequestOptions): Promise<AxiosResponse> {
		const config: AxiosRequestConfig = {
			method: options.method,
			url: options.route,
			params: this.filterRequests(options.params),
			data: this.filterRequests(options.json),
			headers: options.headers,
			baseURL: options.baseURL,
		};

		const requestDetails: string =
			'Making API request:\n\n' +
			`${JSON.stringify(config.method)}: ${JSON.stringify(config.url)}\n\n` +
			`Parameters: ${JSON.stringify(config.params)}\n\n` +
			`Headers: ${JSON.stringify(config.headers)}\n\n` +
			`Body: ${JSON.stringify(config.data)}\n`;

		this.logger.debug(requestDetails);

		const response: AxiosResponse = await this.api(config);

		const { status, data } = response;

		response.data = objectToCamel(data);

		const responseDetails: string =
			'Received API response:\n\n' + `Status code: ${status}\n\n` + `Response: ${JSON.stringify(response.data)}`;

		this.logger.debug(responseDetails);

		return response;
	}
}
