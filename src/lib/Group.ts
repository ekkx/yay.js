import { HttpMethod } from '../util/Types';
import { BaseClient } from '../client/BaseClient';
import {
	AdditionalSettingsResponse,
	CreateGroupResponse,
	CreateQuotaResponse,
	GroupCategoriesResponse,
	GroupNotificationSettingsResponse,
	GroupResponse,
	GroupUserResponse,
	GroupUsersResponse,
	GroupsRelatedResponse,
	GroupsResponse,
	UnreadStatusResponse,
	UsersByTimestampResponse,
	UsersResponse,
} from '../util/Responses';
import * as util from '../util/Utils';
import { API_KEY } from '../util/Constants';

/**
 * サークルAPI
 *
 * @remarks
 * サークルAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class GroupAPI {
	public constructor(private readonly base: BaseClient) {}

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
		return util.md5(this.uuid, Math.floor(Date.now() / 1000), true);
	}

	public acceptModeratorOffer = async (options: { groupId: number }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/groups/${options.groupId}/deputize`,
			requireAuth: false,
		});
	};

	public acceptOwnershipOffer = async (options: { groupId: number }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/groups/${options.groupId}/transfer`,
			requireAuth: false,
		});
	};

	public acceptUserRequest = async (options: { groupId: number; userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.groupId}/accept/${options.userId}`,
			requireAuth: false,
		});
	};

	public addRelatedGroups = async (options: { groupId: number; relatedGroupId: number }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/groups/v${options.groupId}/related`,
			params: { 'related_group_id': options.relatedGroupId },
			requireAuth: false,
		});
	};

	public banUser = async (options: { groupId: number; userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.groupId}/ban/${options.userId}`,
			requireAuth: false,
		});
	};

	public checkUnreadStatus = async (options: { fromTime: number }): Promise<UnreadStatusResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/unread_status`,
			params: { from_time: options.fromTime },
			requireAuth: false,
		});
	};

	public create = async (options: {
		topic: string;
		description?: string;
		secret?: string;
		hideReportedPosts?: boolean;
		hideConferenceCall?: boolean;
		isPrivate?: boolean;
		onlyVerifiedAge?: boolean;
		onlyMobileVerified?: boolean;
		callTimelineDisplay?: boolean;
		allowOwnershipTransfer?: boolean;
		allowThreadCreationBy?: string;
		gender?: number;
		generationGroupsLimit?: number;
		groupCategoryId?: number;
		coverImageFilename?: string;
		groupIconFilename?: string;
		subCategoryId?: string;
		hideFromGameEight?: boolean;
		allowMembersToPostImageAndVideo?: boolean;
		allowMembersToPostUrl?: boolean;
		guidelines?: string;
	}): Promise<CreateGroupResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v3/groups/new`,
			json: {
				topic: options.topic,
				description: options.description,
				secret: options.secret,
				hide_reported_posts: options.hideReportedPosts,
				hide_conference_call: options.hideConferenceCall,
				is_private: options.isPrivate,
				only_verified_age: options.onlyVerifiedAge,
				only_mobile_verified: options.onlyMobileVerified,
				call_timeline_display: options.callTimelineDisplay,
				allow_ownership_transfer: options.allowOwnershipTransfer,
				allow_thread_creation_by: options.allowThreadCreationBy,
				gender: options.gender,
				generation_groups_limit: options.generationGroupsLimit,
				group_category_id: options.groupCategoryId,
				cover_image_filename: options.coverImageFilename,
				group_icon_filename: options.groupIconFilename,
				uuid: this.uuid,
				api_key: API_KEY,
				timestamp: Math.floor(Date.now() / 1000),
				signed_info: this.signedInfo,
				sub_category_id: options.subCategoryId,
				hide_from_game_eight: options.hideFromGameEight,
				allow_members_to_post_image_and_video: options.allowMembersToPostImageAndVideo,
				allow_members_to_post_url: options.allowMembersToPostUrl,
				guidelines: options.guidelines,
			},
			requireAuth: false,
		});
	};

	public createPinGroup = async (options: { groupId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/pinned/groups`,
			json: { id: options.groupId },
			requireAuth: false,
		});
	};

	public declineModeratorOffer = async (options: { groupId: number }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v1/groups/${options.groupId}/deputize`,
			requireAuth: false,
		});
	};

	public declineOwnershipOffer = async (options: { groupId: number }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v1/groups/${options.groupId}/transfer`,
			requireAuth: false,
		});
	};

	public declineUserRequest = async (options: { groupId: number; userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.groupId}/decline/${options.userId}`,
			requireAuth: false,
		});
	};

	public deleteCover = async (options: { groupId: number }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v3/groups/${options.groupId}/cover`,
			requireAuth: false,
		});
	};

	public deleteIcon = async (options: { groupId: number }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v3/groups/${options.groupId}/icon`,
			requireAuth: false,
		});
	};

	public deletePinGroup = async (options: { groupId: number }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `/v1/pinned/groups/${options.groupId}`,
			requireAuth: false,
		});
	};

	public getBannedMembers = async (options: { groupId: number; page?: number }): Promise<UsersResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/${options.groupId}/ban_list`,
			params: { page: options.page },
			requireAuth: false,
		});
	};

	public getCategories = async (options: { page?: number; number?: number }): Promise<GroupCategoriesResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/categories`,
			params: { page: options.page, number: options.number },
			requireAuth: false,
		});
	};

	public getCreateQuota = async (): Promise<CreateQuotaResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/created_quota`,
			requireAuth: false,
		});
	};

	public getGroup = async (options: { groupId: number }): Promise<GroupResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/${options.groupId}`,
			requireAuth: false,
		});
	};

	public getGroupNotificationSettings = async (options: {
		groupId: number;
	}): Promise<GroupNotificationSettingsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/notification_settings/groups/${options.groupId}`,
			requireAuth: false,
		});
	};

	public getGroups = async (options: {
		groupCategoryId?: number;
		keyword?: string;
		fromTimestamp?: number;
		subCategoryId?: number;
	}): Promise<GroupsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/groups`,
			params: {
				group_category_id: options.groupCategoryId,
				keyword: options.keyword,
				from_timestamp: options.fromTimestamp,
				sub_category_id: options.subCategoryId,
			},
			requireAuth: false,
		});
	};

	public getInvitableUsers = async (options: {
		groupId: number;
		fromTimestamp?: number;
		// user[nickname]
		nickname?: string;
	}): Promise<UsersByTimestampResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/${options.groupId}/users/invitable`,
			params: {
				from_timestamp: options.fromTimestamp,
				nickname: options.nickname,
			},
			requireAuth: false,
		});
	};

	public getJoinedStatuses = async (options: { groupIds: number[] }): Promise<Record<string, string>> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/joined_statuses`,
			params: { 'ids': options.groupIds },
			requireAuth: false,
		});
	};

	public getMember = async (options: { groupId: number; userId: number }): Promise<GroupUserResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/${options.groupId}/members/${options.userId}`,
			requireAuth: false,
		});
	};

	public getMembers = async (options: {
		groupId: number;
		mode?: string;
		keyword?: string;
		fromId?: number;
		fromTimestamp?: number;
		orderBy?: string;
		followedByMe?: boolean;
	}): Promise<GroupUsersResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/groups/${options.groupId}/members`,
			params: {
				mode: options.mode,
				keyword: options.keyword,
				from_id: options.fromId,
				from_timestamp: options.fromTimestamp,
				order_by: options.orderBy,
				followed_by_me: options.followedByMe,
			},
			requireAuth: false,
		});
	};

	public getMyGroups = async (options: { fromTimestamp?: number }): Promise<GroupsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/groups/mine`,
			params: { from_timestamp: options.fromTimestamp },
			requireAuth: false,
		});
	};

	public getRelatableGroups = async (options: {
		groupId: number;
		keyword?: string;
		from?: string;
	}): Promise<GroupsRelatedResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/${options.groupId}/related`,
			params: { keyword: options.keyword, from: options.from },
			requireAuth: false,
		});
	};

	public getUserGroups = async (options: { userId: number; page?: number }): Promise<GroupsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/user_group_list`,
			params: { user_id: options.userId, page: options.page },
			requireAuth: false,
		});
	};

	public inviteUsers = async (options: { groupId: number; userIds: number[] }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.groupId}/invite`,
			json: { 'user_ids': options.userIds },
			requireAuth: false,
		});
	};

	public join = async (options: { groupId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.groupId}/join`,
			requireAuth: false,
		});
	};

	public leave = async (options: { groupId: number }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v1/groups/${options.groupId}/leave`,
			requireAuth: false,
		});
	};

	public removeModerator = async (options: { groupId: number; userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.groupId}/fire/${options.userId}`,
			requireAuth: false,
		});
	};

	/**
	 *
	 * 関連するサークルを削除します
	 *
	 * @remarks
	 * `DELETE`: https://api.yay.space/v1/groups/:groupId/related
	 *
	 * @param options - 引数のオプション
	 * @param options.groupId - サークルのID
	 * @param options.relatedGroupIds - 関連するサークルのID
	 *
	 * @see https://github.com/qvco/yay.js
	 *
	 */
	public removeRelatedGroups = async (options: { groupId: number; relatedGroupIds: number[] }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v1/groups/${options.groupId}/related`,
			params: { 'related_group_id[]': options.relatedGroupIds },
			requireAuth: false,
		});
	};

	public report = async (options: {
		groupId: number;
		categoryId: number;
		reason?: string;
		opponentId?: number;
		screenshotFilename?: string;
		screenshot2Filename?: string;
		screenshot3Filename?: string;
		screenshot4Filename?: string;
	}) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v3/groups/${options.groupId}/report`,
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

	public sendModeratorOffers = async (options: { groupId: number; userIds: number[] }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v3/groups/${options.groupId}/deputize/mass`,
			json: {
				'user_ids': options.userIds,
				uuid: this.uuid,
				api_key: API_KEY,
				timestamp: Math.floor(Date.now() / 1000),
				signed_info: this.signedInfo,
			},
			requireAuth: false,
		});
	};

	public sendOwnershipOffer = async (options: { groupId: number; userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v3/groups/${options.groupId}/transfer`,
			json: {
				user_id: options.userId,
				uuid: this.uuid,
				api_key: API_KEY,
				timestamp: Math.floor(Date.now() / 1000),
				signed_info: this.signedInfo,
			},
			requireAuth: false,
		});
	};

	public setGroupNotificationSettings = async (options: {
		groupId: number;
		notificationGroupPost?: number;
		notificationGroupJoin?: number;
		notificationGroupRequest?: number;
		notificationGroupMessageTagAll?: number;
	}): Promise<AdditionalSettingsResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/notification_settings/groups/${options.groupId}`,
			json: {
				notification_group_post: options.notificationGroupPost,
				notification_group_join: options.notificationGroupJoin,
				notification_group_request: options.notificationGroupRequest,
				notification_group_message_tag_all: options.notificationGroupMessageTagAll,
			},
			requireAuth: false,
		});
	};

	public setTitle = async (options: { groupId: number; title: string }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.groupId}/set_title`,
			json: { title: options.title },
			requireAuth: false,
		});
	};

	public takeoverOwnership = async (options: { groupId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.groupId}/take_over`,
			requireAuth: false,
		});
	};

	public unbanUser = async (options: { groupId: number; userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.groupId}/unban/${options.userId}`,
			requireAuth: false,
		});
	};

	public update = async (options: {
		groupId: number;
		topic?: string;
		description?: string;
		secret?: boolean;
		hideReportedPosts?: boolean;
		hideConferenceCall?: boolean;
		isPrivate?: boolean;
		onlyVerifiedAge?: boolean;
		onlyMobileVerified?: boolean;
		callTimelineDisplay?: boolean;
		allowOwnershipTransfer?: boolean;
		allowThreadCreationBy?: string;
		gender?: number;
		generationGroupsLimit?: number;
		groupCategoryId?: number;
		coverImageFilename?: string;
		groupIconFilename?: string;
		subCategoryId?: string;
		hideFromGameEight?: boolean;
		allowMembersToPostImageAndVideo?: boolean;
		allowMembersToPostUrl?: boolean;
		guidelines?: string;
	}): Promise<GroupResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v3/groups/${options.groupId}/update`,
			json: {
				topic: options.topic,
				description: options.description,
				secret: options.secret,
				hide_reported_posts: options.hideReportedPosts,
				hide_conference_call: options.hideConferenceCall,
				is_private: options.isPrivate,
				only_verified_age: options.onlyVerifiedAge,
				only_mobile_verified: options.onlyMobileVerified,
				call_timeline_display: options.callTimelineDisplay,
				allow_ownership_transfer: options.allowOwnershipTransfer,
				allow_thread_creation_by: options.allowThreadCreationBy,
				gender: options.gender,
				generation_groups_limit: options.generationGroupsLimit,
				group_category_id: options.groupCategoryId,
				cover_image_filename: options.coverImageFilename,
				group_icon_filename: options.groupIconFilename,
				uuid: this.uuid,
				api_key: API_KEY,
				timestamp: Math.floor(Date.now() / 1000),
				signed_info: this.signedInfo,
				sub_category_id: options.subCategoryId,
				hide_from_game_eight: options.hideFromGameEight,
				allow_members_to_post_image_and_video: options.allowMembersToPostImageAndVideo,
				allow_members_to_post_url: options.allowMembersToPostUrl,
				guidelines: options.guidelines,
			},
			requireAuth: false,
		});
	};

	public visit = async (options: { groupId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.groupId}/visit`,
			requireAuth: false,
		});
	};

	public withdrawModeratorOffer = async (options: { groupId: number; userId: number }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/groups/${options.groupId}/deputize/${options.userId}/withdraw`,
			requireAuth: false,
		});
	};

	public withdrawOwnershipOffer = async (options: { groupId: number; userId: number }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/groups/${options.groupId}/transfer/withdraw`,
			json: { user_id: options.userId },
			requireAuth: false,
		});
	};
}
