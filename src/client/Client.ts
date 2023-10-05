import { BaseClient } from './BaseClient';
import { ClientOptions } from '../util/Types';
import { API_KEY } from '../util/Constants';
import { LoginUserResponse } from '../util/Responses';
import { Post, SharedUrl } from '../util/Models';

export class Client extends BaseClient {
	public constructor(options?: ClientOptions) {
		super(options);
	}

	public login = async (options: { email: string; password: string }): Promise<LoginUserResponse> => {
		return await this.authenticate({
			apiKey: API_KEY,
			email: options.email,
			password: options.password,
			uuid: this.uuid,
		});
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
			postType?: string;
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
		let sharedUrlObj: SharedUrl | undefined = undefined;
		if (options.sharedUrl) {
			sharedUrlObj = await this.getUrlMetadata({ url: options.sharedUrl });
		}
		const res = await this.postAPI.createPost({
			jwt: await this.getWebSocketToken(),
			text: options.text,
			fontSize: options.fontSize,
			color: options.color,
			inReplyTo: options.inReplyTo,
			groupId: options.groupId,
			postType: options.postType,
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
