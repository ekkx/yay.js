import { BaseClient } from '../client/BaseClient';
import { UserTimestampResponse } from '../util/Responses';
import { RequestMethod } from '../util/Types';

export class UserApi {
	public constructor(private readonly base: BaseClient) {}

	getTimestamp = async (): Promise<UserTimestampResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v2/users/timestamp`,
			requireAuth: false,
		});
	};
}
