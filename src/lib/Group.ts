import { HttpMethod } from '../util/Types';
import { BaseClient } from '../client/BaseClient';

export class GroupAPI {
	public constructor(private readonly base: BaseClient) {}

	public acceptModeratorOffer = async (options: { id: number }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/groups/${options.id}/deputize`,
			requireAuth: false,
		});
	};

	public acceptOwnershipOffer = async (options: { id: number }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/groups/${options.id}/transfer`,
			requireAuth: false,
		});
	};

	public acceptUserRequest = async (options: { id: number; userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.id}/accept/${options.userId}`,
			requireAuth: false,
		});
	};

	public addRelatedGroups = async (options: { id: number; relatedGroupId: number }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/groups/v${options.id}/related`,
			params: { 'related_group_id[]': options.relatedGroupId },
			requireAuth: false,
		});
	};

	public banUser = async (options: { id: number; userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.id}/ban/${options.userId}`,
			requireAuth: false,
		});
	};
}
