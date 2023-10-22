import { BaseClient } from '../client/BaseClient';
import { LoginEmailUserRequest, HttpMethod } from '../util/Types';
import { LoginUpdateResponse, LoginUserResponse, TokenResponse } from '../util/Responses';
import { API_KEY, API_VERSION_NAME } from '../util/Constants';
import * as util from '../util/Utils';
/**
 * **認証API**
 *
 * @remarks
 * 認証APIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class AuthAPI {
	public constructor(private readonly base: BaseClient) {}

	public changeEmail = async (options: {
		email: string;
		password: string;
		emailGrantToken?: string;
	}): Promise<LoginUpdateResponse> => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/users/change_email`,
			requireAuth: false,
			json: {
				api_key: API_KEY,
				email: options.email,
				password: options.password,
				email_grant_token: options.emailGrantToken,
			},
		});
	};

	public changePassword = async (options: {
		currentPassword: string;
		newPassword: string;
	}): Promise<LoginUpdateResponse> => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/users/change_password`,
			requireAuth: false,
			json: {
				api_key: API_KEY,
				current_password: options.currentPassword,
				password: options.newPassword,
			},
		});
	};

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
				api_key: API_KEY,
				email: request.email,
				password: request.password,
				uuid: this.uuid,
			},
		});
	};

	public logoutDevice = async () => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/users/logout`,
			requireAuth: false,
			json: { uuid: this.uuid },
		});
	};

	public migrateToken = async (options: { token: string }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `api/v1/oauth/token/migrate`,
			requireAuth: false,
			params: { token: options.token },
		});
	};

	public registerDeviceToken = async (options: {
		deviceToken: string;
		deviceType: string;
		osVersion: string;
		screenResolution: string;
		screenDensity: string;
		deviceModel: string;
		appsflyerId: string;
		advertisingId?: string;
	}) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/users/device_tokens/new`,
			requireAuth: false,
			json: {
				device_token: options.deviceToken,
				device_type: options.deviceType,
				uuid: this.uuid,
				os_version: options.osVersion,
				app_version: API_VERSION_NAME,
				screen_resolution: options.screenResolution,
				screen_density: options.screenDensity,
				device_model: options.deviceModel,
				appsflyer_id: options.appsflyerId,
				advertising_id: options.advertisingId,
			},
		});
	};

	public resendConfirmEmail = async () => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/users/resend_confirm_email`,
			requireAuth: false,
		});
	};

	public restoreUser = async (options: { userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/users/restore`,
			requireAuth: false,
			json: {
				user_id: options.userId,
				api_key: API_KEY,
				uuid: this.uuid,
				timestamp: Math.floor(Date.now() / 1000),
				signed_info: this.signedInfo,
			},
		});
	};

	public revokeTokens = async () => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v1/users/device_tokens`,
			requireAuth: false,
		});
	};

	public saveAccountWithEmail = async (options: {
		email: string;
		password?: string;
		currentPassword?: string;
		emailGrantToken?: string;
	}) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v3/users/login_update`,
			requireAuth: false,
			json: {
				api_key: API_KEY,
				email: options.email,
				password: options.password,
				current_password: options.currentPassword,
				email_grant_token: options.emailGrantToken,
			},
		});
	};

	/** @ignore */
	private get uuid(): string {
		return this.base.uuid;
	}

	/** @ignore */
	private get deviceUuid(): string {
		return this.base.deviceUuid;
	}

	/** @ignore */
	private get signedInfo(): string {
		return util.md5(this.deviceUuid, Math.floor(Date.now() / 1000), false);
	}
}
