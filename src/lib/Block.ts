import { REST } from '../util/Rest';
import { GetBlockedUsersOptions, RequestMethod } from '../util/Types';
import { BlockedUserIdsResponse, BlockedUsersResponse } from '../util/Responses';

export class BlockApi {
	public constructor(private readonly rest: REST) {}

	blockUser = async (userId: number) => {
		return await this.rest.request({
			method: RequestMethod.POST,
			route: `v1/users/${userId}/block`,
			requireAuth: true,
		});
	};

	getBlockedUserIds = async (): Promise<BlockedUserIdsResponse> => {
		return await this.rest.request({ method: RequestMethod.GET, route: `v1/users/block_ids`, requireAuth: true });
	};

	getBlockedUsers = async (options: GetBlockedUsersOptions): Promise<BlockedUsersResponse> => {
		const params: Record<string, any> = {};

		if (options.nickname !== undefined) {
			params.nickname = options.nickname;
		}

		if (options.username !== undefined) {
			params.username = options.username;
		}

		if (options.biography !== undefined) {
			params.biography = options.biography;
		}

		if (options.prefecture !== undefined) {
			params.prefecture = options.prefecture;
		}

		if (options.gender !== undefined) {
			params.gender = options.gender;
		}

		if (options.fromId !== undefined) {
			params.from_id = options.fromId;
		}

		return await this.rest.request({
			method: RequestMethod.POST,
			route: `v2/users/blocked`,
			requireAuth: true,
			params: params,
		});
	};

	unblockUser = async (userId: number) => {
		return await this.rest.request({
			method: RequestMethod.GET,
			route: `v2/users/${userId}/unblock`,
			requireAuth: true,
		});
	};
}
