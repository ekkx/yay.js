import { BaseClient } from '../client/BaseClient';
import {
	BookmarkPostResponse,
	CreatePostResponse,
	LikePostsResponse,
	PostLikersResponse,
	PostResponse,
	PostTagsResponse,
	PostsResponse,
	ValidationPostResponse,
	VoteSurveyResponse,
} from '../util/Responses';
import { HttpMethod } from '../util/Types';
import { MessageTag, Post, SharedUrl } from '../util/Models';
import * as util from '../util/Utils';
import { API_KEY } from '../util/Constants';

/**
 * **投稿API**
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

	public createGroupCallPost = async (
		options: {
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
		} = {},
	): Promise<CreatePostResponse> => {
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

	public createSharePost = async (options: {
		shareableType: string;
		shareableId: number;
		postId: number;
		text?: string;
		fontSize?: number;
		color?: number;
		groupId?: number;
	}): Promise<Post> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/posts/new_share_post`,
			requireAuth: true,
			json: {
				shareable_type: options.shareableType,
				shareable_id: options.shareableId,
				text: options.text,
				font_size: options.fontSize,
				uuid: this.uuid,
				api_key: API_KEY,
				timestamp: Math.floor(Date.now() / 1000),
				signed_info: this.signedInfo,
				color: options.color,
				group_id: options.groupId,
			},
		});
	};

	public createThreadPost = async (options: {
		jwt: string;
		threadId: number;
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
			route: `v1/threads/${options.threadId}/posts`,
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

	public deleteAllPost = async () => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/posts/delete_all_post`,
			requireAuth: false,
		});
	};

	public deleteGroupPinPost = async (options: { groupId: number }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v2/posts/group_pinned_post`,
			params: { group_id: options.groupId },
			requireAuth: false,
		});
	};

	public deletePinPost = async (options: { postId: number }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v1/pinned/posts/${options.postId}`,
			requireAuth: false,
		});
	};

	public getBookmark = async (options: { userId: number; from?: string }): Promise<PostsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/users/${options.userId}/bookmarks`,
			params: { from: options.from },
			requireAuth: false,
		});
	};

	public getCallTimeline = async (
		options: {
			groupId?: number;
			fromTimestamp?: number;
			number?: number;
			categoryId?: number;
			callType?: string;
			includeCircleCall?: boolean;
			crossGeneration?: boolean;
			excludeRecentGomimushi?: boolean;
			sharedInterestCategories?: boolean;
		} = {},
	): Promise<PostsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/posts/call_timeline`,
			params: {
				group_id: options.groupId,
				from_timestamp: options.fromTimestamp,
				number: options.number,
				category_id: options.categoryId,
				call_type: options.callType,
				include_circle_call: options.includeCircleCall,
				cross_generation: options.crossGeneration,
				exclude_recent_gomimushi: options.excludeRecentGomimushi,
				shared_interest_categories: options.sharedInterestCategories,
			},
			requireAuth: false,
		});
	};

	public getConversation = async (options: {
		conversationId: number;
		groupId?: number;
		threadId?: number;
		fromPostId?: number;
		reverse?: boolean;
	}): Promise<PostsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/conversations/${options.conversationId}`,
			params: {
				group_id: options.groupId,
				thread_id: options.threadId,
				from_post_id: options.fromPostId,
				reverse: options.reverse,
			},
			requireAuth: false,
		});
	};

	public getConversationRootPosts = async (options: { postIds: number[] }): Promise<PostsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/conversations/root_posts`,
			params: { 'ids[]': options.postIds },
			requireAuth: false,
		});
	};

	public getFollowingCallTimeline = async (
		options: {
			fromTimestamp?: number;
			number?: number;
			categoryId?: number;
			callType?: string;
			includeCircleCall?: boolean;
			excludeRecentGomimushi?: boolean;
		} = {},
	): Promise<PostsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/posts/call_followers_timeline`,
			params: {
				from_timestamp: options.fromTimestamp,
				number: options.number,
				category_id: options.categoryId,
				call_type: options.callType,
				include_circle_call: options.includeCircleCall,
				exclude_recent_gomimushi: options.excludeRecentGomimushi,
			},
			requireAuth: false,
		});
	};

	public getFollowingTimeline = async (
		options: {
			from?: string;
			fromPostId?: number;
			onlyRoot?: boolean;
			orderBy?: string;
			number?: number;
			mxn?: number;
			reduceSelfie?: boolean;
			customGenerationRange?: boolean;
		} = {},
	): Promise<PostsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/posts/following_timeline`,
			params: {
				from: options.from,
				from_post_id: options.fromPostId,
				only_root: options.onlyRoot,
				order_by: options.orderBy,
				number: options.number,
				mxn: options.mxn,
				reduce_selfie: options.reduceSelfie,
				custom_generation_range: options.customGenerationRange,
			},
			requireAuth: false,
		});
	};

	public getGroupHighlightPosts = async (options: {
		groupId: number;
		from?: string;
		number?: number;
	}): Promise<PostsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/${options.groupId}/highlights`,
			params: { from: options.from, number: options.number },
			requireAuth: false,
		});
	};

	public getGroupSearchPosts = async (options: {
		groupId: number;
		keyword: string;
		fromPostId?: number;
		number?: number;
		onlyThreadPosts?: boolean;
	}): Promise<PostsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/groups/${options.groupId}/posts/search`,
			params: {
				keyword: options.keyword,
				from_post_id: options.fromPostId,
				number: options.number,
				only_thread_posts: options.onlyThreadPosts,
			},
			requireAuth: false,
		});
	};

	public getGroupTimeline = async (options: {
		groupId: number;
		fromPostId?: number;
		reverse?: boolean;
		postType?: string;
		number?: number;
		onlyRoot?: boolean;
	}): Promise<PostsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/posts/group_timeline`,
			params: {
				group_id: options.groupId,
				from_post_id: options.fromPostId,
				reverse: options.reverse,
				post_type: options.postType,
				number: options.number,
				only_root: options.onlyRoot,
			},
			requireAuth: false,
		});
	};

	public getHashtagTimeline = async (options: {
		tag: number;
		fromPostId?: number;
		number?: number;
	}): Promise<PostsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/posts/tags/${options.tag}`,
			params: { from_post_id: options.fromPostId, number: options.number },
			requireAuth: false,
		});
	};

	public getMyPosts = async (
		options: {
			fromPostId?: number;
			number?: number;
			includeGroupPost?: boolean;
		} = {},
	): Promise<PostsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/posts/mine`,
			params: {
				from_post_id: options.fromPostId,
				number: options.number,
				include_group_post: options.includeGroupPost,
			},
			requireAuth: false,
		});
	};

	public getPost = async (options: { postId: number }): Promise<PostResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/posts/${options.postId}`,
			requireAuth: false,
		});
	};

	public getPostLikers = async (options: { postId: number; fromId?: number }): Promise<PostLikersResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/posts/${options.postId}/likers`,
			params: { from_id: options.fromId },
			requireAuth: false,
		});
	};

	public getPostReposts = async (options: { postId: number; fromPostId?: number }): Promise<PostsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/posts/${options.postId}/reposts`,
			params: { from_post_id: options.fromPostId },
			requireAuth: false,
		});
	};

	public getPosts = async (options: { postIds: number[] }): Promise<PostsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/posts/multiple`,
			params: { 'post_ids[]': options.postIds },
			requireAuth: false,
		});
	};

	public getRecentEngagementsPosts = async (options: { number?: number } = {}): Promise<PostsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/posts/recent_engagement`,
			params: { number: options.number },
			requireAuth: false,
		});
	};

	public getRecommendedPostTags = async (options: {
		tag: string;
		saveRecentSearch?: boolean;
	}): Promise<PostTagsResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/posts/recommended_tag`,
			params: { tag: options.tag, save_recent_search: options.saveRecentSearch },
			requireAuth: false,
		});
	};

	public getRecommendedPosts = async (
		options: {
			experimentNum?: number;
			variantNum?: number;
			number?: number;
			saveRecentSearch?: boolean;
		} = {},
	): Promise<PostsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/posts/recommended_timeline`,
			params: {
				experiment_num: options.experimentNum,
				variant_num: options.variantNum,
				number: options.saveRecentSearch,
				shared_interest_categories: options.saveRecentSearch,
			},
			requireAuth: false,
		});
	};

	public getSearchPosts = async (options: {
		keyword: string;
		postOwnerScope: number;
		onlyMedia?: boolean;
		fromPostId?: number;
		number?: number;
	}): Promise<PostsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/posts/search`,
			params: {
				keyword: options.keyword,
				post_owner_scope: options.postOwnerScope,
				only_media: options.onlyMedia,
				from_post_id: options.fromPostId,
				number: options.number,
			},
			requireAuth: false,
		});
	};

	public getTimeline = async (options: {
		noreplyMode: boolean;
		orderBy: string;
		experimentOlderAgeRules?: boolean;
		sharedInterestCategories?: boolean;
		from?: string;
		fromPostId?: number;
		number?: number;
		mxn?: number;
		en?: number;
		vn?: number;
		reduceSelfie?: boolean;
		customGenerationRange?: boolean;
	}): Promise<PostsResponse> => {
		let noreplyMode: string = '';

		if (options.noreplyMode) {
			noreplyMode = 'noreply_';
		}

		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/posts/${noreplyMode}timeline`,
			params: {
				order_by: options.orderBy,
				experiment_older_age_rules: options.experimentOlderAgeRules,
				shared_interest_categories: options.sharedInterestCategories,
				from: options.from,
				from_post_id: options.fromPostId,
				number: options.number,
				mxn: options.mxn,
				en: options.en,
				vn: options.vn,
				reduce_selfie: options.reduceSelfie,
				custom_generation_range: options.customGenerationRange,
			},
			requireAuth: false,
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

	public getUserTimeline = async (options: {
		userId: number;
		fromPostId?: number;
		postType?: string;
		number?: number;
	}): Promise<PostsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/posts/user_timeline`,
			requireAuth: false,
			params: {
				user_id: options.userId,
				from_post_id: options.fromPostId,
				post_type: options.postType,
				number: options.number,
			},
		});
	};

	public likePosts = async (options: { postIds: number[] }): Promise<LikePostsResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/posts/like`,
			requireAuth: false,
			params: { post_ids: options.postIds },
		});
	};

	public removeBookmark = async (options: { userId: number; postId: number }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v1/users/${options.userId}/bookmarks/${options.postId}`,
			requireAuth: false,
		});
	};

	public removeGroupHighlightPost = async (options: { groupId: number; postId: number }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v1/groups/${options.groupId}/highlights/${options.postId}`,
			requireAuth: false,
		});
	};

	public removePosts = async (options: { postIds: number[] }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/posts/mass_destroy`,
			json: { posts_ids: options.postIds },
			requireAuth: false,
		});
	};

	public reportPost = async (options: {
		postId: number;
		categoryId?: number;
		reason?: string;
		opponentId?: number;
		screenshotFilename?: string;
		screenshot2Filename?: string;
		screenshot3Filename?: string;
		screenshot4Filename?: string;
	}) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v3/posts/${options.postId}/report`,
			json: {
				category_id: options.categoryId,
				reason: options.reason,
				opponent_id: options.opponentId,
				screenshot_filename: options.screenshotFilename,
				screenshot_2_filename: options.screenshot2Filename,
				screenshot_3_filename: options.screenshot3Filename,
				screenshot_4_filename: options.screenshot4Filename,
			},
			requireAuth: false,
		});
	};

	public unlikePost = async (options: { postId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/posts/${options.postId}/unlike`,
			requireAuth: false,
		});
	};

	public updatePost = async (options: {
		postId: number;
		text?: string;
		fontSize?: number;
		color?: number;
		messageTags?: MessageTag;
	}): Promise<Post> => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v3/posts/${options.postId}`,
			requireAuth: true,
			json: {
				text: options.text,
				font_size: options.fontSize,
				color: options.color,
				message_tags: options.messageTags,
				uuid: this.uuid,
				api_key: API_KEY,
				timestamp: Math.floor(Date.now() / 1000),
				signed_info: this.signedInfo,
			},
		});
	};

	public updateRecommendationFeedback = async (options: {
		postId: number;
		experimentNum?: number;
		variantNum?: number;
		feedbackResult: string;
	}) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/posts/${options.postId}/recommendation_feedback`,
			requireAuth: true,
			json: {
				experiment_num: options.experimentNum,
				variant_num: options.variantNum,
				feedback_result: options.feedbackResult,
			},
		});
	};

	public validatePost = async (options: {
		text: string;
		groupId?: number;
		threadId?: number;
	}): Promise<ValidationPostResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/posts/validate`,
			requireAuth: false,
			json: {
				text: options.text,
				group_id: options.groupId,
				thread_id: options.threadId,
			},
		});
	};

	public viewVideo = async (options: { videoId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/posts/videos/${options.videoId}/view`,
			requireAuth: false,
		});
	};

	public voteSurvey = async (options: { surveyId: number; choiceId: number }): Promise<VoteSurveyResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/surveys/${options.surveyId}/vote`,
			json: { choice_id: options.choiceId },
			requireAuth: false,
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
