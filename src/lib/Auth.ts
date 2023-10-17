import { BaseClient } from '../client/BaseClient';
import { LoginEmailUserRequest, HttpMethod } from '../util/Types';
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
			method: HttpMethod.POST,
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
			method: HttpMethod.POST,
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
