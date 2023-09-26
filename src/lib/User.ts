import { UserTimestampResponse } from '../util/Responses';
import { REST } from './Rest';
import { RequestMethod } from '../util/Types';

export class UserApi {
	public constructor(private readonly rest: REST) {}

	getTimestamp = async (): Promise<UserTimestampResponse> => {
		return await this.rest.request({
			method: RequestMethod.GET,
			route: `v2/users/timestamp`,
			requireAuth: false,
		});
	};
}
