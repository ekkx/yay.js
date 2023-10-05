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
		return await this.postAPI.createPost(
			await this.getWebSocketToken(),
			options.text,
			options.fontSize,
			options.color,
			options.inReplyTo,
			options.groupId,
			options.postType,
			options.mentionIds,
			options.choices,
			sharedUrlObj,
			undefined,
			options.attachmentFilename,
			options.attachment2Filename,
			options.attachment3Filename,
			options.attachment4Filename,
			options.attachment5Filename,
			options.attachment6Filename,
			options.attachment7Filename,
			options.attachment8Filename,
			options.attachment9Filename,
			options.videoFileName,
		);
	};

	public getUrlMetadata = async (options: { url: string }): Promise<SharedUrl> => {
		return await this.postAPI.getUrlMetadata(options.url);
	};
}

export default Client;
