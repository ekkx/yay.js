import { BaseClient } from '../client/BaseClient';
import { ActiveFollowingsResponse, UserTimestampResponse } from '../util/Responses';
import { API_KEY } from '../util/Constants';
import { HttpMethod } from '../util/Types';
import * as util from '../util/Utils';

/**
 * ユーザーAPI
 *
 * @remarks
 * ユーザーAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class UserAPI {
	public constructor(private readonly base: BaseClient) {}

	/** @ignore */
	private get signedInfo(): string {
		return util.md5(this.base.deviceUuid, Date.now(), false);
	}

	public deleteContactFriends = async () => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v1/users/contact_friends`,
			requireAuth: false,
		});
	};

	public deleteFootprint = async (options: { userId: number; footprintId: number }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v2/users/${options.userId}/footprints/${options.footprintId}`,
			requireAuth: false,
		});
	};

	public destroyUser = async () => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/users/destroy`,
			json: {
				uuid: this.base.uuid,
				api_key: API_KEY,
				timestamp: Date.now(),
				signed_info: this.signedInfo,
			},
			requireAuth: false,
		});
	};

	public followUser = async (options: { userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/users/${options.userId}/follow`,
			requireAuth: false,
		});
	};

	public followUsers = async (options: { userIds: number[] }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/users/follow`,
			params: { 'user_ids[]': options.userIds },
			requireAuth: false,
		});
	};

	public getActiveFollowings = async (options: {
		onlyOnline: boolean;
		fromLoggedinAt?: number;
	}): Promise<ActiveFollowingsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/users/active_followings`,
			params: { only_online: options.onlyOnline, from_loggedin_at: options.fromLoggedinAt },
			requireAuth: false,
		});
	};

	public getTimestamp = async (): Promise<UserTimestampResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/users/timestamp`,
			requireAuth: false,
		});
	};
}
