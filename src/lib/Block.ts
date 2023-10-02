import { BaseClient } from '../client/BaseClient';
import { RequestMethod } from '../util/Types';
import { BlockedUserIdsResponse, BlockedUsersResponse } from '../util/Responses';

export class BlockAPI {
	public constructor(private readonly base: BaseClient) {}

	public blockUser = async (userId: number) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/users/${userId}/block`,
			requireAuth: true,
		});
	};

	public getBlockedUserIds = async (): Promise<BlockedUserIdsResponse> => {
		return await this.base.request({ method: RequestMethod.GET, route: `v1/users/block_ids`, requireAuth: true });
	};

	public getBlockedUsers = async (
		nickname?: string,
		username?: string,
		biography?: string,
		prefecture?: string,
		gender?: number,
		fromId?: number,
	): Promise<BlockedUsersResponse> => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v2/users/blocked`,
			requireAuth: true,
			params: {
				nickname: nickname,
				username: username,
				biography: biography,
				prefecture: prefecture,
				gender: gender,
				from_id: fromId,
			},
		});
	};

	public unblockUser = async (userId: number) => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v2/users/${userId}/unblock`,
			requireAuth: true,
		});
	};
}
