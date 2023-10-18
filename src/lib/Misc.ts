import { PolicyAgreementsResponse, WebSocketTokenResponse } from '../util/Responses';
import { BaseClient } from '../client/BaseClient';
import { HttpMethod } from '../util/Types';

/**
 * 雑多API
 *
 * @remarks
 * カテゴリ化できないAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class MiscAPI {
	public constructor(private readonly base: BaseClient) {}

	public acceptPolicyAgreement = async (options: { type: string }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/users/policy_agreements/${options.type}`,
			requireAuth: true,
		});
	};

	public getPolicyAgreements = async (): Promise<PolicyAgreementsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/users/policy_agreements`,
			requireAuth: true,
		});
	};

	public getWebSocketToken = async (): Promise<WebSocketTokenResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/users/ws_token`,
			requireAuth: false,
		});
	};
}
