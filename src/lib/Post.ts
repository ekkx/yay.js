import { BaseClient } from '../client/BaseClient';
import { BookmarkPostResponse, CreatePostResponse } from 'util/Responses';
import { HttpMethod } from '../util/Types';
import { MessageTag, Post, SharedUrl } from '../util/Models';
import * as util from '../util/Utils';
import { API_KEY } from 'util/Constants';

/**
 * 投稿API
 *
 * @remarks
 * 投稿APIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class PostAPI {
	public constructor(private readonly base: BaseClient) {}

	public addBookmark = async (options: { userId: number; postId: number }): Promise<BookmarkPostResponse> => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/users/${options.userId}/bookmarks/${options.postId}`,
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

	public createGroupCallPost = async (options: {
		text?: string;
		fontSize?: number;
		color?: number;
		groupId?: number;
		callType?: string;
		categoryId?: number;
		gameTitle?: string;
		joinableBy?: string;
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
	}): Promise<CreatePostResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/posts/new_conference_call`,
			requireAuth: false,
			json: {
				text: options.text,
				font_size: options.fontSize,
				color: options.color,
				group_id: options.groupId,
				call_type: options.callType,
				uuid: this.uuid,
				api_key: API_KEY,
				timestamp: Math.floor(Date.now() / 1000),
				signed_info: this.signedInfo,
				category_id: options.categoryId,
				game_title: options.gameTitle,
				joinable_by: options.joinableBy,
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
			},
		});
	};

	public createGroupPinPost = async (options: { postId: number; groupId: number }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v2/posts/group_pinned_post`,
			requireAuth: false,
			json: { post_id: options.postId, group_id: options.groupId },
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
				mention_ids: options.mentionIds,
				choices: options.choices,
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

	public createRepost = async (options: {
		jwt: string;
		postId: number;
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
	}): Promise<CreatePostResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v3/posts/repost`,
			requireAuth: true,
			json: {
				text: options.text,
				font_size: options.fontSize,
				color: options.color,
				in_reply_to: options.inReplyTo,
				group_id: options.groupId,
				post_type: options.postType,
				mention_ids: options.mentionIds,
				choices: options.choices,
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

	/** @ignore */
	private get signedVersion(): string {
		return util.sha256();
	}
}
