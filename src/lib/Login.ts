import { BaseClient } from '../client/BaseClient';
import { LoginEmailUserRequest, RequestMethod } from '../util/Types';
import { LoginUserResponse } from '../util/Responses';

export class LoginApi {
	public constructor(private readonly base: BaseClient) {}

	loginWithEmail = async (request: LoginEmailUserRequest): Promise<LoginUserResponse> => {
		return await this.base.request({
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
