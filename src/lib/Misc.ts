import { WebSocketTokenResponse } from '../util/Responses';
import { BaseClient } from '../client/BaseClient';
import { RequestMethod } from '../util/Types';

export class MiscAPI {
	public constructor(private readonly base: BaseClient) {}

	public getWebSocketToken = async (): Promise<WebSocketTokenResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/users/ws_token`,
			requireAuth: false,
		});
	};
}
