import { BaseClient } from '../client/BaseClient';
import { Json, Params, RequestMethod } from '../util/Types';
import {
	PostResponse,
	BgmsResponse,
	ConferenceCallResponse,
	UsersByTimestampResponse,
	CallStatusResponse,
	GamesResponse,
	GenresResponse,
	PostsResponse,
} from '../util/Responses';

export class CallAPI {
	public constructor(private readonly base: BaseClient) {}

	public bumpCall = async (callId: number, participantLimit?: number) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/calls/${callId}/bump`,
			requireAuth: true,
			params: { participantLimit: participantLimit },
		});
	};

	public getActiveCall = async (userId: number): Promise<PostResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/posts/active_call`,
			requireAuth: false,
			params: { userId: userId },
		});
	};

	public getBgms = async (): Promise<BgmsResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/calls/bgm`,
			requireAuth: false,
		});
	};

	public getCall = async (callId: number): Promise<ConferenceCallResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/calls/conferences/${callId}`,
			requireAuth: false,
		});
	};

	public getCallInvitableUsers = async (
		callId: number,
		fromTimestamp?: number,
		nickname?: string,
	): Promise<UsersByTimestampResponse> => {
		const params: Params = {};

		if (fromTimestamp) params.fromTimestamp = fromTimestamp;
		if (nickname) params.nickname = nickname;

		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/calls/conferences/${callId}`,
			requireAuth: false,
			params: params,
		});
	};

	public getCallStatus = async (opponentId: number): Promise<CallStatusResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/calls/phone_status/${opponentId}`,
			requireAuth: false,
		});
	};

	public getGames = async (number: number, ids: number[], fromId?: number): Promise<GamesResponse> => {
		const params: Params = {};

		params.number = number;
		params['ids[]'] = ids;

		if (fromId) params.fromId = fromId;

		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/games/apps`,
			requireAuth: false,
			params: params,
		});
	};

	public getGenres = async (number: number, from: number): Promise<GenresResponse> => {
		const params: Params = {};
		params.number = number;

		if (from) params.from = from;

		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/genres`,
			requireAuth: false,
			params: params,
		});
	};

	public getGroupCalls = async (
		number?: number,
		groupCategoryId?: number,
		fromTimestamp?: number,
		scope?: string,
	): Promise<PostsResponse> => {
		const params: Params = {};

		if (fromTimestamp) params.fromTimestamp = fromTimestamp;
		if (groupCategoryId) params.groupCategoryId = groupCategoryId;
		if (number) params.number = number;
		if (scope) params.scope = scope;

		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/posts/group_calls`,
			requireAuth: false,
			params: params,
		});
	};

	public inviteToCallBulk = async (callId: number, groupId: number) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/calls/${callId}/bulk_invite`,
			requireAuth: true,
			params: groupId ? { groupId: groupId } : {},
		});
	};

	public inviteUsersToCall = async (callId: number, userIds: number[]) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/calls/conference_calls/${callId}/invite`,
			requireAuth: true,
			json: { 'userIds[]': userIds },
		});
	};

	public inviteUsersToChatCall = async (chatRoomId?: number, roomId?: number, roomUrl?: string) => {
		const json: Json = {};

		if (chatRoomId) json.chatRoomId = chatRoomId;
		if (roomId) json.roomId = roomId;
		if (roomUrl) json.roomUrl = roomUrl;

		return await this.base.request({
			method: RequestMethod.POST,
			route: `v2/calls/invite`,
			requireAuth: true,
			json: json,
		});
	};

	public kickAndBanFromCall = async (callId: number, userId: number) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/calls/conference_calls/${callId}/kick`,
			requireAuth: true,
			json: { callId: callId, userId: userId },
		});
	};

	public notifyAnonymousUserLeaveAgoraChannel = async (conferenceId: number, agoraUid: string) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/anonymous_calls/leave_agora_channel`,
			requireAuth: false,
			json: { conferenceId: conferenceId, agoraUid: agoraUid },
		});
	};

	public notifyUserLeaveAgoraChannel = async (conferenceId: number, userId: number) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/calls/leave_agora_channel`,
			requireAuth: false,
			json: { conferenceId: conferenceId, userId: userId },
		});
	};

	public sendCallScreenshot = async (screenshotFilename: string, conferenceId: number) => {
		return await this.base.request({
			method: RequestMethod.PUT,
			route: `v1/calls/screenshot`,
			requireAuth: false,
			json: { screenshotFilename: screenshotFilename, conferenceId: conferenceId },
		});
	};

	public setCall = async (callId: number, joinableBy: string, gameTitle?: string, categoryId?: string) => {
		const json: Json = {};
		json.joinableBy = joinableBy;

		if (categoryId) json.categoryId = categoryId;
		if (gameTitle) json.gameTitle = gameTitle;

		return await this.base.request({
			method: RequestMethod.PUT,
			route: `v1/calls/${callId}`,
			requireAuth: true,
			json: json,
		});
	};

	public setUserRole = async (callId: number, userId: number, role: string) => {
		return await this.base.request({
			method: RequestMethod.PUT,
			route: `/v1/calls/${callId}/users/${userId}`,
			requireAuth: true,
			json: { role: role },
		});
	};

	public startCall = async (conferenceId: number, callSid: string): Promise<ConferenceCallResponse> => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v2/calls/start_conference_call`,
			requireAuth: false,
			json: { conferenceId: conferenceId, callSid: callSid },
		});
	};

	public stopCall = async (conferenceId: number, callSid: string) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/calls/leave_conference_call`,
			requireAuth: false,
			json: { conferenceId: conferenceId, callSid: callSid },
		});
	};
}
