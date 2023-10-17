import { HttpMethod } from '../util/Types';
import { BaseClient } from '../client/BaseClient';
import { CreateGroupResponse, UnreadStatusResponse } from '../util/Responses';

export class GroupAPI {
	public constructor(private readonly base: BaseClient) {}

	public acceptModeratorOffer = async (options: { id: number }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/groups/${options.id}/deputize`,
			requireAuth: false,
		});
	};

	public acceptOwnershipOffer = async (options: { id: number }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/groups/${options.id}/transfer`,
			requireAuth: false,
		});
	};

	public acceptUserRequest = async (options: { id: number; userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.id}/accept/${options.userId}`,
			requireAuth: false,
		});
	};

	public addRelatedGroups = async (options: { id: number; relatedGroupId: number }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/groups/v${options.id}/related`,
			params: { 'related_group_id[]': options.relatedGroupId },
			requireAuth: false,
		});
	};

	public banUser = async (options: { id: number; userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.id}/ban/${options.userId}`,
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
		uuid: string;
		apiKey: string;
		timestamp: string;
		signedInfo: string;
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
				uuid: options.uuid,
				api_key: options.apiKey,
				timestamp: options.timestamp,
				signed_info: options.signedInfo,
				sub_category_id: options.subCategoryId,
				hide_from_game_eight: options.hideFromGameEight,
				allow_members_to_post_image_and_video: options.allowMembersToPostImageAndVideo,
				allow_members_to_post_url: options.allowMembersToPostUrl,
				guidelines: options.guidelines,
			},
			requireAuth: false,
		});
	};
}
