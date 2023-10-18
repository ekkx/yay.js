import { BaseClient } from '../client/BaseClient';
import { ActiveFollowingsResponse, UserTimestampResponse } from '../util/Responses';
import { HttpMethod } from '../util/Types';

export class UserAPI {
	public constructor(private readonly base: BaseClient) {}

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

	public destroyUser = async (options: { uuid: string; apiKey: string; timestamp: string; signedInfo: string }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/users/destroy`,
			json: {
				uuid: options.uuid,
				api_key: options.apiKey,
				timestamp: options.timestamp,
				signed_info: options.signedInfo,
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
