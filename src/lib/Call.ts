import { BaseClient } from '../client/BaseClient';
import { HttpMethod } from '../util/Types';
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

/**
 * **通話API**
 *
 * @remarks
 * 通話APIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class CallAPI {
	public constructor(private readonly base: BaseClient) {}

	public bumpCall = async (options: { callId: number; participantLimit?: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/calls/${options.callId}/bump`,
			requireAuth: true,
			params: { participant_limit: options.participantLimit },
		});
	};

	public getActiveCall = async (options: { userId: number }): Promise<PostResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/posts/active_call`,
			requireAuth: false,
			params: { user_id: options.userId },
		});
	};

	public getBgms = async (): Promise<BgmsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/calls/bgm`,
			requireAuth: false,
		});
	};

	public getCall = async (options: { callId: number }): Promise<ConferenceCallResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/calls/conferences/${options.callId}`,
			requireAuth: false,
		});
	};

	public getCallInvitableUsers = async (options: {
		callId: number;
		fromTimestamp?: number;
		nickname?: string;
	}): Promise<UsersByTimestampResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/calls/${options.callId}/users/invitable`,
			requireAuth: false,
			params: { from_timestamp: options.fromTimestamp, nickname: options.nickname },
		});
	};

	public getCallStatus = async (options: { opponentId: number }): Promise<CallStatusResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/calls/phone_status/${options.opponentId}`,
			requireAuth: false,
		});
	};

	public getGames = async (options: { number: number; gameIds: number[]; fromId?: number }): Promise<GamesResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/games/apps`,
			requireAuth: false,
			params: { number: options.number, 'ids[]': options.gameIds, from_id: options.fromId },
		});
	};

	public getGenres = async (options: { number: number; from: number }): Promise<GenresResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/genres`,
			requireAuth: false,
			params: { number: options.number, from: options.from },
		});
	};

	public getGroupCalls = async (
		options: { number?: number; groupCategoryId?: number; fromTimestamp?: number; scope?: string } = {},
	): Promise<PostsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/posts/group_calls`,
			requireAuth: false,
			params: {
				from_timestamp: options.fromTimestamp,
				group_category_id: options.groupCategoryId,
				number: options.number,
				scope: options.scope,
			},
		});
	};

	public inviteToCallBulk = async (options: { callId: number; groupId?: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/calls/${options.callId}/bulk_invite`,
			requireAuth: true,
			params: { group_id: options.groupId },
		});
	};

	public inviteUsersToCall = async (options: { callId: number; userIds: number[] }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/calls/conference_calls/${options.callId}/invite`,
			requireAuth: true,
			json: { user_ids: options.userIds },
		});
	};

	public inviteUsersToChatCall = async (options: { chatRoomId?: number; roomId?: number; roomUrl?: string } = {}) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/calls/invite`,
			requireAuth: true,
			json: { chat_room_id: options.chatRoomId, room_id: options.roomId, room_url: options.roomUrl },
		});
	};

	public kickAndBanFromCall = async (options: { callId: number; userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/calls/conference_calls/${options.callId}/kick`,
			requireAuth: true,
			json: { call_id: options.callId, user_id: options.userId },
		});
	};

	public notifyAnonymousUserLeaveAgoraChannel = async (options: { conferenceId: number; agoraUid: string }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/anonymous_calls/leave_agora_channel`,
			requireAuth: false,
			json: { conference_id: options.conferenceId, agora_uid: options.agoraUid },
		});
	};

	public notifyUserLeaveAgoraChannel = async (options: { conferenceId: number; userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/calls/leave_agora_channel`,
			requireAuth: false,
			json: { conference_id: options.conferenceId, user_id: options.userId },
		});
	};

	public sendCallScreenshot = async (options: { screenshotFilename: string; conferenceId: number }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/calls/screenshot`,
			requireAuth: false,
			json: { screenshot_filename: options.screenshotFilename, conference_id: options.conferenceId },
		});
	};

	public setCall = async (options: { callId: number; joinableBy: string; gameTitle?: string; categoryId?: string }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/calls/${options.callId}`,
			requireAuth: true,
			json: { joinable_by: options.joinableBy, game_title: options.gameTitle, category_id: options.categoryId },
		});
	};

	public setUserRole = async (options: { callId: number; userId: number; role: string }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/calls/${options.callId}/users/${options.userId}`,
			requireAuth: true,
			json: { role: options.role },
		});
	};

	public startCall = async (options: { conferenceId: number; callSid?: string }): Promise<ConferenceCallResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v2/calls/start_conference_call`,
			requireAuth: false,
			json: { conference_id: options.conferenceId, call_sid: options.callSid },
		});
	};

	public stopCall = async (options: { conferenceId: number; callSid?: string }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/calls/leave_conference_call`,
			requireAuth: false,
			json: { conference_id: options.conferenceId, call_sid: options.callSid },
		});
	};

	public startAnonymousCall = async (options: {
		conferenceId: number;
		AgoraUid?: string;
	}): Promise<ConferenceCallResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/anonymous_calls/start_conference_call`,
			requireAuth: false,
			json: { conference_id: options.conferenceId, agora_uid: options.AgoraUid },
		});
	};

	public stopAnonymousCall = async (options: { conferenceId: number; AgoraUid?: string }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/anonymous_calls/leave_conference_call`,
			requireAuth: false,
			json: { conference_id: options.conferenceId, agora_uid: options.AgoraUid },
		});
	};
}
