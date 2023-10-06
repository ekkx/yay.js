import { BaseClient } from './BaseClient';
import { ClientOptions } from '../util/Types';
import { API_KEY } from '../util/Constants';
import { LoginUserResponse, PolicyAgreementsResponse, TokenResponse } from '../util/Responses';
import { Post, SharedUrl } from '../util/Models';
import { objectToSnake } from '../util/CaseConverter';

export class Client extends BaseClient {
	public constructor(options?: ClientOptions) {
		super(options);
	}

	public getToken = async (options: {
		grantType: string;
		email?: string;
		password?: string;
		refreshToken?: string;
	}): Promise<TokenResponse> => {
		return await this.authAPI.getToken({
			grantType: options.grantType,
			email: options.email,
			password: options.password,
			refreshToken: options.refreshToken,
		});
	};

	public login = async (options: { email: string; password: string }): Promise<LoginUserResponse> => {
		const loginResponse = await this.authenticate({
			apiKey: API_KEY,
			email: options.email,
			password: options.password,
			uuid: this.uuid,
		});

		// 利用規約に同意する
		const policyResponse = await this.getPolicyAgreements();
		if (!policyResponse.latestPrivacyPolicyAgreed) {
			this.acceptPolicyAgreement({ type: 'privacy_policy' });
		}
		if (!policyResponse.latestTermsOfUseAgreed) {
			this.acceptPolicyAgreement({ type: 'terms_of_use' });
		}

		return loginResponse;
	};

	public acceptPolicyAgreement = async (options: { type: string }) => {
		return await this.miscAPI.acceptPolicyAgreement({ type: options.type });
	};

	public getPolicyAgreements = async (): Promise<PolicyAgreementsResponse> => {
		return await this.miscAPI.getPolicyAgreements();
	};

	public getWebSocketToken = async (): Promise<string> => {
		return (await this.miscAPI.getWebSocketToken()).token;
	};

	// messageTags
	public createPost = async (
		options: {
			text?: string;
			fontSize?: number;
			color?: number;
			inReplyTo?: number;
			groupId?: number;
			mentionIds?: number[];
			choices?: string[];
			sharedUrl?: string;
			attachmentFilename?: string;
			attachment2Filename?: string;
			attachment3Filename?: string;
			attachment4Filename?: string;
			attachment5Filename?: string;
			attachment6Filename?: string;
			attachment7Filename?: string;
			attachment8Filename?: string;
			attachment9Filename?: string;
			videoFileName?: string;
		} = {},
	): Promise<Post> => {
		const postType = this.getPostType(options);
		let sharedUrlObj: SharedUrl | undefined = undefined;
		if (options.sharedUrl) {
			sharedUrlObj = objectToSnake(await this.getUrlMetadata({ url: options.sharedUrl }));
		}
		const res = await this.postAPI.createPost({
			jwt: await this.getWebSocketToken(),
			text: options.text,
			fontSize: options.fontSize,
			color: options.color,
			inReplyTo: options.inReplyTo,
			groupId: options.groupId,
			postType: postType,
			mentionIds: options.mentionIds,
			choices: options.choices,
			sharedUrl: sharedUrlObj,
			messageTags: undefined,
			attachmentFilename: options.attachmentFilename,
			attachment2Filename: options.attachment2Filename,
			attachment3Filename: options.attachment3Filename,
			attachment4Filename: options.attachment4Filename,
			attachment5Filename: options.attachment5Filename,
			attachment6Filename: options.attachment6Filename,
			attachment7Filename: options.attachment7Filename,
			attachment8Filename: options.attachment8Filename,
			attachment9Filename: options.attachment9Filename,
			videoFileName: options.videoFileName,
		});
		this.logger.info('投稿を作成しました。');
		return res;
	};

	public getUrlMetadata = async (options: { url: string }): Promise<SharedUrl> => {
		return await this.postAPI.getUrlMetadata({ url: options.url });
	};
}

export default Client;
