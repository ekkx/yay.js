import { BaseClient } from '../client/BaseClient';
import { HttpMethod } from '../util/Types';
import { BlockedUserIdsResponse, BlockedUsersResponse } from '../util/Responses';

export class BlockAPI {
	public constructor(private readonly base: BaseClient) {}

	public blockUser = async (options: { userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/users/${options.userId}/block`,
			requireAuth: true,
		});
	};

	public getBlockedUserIds = async (): Promise<BlockedUserIdsResponse> => {
		return await this.base.request({ method: HttpMethod.GET, route: `v1/users/block_ids`, requireAuth: true });
	};

	public getBlockedUsers = async (
		options: {
			nickname?: string;
			username?: string;
			biography?: string;
			prefecture?: string;
			gender?: number;
			fromId?: number;
		} = {},
	): Promise<BlockedUsersResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/users/blocked`,
			requireAuth: true,
			params: {
				nickname: options.nickname,
				username: options.username,
				biography: options.biography,
				prefecture: options.prefecture,
				gender: options.gender,
				from_id: options.fromId,
			},
		});
	};

	public unblockUser = async (options: {userId: number}) => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/users/${options.userId}/unblock`,
			requireAuth: true,
		});
	};
}
