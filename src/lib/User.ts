import { BaseClient } from '../client/BaseClient';
import {
	ActiveFollowingsResponse,
	AdditionalSettingsResponse,
	FollowRecommendationsResponse,
	FollowRequestCountResponse,
	FootprintsResponse,
	HimaUsersResponse,
	RefreshCounterRequestsResponse,
	UserResponse,
	UserTimestampResponse,
	UsersByTimestampResponse,
	UsersResponse,
} from '../util/Responses';
import { API_KEY } from '../util/Constants';
import { HttpMethod } from '../util/Types';
import * as util from '../util/Utils';

/**
 * ユーザーAPI
 *
 * @remarks
 * ユーザーAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class UserAPI {
	public constructor(private readonly base: BaseClient) {}

	/** @ignore */
	private get signedInfo(): string {
		return util.md5(this.base.deviceUuid, Date.now(), false);
	}

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
				uuid: this.base.uuid,
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
}
