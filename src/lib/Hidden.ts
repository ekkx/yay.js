import { HttpMethod } from '../util/Types';
import { BaseClient } from '../client/BaseClient';
import { HiddenResponse } from '../util/Responses';

/**
 * 非表示API
 *
 * @remarks
 * コンテンツやユーザーを非表示にするAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class HiddenAPI {
	public constructor(private readonly base: BaseClient) {}

	public getList = async (options: { from?: string; number?: number }): Promise<HiddenResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/hidden/users`,
			params: { from: options.from, number: options.number },
			requireAuth: false,
		});
	};

	public hideUser = async (options: { userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/hidden/users`,
			json: { user_id: options.userId },
			requireAuth: false,
		});
	};

	public unHideUsers = async (options: { userIds: number[] }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/hidden/users`,
			params: { 'user_ids[]': options.userIds },
			requireAuth: false,
		});
	};
}
