import {
	EmailVerificationPresignedUrlResponse,
	PolicyAgreementsResponse,
	PresignedUrlResponse,
	PresignedUrlsResponse,
	PromotionsResponse,
	VerifyDeviceResponse,
	VipGameRewardUrlResponse,
	WebSocketTokenResponse,
} from '../util/Responses';
import { BaseClient } from '../client/BaseClient';
import { HttpMethod } from '../util/Types';
import { API_VERSION_NAME } from '../util/Constants';

/**
 * 雑多API
 *
 * @remarks
 * カテゴリ化できないAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class MiscAPI {
	public constructor(private readonly base: BaseClient) {}

	/** @ignore */
	private get uuid(): string {
		return this.base.uuid;
	}

	/** @ignore */
	private get deviceUuid(): string {
		return this.base.deviceUuid;
	}

	public acceptPolicyAgreement = async (options: { type: string }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/users/policy_agreements/${options.type}`,
			requireAuth: true,
		});
	};

	public getEmailVerificationPresignedUrl = async (options: {
		email: string;
		locale: string;
		intent?: string;
	}): Promise<EmailVerificationPresignedUrlResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/email_verification_urls`,
			json: {
				device_uuid: this.deviceUuid,
				email: options.email,
				locale: options.locale,
				intent: options.intent,
			},
			requireAuth: false,
		});
	};

	public getFileUploadPresignedUrls = async (options: { filenames: string[] }): Promise<PresignedUrlsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/buckets/presigned_urls`,
			params: { 'file_names[]': options.filenames },
			requireAuth: false,
		});
	};

	public getOldFileUploadPresignedUrl = async (options: { videoFilename: string }): Promise<PresignedUrlResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/users/presigned_url`,
			params: { video_file_name: options.videoFilename },
			requireAuth: false,
		});
	};

	public getPolicyAgreements = async (): Promise<PolicyAgreementsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/users/policy_agreements`,
			requireAuth: false,
		});
	};

	public getPromotions = async (options: { page: number; number?: number }): Promise<PromotionsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/promotions`,
			params: { page: options.page, number: options.number },
			requireAuth: false,
		});
	};

	public getVipGameRewardUrl = async (options: { deviceType: string }): Promise<VipGameRewardUrlResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/skyfall/url`,
			params: { device_type: options.deviceType },
			requireAuth: false,
		});
	};

	public getWebSocketToken = async (): Promise<WebSocketTokenResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/users/ws_token`,
			requireAuth: false,
		});
	};

	public verifyDevice = async (options: {
		platform: string;
		verificationString: string;
	}): Promise<VerifyDeviceResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/genuine_devices/verify`,
			json: {
				app_version: API_VERSION_NAME,
				platform: options.platform,
				device_uuid: this.deviceUuid,
				verification_string: options.verificationString,
			},
			requireAuth: false,
		});
	};
}
