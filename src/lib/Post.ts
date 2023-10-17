import { BaseClient } from '../client/BaseClient';
import { BookmarkPostResponse } from 'util/Responses';
import { HttpMethod } from '../util/Types';
import { MessageTag, Post, SharedUrl } from '../util/Models';

export class PostAPI {
	public constructor(private readonly base: BaseClient) {}

	public addBookmark = async (options: { userId: number; id: number }): Promise<BookmarkPostResponse> => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/users/${options.userId}/bookmarks/${options.id}`,
			requireAuth: true,
		});
	};

	public addGroupHighlightPost = async (options: {
		groupId: number;
		postId: number;
	}): Promise<BookmarkPostResponse> => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/groups/${options.groupId}/highlights/${options.postId}`,
			requireAuth: false,
		});
	};

	public createGroupCallPost = async (): Promise<BookmarkPostResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/posts/new_conference_call`,
			requireAuth: false,
			json: {},
		});
	};

	public createPost = async (options: {
		jwt: string;
		text?: string;
		fontSize?: number;
		color?: number;
		inReplyTo?: number;
		groupId?: number;
		postType?: string;
		mentionIds?: number[];
		choices?: string[];
		sharedUrl?: SharedUrl;
		messageTags?: MessageTag;
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
	}): Promise<Post> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v3/posts/new`,
			requireAuth: true,
			json: {
				text: options.text,
				font_size: options.fontSize,
				color: options.color,
				in_reply_to: options.inReplyTo,
				group_id: options.groupId,
				post_type: options.postType,
				'mention_ids[]': options.mentionIds,
				'choices[]': options.choices,
				shared_url: options.sharedUrl,
				message_tags: options.messageTags,
				attachment_filename: options.attachmentFilename,
				attachment_2_filename: options.attachment2Filename,
				attachment_3_filename: options.attachment3Filename,
				attachment_4_filename: options.attachment4Filename,
				attachment_5_filename: options.attachment5Filename,
				attachment_6_filename: options.attachment6Filename,
				attachment_7_filename: options.attachment7Filename,
				attachment_8_filename: options.attachment8Filename,
				attachment_9_filename: options.attachment9Filename,
				video_file_name: options.videoFileName,
			},
			headers: { 'X-Jwt': options.jwt },
		});
	};

	public getUrlMetadata = async (options: { url: string }): Promise<SharedUrl> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/posts/url_metadata`,
			requireAuth: false,
			params: { url: options.url },
		});
	};
}
