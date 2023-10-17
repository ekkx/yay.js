import { BaseClient } from '../client/BaseClient';
import { UserTimestampResponse } from '../util/Responses';
import { HttpMethod } from '../util/Types';

export class UserAPI {
	public constructor(private readonly base: BaseClient) {}

	getTimestamp = async (): Promise<UserTimestampResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/users/timestamp`,
			requireAuth: false,
		});
	};
}
