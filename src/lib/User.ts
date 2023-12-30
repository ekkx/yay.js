import { BaseClient } from '../client/BaseClient';
import {
	ActiveFollowingsResponse,
	AdditionalSettingsResponse,
	CreateUserResponse,
	FollowRecommendationsResponse,
	FollowRequestCountResponse,
	FollowUsersResponse,
	FootprintsResponse,
	HimaUsersResponse,
	RefreshCounterRequestsResponse,
	UserCustomDefinitionsResponse,
	UserEmailResponse,
	UserResponse,
	UserTimestampResponse,
	UsersByTimestampResponse,
	UsersResponse,
} from '../util/Responses';
import { API_KEY, API_VERSION_NAME } from '../util/Constants';
import { HttpMethod } from '../util/Types';
import * as util from '../util/Utils';

/**
 * **ユーザーAPI**
 *
 * @remarks
 * ユーザーAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class UserAPI {
	public constructor(private readonly base: BaseClient) {}

	public deleteContactFriends = async () => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v1/users/contact_friends`,
			requireAuth: false,
		});
	};

	public deleteFootprint = async (options: { userId: number; footprintId: number }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v2/users/${options.userId}/footprints/${options.footprintId}`,
			requireAuth: false,
		});
	};

	public destroyUser = async () => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/users/destroy`,
			json: {
				uuid: this.uuid,
				api_key: API_KEY,
				timestamp: Date.now(),
				signed_info: this.signedInfo,
			},
			requireAuth: false,
		});
	};

	public followUser = async (options: { userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/users/${options.userId}/follow`,
			requireAuth: false,
		});
	};

	public followUsers = async (options: { userIds: number[] }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/users/follow`,
			params: { 'user_ids[]': options.userIds },
			requireAuth: false,
		});
	};

	public getActiveFollowings = async (options: {
		onlyOnline: boolean;
		fromLoggedinAt?: number;
	}): Promise<ActiveFollowingsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/users/active_followings`,
			params: { only_online: options.onlyOnline, from_loggedin_at: options.fromLoggedinAt },
			requireAuth: false,
		});
	};

	public getAdditionalSettings = async (): Promise<AdditionalSettingsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/users/additonal_notification_setting`,
			requireAuth: false,
		});
	};

	public getFollowRecommendations = async (
		options: {
			fromTimestamp?: number;
			number?: number;
			sources?: string[];
		} = {},
	): Promise<FollowRecommendationsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/friends`,
			params: {
				from_timestamp: options.fromTimestamp,
				number: options.number,
				sources: options.sources,
			},
			requireAuth: false,
		});
	};

	public getFollowRequest = async (options: { fromTimestamp?: number } = {}): Promise<UsersByTimestampResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/users/follow_requests`,
			params: { from_timestamp: options.fromTimestamp },
			requireAuth: false,
		});
	};

	public getFollowRequestCount = async (): Promise<FollowRequestCountResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/users/follow_requests_count`,
			requireAuth: false,
		});
	};

	public getFollowingUsersBorn = async (options: { birthdate?: string } = {}): Promise<UsersResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/users/following_born_today`,
			params: { birthdate: options.birthdate },
			requireAuth: false,
		});
	};

	public getFootprints = async (
		options: { fromId?: number; number?: number; mode?: string } = {},
	): Promise<FootprintsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/users/footprints`,
			params: { from_id: options.fromId, number: options.number, mode: options.mode },
			requireAuth: false,
		});
	};

	public getFreshUser = async (options: { userId: number }): Promise<UserResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/users/fresh/${options.userId}`,
			requireAuth: false,
		});
	};

	public getHimaUsers = async (options: { fromHimaId?: number; number?: number } = {}): Promise<HimaUsersResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/users/hima_users`,
			params: { from_hima_id: options.fromHimaId, number: options.number },
			requireAuth: false,
		});
	};

	public getRecommendedUsersToFollowForProfile = async (options: {
		userId: number;
		number?: number;
		page?: number;
	}): Promise<UsersResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/users/${options.userId}/follow_recommended`,
			params: { page: options.page, number: options.number },
			requireAuth: false,
		});
	};

	public getRefreshCounterRequests = async (): Promise<RefreshCounterRequestsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/users/reset_counters`,
			requireAuth: false,
		});
	};

	public getTimestamp = async (): Promise<UserTimestampResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/users/timestamp`,
			requireAuth: false,
		});
	};

	public getUser = async (options: { userId: number }): Promise<UserResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/users/${options.userId}`,
			requireAuth: false,
		});
	};

	public getUserCustomDefinitions = async (): Promise<UserCustomDefinitionsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/users/custom_definitions`,
			requireAuth: false,
		});
	};

	public getUserEmail = async (options: { userId: number }): Promise<UserEmailResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/users/fresh/${options.userId}`,
			requireAuth: false,
		});
	};

	public getUserFollowers = async (options: {
		userId: number;
		fromFollowId?: number;
		followedByMe?: boolean;
		nickname?: string;
	}): Promise<FollowUsersResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/users/${options.userId}/followers`,
			params: {
				from_follow_id: options.fromFollowId,
				followed_by_me: options.followedByMe,
				'user[nickname]': options.nickname,
			},
			requireAuth: false,
		});
	};

	public getUserFollowings = async (options: {
		userId: number;
		fromFollowId?: number;
		fromTimestamp?: boolean;
		orderBy?: string;
		// SearchUsersRequest
	}): Promise<FollowUsersResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/users/${options.userId}/list_followings`,
			params: {
				from_follow_id: options.fromFollowId,
				from_timestamp: options.fromTimestamp,
				order_by: options.orderBy,
			},
			requireAuth: false,
		});
	};

	public getUserFromQr = async (options: { qr: string }): Promise<UserResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/users/qr_codes/${options.qr}`,
			requireAuth: false,
		});
	};

	public getUserWithCallUserId = async (options: { callId: number; callUserId: string }): Promise<UserResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/calls/${options.callId}/participants/${options.callUserId}`,
			requireAuth: false,
		});
	};

	public getUserWithoutLeavingFootprint = async (options: { userId: number }): Promise<UserResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/users/info/${options.userId}`,
			requireAuth: false,
		});
	};

	public getUsers = async (options: { jwt: string; userIds: number[] }): Promise<UsersResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/users/list_id`,
			params: { 'user_ids[]': options.userIds },
			headers: { 'X-Jwt': options.jwt },
			requireAuth: false,
		});
	};

	public getUsersFromUuid = async (options: { uuid: string }): Promise<UsersResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/users/list_uuid`,
			params: { uuid: options.uuid },
			requireAuth: false,
		});
	};

	public reduceKentaPenalty = async () => {};

	public refreshCounter = async (options: { counter: string }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/users/reset_counters`,
			json: { counter: options.counter },
			requireAuth: false,
		});
	};

	public reg = async (options: {
		nickname: string;
		biography?: string;
		birthDate: string;
		gender: number;
		countryCode: string;
		prefecture?: string;
		profileIconFilename?: string;
		coverImageFilename?: string;
		email?: string;
		password?: string;
		emailGrantToken?: string;
		en?: number;
		vn?: number;
	}): Promise<CreateUserResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v3/users/register`,
			json: {
				app_version: API_VERSION_NAME,
				timestamp: Math.floor(Date.now() / 1000),
				api_key: API_KEY,
				signed_version: this.signedVersion,
				signed_info: this.signedInfo,
				uuid: this.uuid,
				nickname: options.nickname,
				birth_date: options.birthDate,
				gender: options.gender,
				country_code: options.countryCode,
				biography: options.biography,
				prefecture: options.prefecture,
				profile_icon_filename: options.profileIconFilename,
				cover_image_filename: options.coverImageFilename,
				email: options.email,
				password: options.password,
				email_grant_token: options.emailGrantToken,
				en: options.en,
				vn: options.vn,
			},
			requireAuth: false,
		});
	};

	public removeUserAvatar = async () => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/users/remove_profile_photo`,
			requireAuth: false,
		});
	};

	public removeUserCover = async () => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/users/remove_cover_image`,
			requireAuth: false,
		});
	};

	public reportUser = async (options: {
		userId: number;
		categoryId: number;
		reason?: string;
		screenshotFilename?: string;
		screenshot2Filename?: string;
		screenshot3Filename?: string;
		screenshot4Filename?: string;
	}) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v3/users/${options.userId}/report`,
			json: {
				category_id: options.categoryId,
				reason: options.reason,
				screenshot_filename: options.screenshotFilename,
				screenshot_2_filename: options.screenshot2Filename,
				screenshot_3_filename: options.screenshot3Filename,
				screenshot_4_filename: options.screenshot4Filename,
			},
			requireAuth: false,
		});
	};

	public resetPassword = async (options: { email: string; emailGrantToken: string; password: string }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/users/reset_password`,
			json: {
				email: options.email,
				email_grant_token: options.emailGrantToken,
				password: options.password,
			},
			requireAuth: false,
		});
	};

	public searchLobiUsers = async (
		options: { nickname?: string; number?: number; from?: string } = {},
	): Promise<UsersResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/lobi_friends`,
			params: {
				nickname: options.nickname,
				number: options.number,
				from: options.from,
			},
			requireAuth: false,
		});
	};

	public searchUsers = async (options: {
		gender?: number;
		nickname?: string;
		title?: string;
		biography?: string;
		fromTimestamp?: number;
		similarAge?: boolean;
		notRecentGomimushi?: boolean;
		recentlyCreated?: boolean;
		samePrefecture?: boolean;
		prefecture?: string;
		saveRecentSearch?: boolean;
	}): Promise<UsersResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/users/search`,
			params: {
				gender: options.gender,
				nickname: options.nickname,
				title: options.title,
				biography: options.biography,
				from_timestamp: options.fromTimestamp,
				similar_age: options.similarAge,
				not_recent_gomimushi: options.notRecentGomimushi,
				recently_created: options.recentlyCreated,
				same_prefecture: options.samePrefecture,
				prefecture: options.prefecture,
				save_recent_search: options.saveRecentSearch,
			},
			requireAuth: false,
		});
	};

	public setAdditionalSettingEnabled = async (options: { mode: string; on?: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/users/additonal_notification_setting`,
			json: { mode: options.mode, on: options.on },
			requireAuth: false,
		});
	};

	public setFollowPermissionEnabled = async (options: { nickname: string; isPrivate?: boolean }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/users/edit`,
			json: {
				nickname: options.nickname,
				is_private: options,
				uuid: this.uuid,
				api_key: API_KEY,
				timestamp: Math.floor(Date.now() / 1000),
				signed_info: this.signedInfo,
			},
			requireAuth: false,
		});
	};

	public setSettingFollowRecommendationEnabled = async (options: { on: boolean }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/users/visible_on_sns_friend_recommendation_setting`,
			params: { on: options.on },
			requireAuth: false,
		});
	};

	public takeActionFollowRequest = async (options: { userId: number; action: string }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/users/${options.userId}/follow_request`,
			json: { action: options.action },
			requireAuth: false,
		});
	};

	public turnOnHima = async () => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/users/hima`,
			requireAuth: false,
		});
	};

	public unfollowUser = async (options: { userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/users/${options.userId}/unfollow`,
			requireAuth: false,
		});
	};

	public updateLanguage = async (options: { language: string }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/users/language`,
			json: {
				uuid: this.uuid,
				api_key: API_KEY,
				timestamp: Math.floor(Date.now() / 1000),
				signed_info: this.signedInfo,
				language: options.language,
			},
			requireAuth: false,
		});
	};

	public updateUser = async (options: {
		nickname: string;
		username?: string;
		biography?: string;
		prefecture?: string;
		gender?: number;
		countryCode?: string;
		profileIconFilename?: string;
		coverImageFilename?: string;
	}) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v3/users/edit`,
			json: {
				nickname: options.nickname,
				username: options.username,
				biography: options.biography,
				prefecture: options.prefecture,
				gender: options.gender,
				country_code: options.countryCode,
				profile_icon_filename: options.profileIconFilename,
				cover_image_filename: options.coverImageFilename,
				uuid: this.uuid,
				api_key: API_KEY,
				timestamp: Math.floor(Date.now() / 1000),
				signed_info: this.signedInfo,
			},
			requireAuth: false,
		});
	};

	public uploadTwitterFriendIds = async (options: { twitterFriendIds: string[] }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/users/twitter_friends`,
			json: { twitter_friend_ids: options.twitterFriendIds },
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
		return util.md5(this.uuid, Math.floor(Date.now() / 1000), true);
	}

	/** @ignore */
	private get signedVersion(): string {
		return util.sha256();
	}
}
