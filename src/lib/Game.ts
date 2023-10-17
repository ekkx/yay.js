import { Walkthrough } from '../util/Models';
import { BaseClient } from '../client/BaseClient';
import { HttpMethod } from '../util/Types';

export class GameAPI {
	public constructor(private readonly base: BaseClient) {}

	public getWalkthroughs = async (options: { appId: number }): Promise<Walkthrough[]> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/games/apps/${options.appId}/walkthroughs`,
			requireAuth: false,
		});
	};

	public requestWalkthrough = async (options: { id: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.id}/request_walkthrough`,
			requireAuth: false,
		});
	};
}
