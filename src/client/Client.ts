import { BaseClient } from './BaseClient';
import { ClientOptions } from '../util/Types';
import { API_KEY } from '../util/Constants';
import { LoginUserResponse } from '../util/Responses';
import { Post, SharedUrl } from '../util/Models';

export class Client extends BaseClient {
	public constructor(options: ClientOptions) {
		super(options);
	}

	public login = async (email: string, password: string): Promise<LoginUserResponse> => {
		return await this.authenticate({
			apiKey: API_KEY,
			email: email,
			password: password,
			uuid: this.uuid,
		});
	};

	public getWebSocketToken = async (): Promise<string> => {
		return (await this.miscAPI.getWebSocketToken()).token;
	};

	public createPost = async (
		text?: string,
		fontSize?: number,
		color?: number,
		inReplyTo?: number,
		groupId?: number,
		postType?: string,
		mentionIds?: number[],
		choices?: string[],
		sharedUrl?: string,
		attachmentFilename?: string,
		attachment2Filename?: string,
		attachment3Filename?: string,
		attachment4Filename?: string,
		attachment5Filename?: string,
		attachment6Filename?: string,
		attachment7Filename?: string,
		attachment8Filename?: string,
		attachment9Filename?: string,
		videoFileName?: string,
	): Promise<Post> => {
		let sharedUrlObj: SharedUrl | undefined = undefined;
		if (sharedUrl) {
			sharedUrlObj = await this.postAPI.getUrlMetadata(sharedUrl);
		}
		return await this.postAPI.createPost(
			await this.getWebSocketToken(),
			text,
			fontSize,
			color,
			inReplyTo,
			groupId,
			postType,
			mentionIds,
			choices,
			sharedUrlObj,
			undefined,
			attachmentFilename,
			attachment2Filename,
			attachment3Filename,
			attachment4Filename,
			attachment5Filename,
			attachment6Filename,
			attachment7Filename,
			attachment8Filename,
			attachment9Filename,
			videoFileName,
		);
	};

	public getUrlMetadata = async (url: string): Promise<SharedUrl> => {
		return await this.postAPI.getUrlMetadata(url);
	};
}

export default Client;
