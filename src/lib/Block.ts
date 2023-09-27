import { BaseClient } from '../client/BaseClient';
import { Params, RequestMethod } from '../util/Types';
import { BlockedUserIdsResponse, BlockedUsersResponse } from '../util/Responses';

export class BlockApi {
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
		const params: Params = {};

		if (nickname) params.nickname = nickname;
		if (username) params.username = username;
		if (biography) params.biography = biography;
		if (prefecture) params.prefecture = prefecture;
		if (gender) params.gender = gender;
		if (fromId) params.fromId = fromId;

		return await this.base.request({
			method: RequestMethod.POST,
			route: `v2/users/blocked`,
			requireAuth: true,
			params: params,
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
