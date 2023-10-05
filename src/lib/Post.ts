import { BaseClient } from '../client/BaseClient';
import { BookmarkPostResponse } from 'util/Responses';
import { RequestMethod } from '../util/Types';
import { MessageTag, Post, SharedUrl } from '../util/Models';

export class PostAPI {
	public constructor(private readonly base: BaseClient) {}

	public addBookmark = async (userId: number, id: number): Promise<BookmarkPostResponse> => {
		return await this.base.request({
			method: RequestMethod.PUT,
			route: `v1/users/${userId}/bookmarks/${id}`,
			requireAuth: true,
		});
	};

	public addGroupHighlightPost = async (groupId: number, postId: number): Promise<BookmarkPostResponse> => {
		return await this.base.request({
			method: RequestMethod.PUT,
			route: `v1/groups/${groupId}/highlights/${postId}`,
			requireAuth: false,
		});
	};

	public createGroupCallPost = async (): Promise<BookmarkPostResponse> => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v2/posts/new_conference_call`,
			requireAuth: false,
			json: {},
		});
	};

	public createPost = async (
		jwt: string,
		text?: string,
		fontSize?: number,
		color?: number,
		inReplyTo?: number,
		groupId?: number,
		postType?: string,
		mentionIds?: number[],
		choices?: string[],
		sharedUrl?: SharedUrl,
		messageTags?: MessageTag,
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
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v3/posts/new`,
			requireAuth: true,
			json: {
				text: text,
				font_size: fontSize,
				color: color,
				in_reply_to: inReplyTo,
				group_id: groupId,
				post_type: postType,
				'mention_ids[]': mentionIds,
				'choices[]': choices,
				shared_url: sharedUrl,
				message_tags: messageTags,
				attachment_filename: attachmentFilename,
				attachment_2_filename: attachment2Filename,
				attachment_3_filename: attachment3Filename,
				attachment_4_filename: attachment4Filename,
				attachment_5_filename: attachment5Filename,
				attachment_6_filename: attachment6Filename,
				attachment_7_filename: attachment7Filename,
				attachment_8_filename: attachment8Filename,
				attachment_9_filename: attachment9Filename,
				video_file_name: videoFileName,
			},
			headers: { 'X-Jwt': jwt },
		});
	};

	public getUrlMetadata = async (url: string): Promise<SharedUrl> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v2/posts/url_metadata`,
			requireAuth: false,
			params: { url: url },
		});
	};
}
