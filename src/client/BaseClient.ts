import { ClientOptions, RequestHeaders, RequestMethod } from '../util/Types';
import { AuthenticationError } from '../lib/Errors';
import { BASE_API_URL, BASE_HOST, DEFAULT_DEVICE } from '../util/Constants';

import { REST } from '../lib/Rest';
import { AxiosProxyConfig } from 'axios';

export class BaseClient {
	public rest: REST;

	public constructor(options: ClientOptions) {
		this.rest = new REST({
			baseURL: BASE_API_URL,
			proxy: options.proxy,
			timeout: options.timeout,
			device: DEFAULT_DEVICE,
		});
	}

	private async authenticate() {}

	private buildReqestHeaders() {}
}
