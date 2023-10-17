import { Walkthrough } from '../util/Models';
import { BaseClient } from '../client/BaseClient';
import { RequestMethod } from '../util/Types';

export class GameAPI {
	public constructor(private readonly base: BaseClient) {}

	public getWalkthroughs = async (options: { appId: number }): Promise<Walkthrough[]> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/games/apps/${options.appId}/walkthroughs`,
			requireAuth: false,
		});
	};

	public requestWalkthrough = async (options: { id: number }) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/groups/${options.id}/request_walkthrough`,
			requireAuth: false,
		});
	};
}
