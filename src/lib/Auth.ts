import { BaseClient } from '../client/BaseClient';
import { LoginEmailUserRequest, RequestMethod } from '../util/Types';
import { LoginUserResponse, TokenResponse } from '../util/Responses';

export class AuthAPI {
	public constructor(private readonly base: BaseClient) {}

	public getToken = async (options: {
		grantType: string;
		email?: string;
		password?: string;
		refreshToken?: string;
	}): Promise<TokenResponse> => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `api/v1/oauth/token`,
			requireAuth: false,
			json: {
				grant_type: options.grantType,
				email: options.email,
				password: options.password,
				refresh_token: options.refreshToken,
			},
		});
	};

	public loginWithEmail = async (request: LoginEmailUserRequest): Promise<LoginUserResponse> => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v3/users/login_with_email`,
			requireAuth: false,
			json: {
				api_key: request.apiKey,
				email: request.email,
				password: request.password,
				uuid: request.uuid,
			},
		});
	};
}
