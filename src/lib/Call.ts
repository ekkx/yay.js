import { BaseClient } from '../client/BaseClient';
import { RequestMethod } from '../util/Types';
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
			params: { participant_limit: participantLimit },
		});
	};

	public getActiveCall = async (userId: number): Promise<PostResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/posts/active_call`,
			requireAuth: false,
			params: { user_id: userId },
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
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/calls/conferences/${callId}`,
			requireAuth: false,
			params: { from_timestamp: fromTimestamp, nickname: nickname },
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
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/games/apps`,
			requireAuth: false,
			params: { number: number, 'ids[]': ids, from_id: fromId },
		});
	};

	public getGenres = async (number: number, from: number): Promise<GenresResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/genres`,
			requireAuth: false,
			params: { number: number, from: from },
		});
	};

	public getGroupCalls = async (
		number?: number,
		groupCategoryId?: number,
		fromTimestamp?: number,
		scope?: string,
	): Promise<PostsResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/posts/group_calls`,
			requireAuth: false,
			params: { from_timestamp: fromTimestamp, group_category_id: groupCategoryId, number: number, scope: scope },
		});
	};

	public inviteToCallBulk = async (callId: number, groupId: number) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/calls/${callId}/bulk_invite`,
			requireAuth: true,
			params: { group_id: groupId },
		});
	};

	public inviteUsersToCall = async (callId: number, userIds: number[]) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/calls/conference_calls/${callId}/invite`,
			requireAuth: true,
			json: { 'user_ids[]': userIds },
		});
	};

	public inviteUsersToChatCall = async (chatRoomId?: number, roomId?: number, roomUrl?: string) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v2/calls/invite`,
			requireAuth: true,
			json: { chat_room_id: chatRoomId, room_id: roomId, room_url: roomUrl },
		});
	};

	public kickAndBanFromCall = async (callId: number, userId: number) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/calls/conference_calls/${callId}/kick`,
			requireAuth: true,
			json: { call_id: callId, user_id: userId },
		});
	};

	public notifyAnonymousUserLeaveAgoraChannel = async (conferenceId: number, agoraUid: string) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/anonymous_calls/leave_agora_channel`,
			requireAuth: false,
			json: { conference_id: conferenceId, agora_uid: agoraUid },
		});
	};

	public notifyUserLeaveAgoraChannel = async (conferenceId: number, userId: number) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/calls/leave_agora_channel`,
			requireAuth: false,
			json: { conference_id: conferenceId, user_id: userId },
		});
	};

	public sendCallScreenshot = async (screenshotFilename: string, conferenceId: number) => {
		return await this.base.request({
			method: RequestMethod.PUT,
			route: `v1/calls/screenshot`,
			requireAuth: false,
			json: { screenshot_filename: screenshotFilename, conference_id: conferenceId },
		});
	};

	public setCall = async (callId: number, joinableBy: string, gameTitle?: string, categoryId?: string) => {
		return await this.base.request({
			method: RequestMethod.PUT,
			route: `v1/calls/${callId}`,
			requireAuth: true,
			json: { joinable_by: joinableBy, game_title: gameTitle, category_id: categoryId },
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
			json: { conference_id: conferenceId, call_sid: callSid },
		});
	};

	public stopCall = async (conferenceId: number, callSid: string) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/calls/leave_conference_call`,
			requireAuth: false,
			json: { conference_id: conferenceId, call_sid: callSid },
		});
	};
}
