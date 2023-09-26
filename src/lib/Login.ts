import { LoginEmailUserRequest, RequestMethod } from '../util/Types';
import { REST } from './Rest';
import { LoginUserResponse } from '../util/Responses';

export class LoginApi {
	public constructor(private readonly rest: REST) {}

	loginWithEmail = async (request: LoginEmailUserRequest): Promise<LoginUserResponse> => {
		return await this.rest.request({
			method: RequestMethod.POST,
			route: `v3/users/login_with_email`,
			requireAuth: false,
			json: {
				apiKey: request.apiKey,
				email: request.email,
				password: request.password,
				uuid: request.uuid,
			},
		});
	};
}
