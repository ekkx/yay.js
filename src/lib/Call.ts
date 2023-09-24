import { RequestMethod } from '../util/Types';
import { REST } from '../util/Rest';
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

export class CallApi {
	public constructor(private readonly rest: REST) {}

	bumpCall = async (call_id: number, participant_limit?: number) => {
		return await this.rest.request({
			method: RequestMethod.POST,
			route: `v1/calls/${call_id}/bump`,
			requireAuth: true,
			params: { participant_limit: participant_limit },
		});
	};

	getActiveCall = async (user_id: number): Promise<PostResponse> => {
		return await this.rest.request({
			method: RequestMethod.GET,
			route: `v1/posts/active_call`,
			requireAuth: false,
			params: { user_id: user_id },
		});
	};

	getBgms = async (): Promise<BgmsResponse> => {
		return await this.rest.request({
			method: RequestMethod.GET,
			route: `v1/calls/bgm`,
			requireAuth: false,
		});
	};

	getCall = async (call_id: number): Promise<ConferenceCallResponse> => {
		return await this.rest.request({
			method: RequestMethod.GET,
			route: `v1/calls/conferences/${call_id}`,
			requireAuth: false,
		});
	};

	getCallInvitableUsers = async (
		call_id: number,
		from_timestamp?: number,
		nickname?: string,
	): Promise<UsersByTimestampResponse> => {
		const params: Record<string, any> = {};

		if (from_timestamp) params.from_timestamp = from_timestamp;
		if (nickname) params.nickname = nickname;

		return await this.rest.request({
			method: RequestMethod.GET,
			route: `v1/calls/conferences/${call_id}`,
			requireAuth: false,
			params: params,
		});
	};

	getCallStatus = async (opponent_id: number): Promise<CallStatusResponse> => {
		return await this.rest.request({
			method: RequestMethod.GET,
			route: `v1/calls/phone_status/${opponent_id}`,
			requireAuth: false,
		});
	};

	getGames = async (number: number, ids: number[], from_id?: number): Promise<GamesResponse> => {
		const params: Record<string, any> = {};

		params.number = number;
		params['ids[]'] = ids;

		if (from_id) params.from_id = from_id;

		return await this.rest.request({
			method: RequestMethod.GET,
			route: `v1/games/apps`,
			requireAuth: false,
			params: params,
		});
	};

	getGenres = async (number: number, from: number): Promise<GenresResponse> => {
		const params: Record<string, any> = {};
		params.number = number;

		if (from) params.from = from;

		return await this.rest.request({
			method: RequestMethod.GET,
			route: `v1/genres`,
			requireAuth: false,
			params: params,
		});
	};

	getGroupCalls = async (
		number?: number,
		group_category_id?: number,
		from_timestamp?: number,
		scope?: string,
	): Promise<PostsResponse> => {
		const params: Record<string, any> = {};

		if (from_timestamp) params.from_timestamp = from_timestamp;
		if (group_category_id) params.group_category_id = group_category_id;
		if (number) params.number = number;
		if (scope) params.scope = scope;

		return await this.rest.request({
			method: RequestMethod.GET,
			route: `v1/posts/group_calls`,
			requireAuth: false,
			params: params,
		});
	};

	inviteToCallBulk = async (call_id: number, group_id: number) => {
		return await this.rest.request({
			method: RequestMethod.POST,
			route: `v1/calls/${call_id}/bulk_invite`,
			requireAuth: true,
			params: group_id ? { group_id: group_id } : {},
		});
	};

	inviteUsersToCall = async (call_id: number, user_ids: number[]) => {
		return await this.rest.request({
			method: RequestMethod.POST,
			route: `v1/calls/conference_calls/${call_id}/invite`,
			requireAuth: true,
			json: { 'user_ids[]': user_ids },
		});
	};

	inviteUsersToChatCall = async (chat_room_id?: number, room_id?: number, room_url?: string) => {
		const json: Record<string, any> = {};

		if (chat_room_id) json.chat_room_id = chat_room_id;
		if (room_id) json.room_id = room_id;
		if (room_url) json.room_url = room_url;

		return await this.rest.request({
			method: RequestMethod.POST,
			route: `v2/calls/invite`,
			requireAuth: true,
			json: json,
		});
	};

	kickAndBanFromCall = async (call_id: number, user_id: number) => {
		return await this.rest.request({
			method: RequestMethod.POST,
			route: `v1/calls/conference_calls/${call_id}/kick`,
			requireAuth: true,
			json: { call_id: call_id, user_id: user_id },
		});
	};

	notifyAnonymousUserLeaveAgoraChannel = async (conference_id: number, agora_uid: string) => {
		return await this.rest.request({
			method: RequestMethod.POST,
			route: `v1/anonymous_calls/leave_agora_channel`,
			requireAuth: false,
			json: { conference_id: conference_id, agora_uid: agora_uid },
		});
	};

	notifyUserLeaveAgoraChannel = async (conference_id: number, user_id: number) => {
		return await this.rest.request({
			method: RequestMethod.POST,
			route: `v1/calls/leave_agora_channel`,
			requireAuth: false,
			json: { conference_id: conference_id, user_id: user_id },
		});
	};

	sendCallScreenshot = async (screenshot_filename: string, conference_id: number) => {
		return await this.rest.request({
			method: RequestMethod.PUT,
			route: `v1/calls/screenshot`,
			requireAuth: false,
			json: { screenshot_filename: screenshot_filename, conference_id: conference_id },
		});
	};

	setCall = async (call_id: number, joinable_by: string, game_title?: string, category_id?: string) => {
		const json: Record<string, any> = {};
		json.joinable_by = joinable_by;

		if (category_id) json.category_id = category_id;
		if (game_title) json.game_title = game_title;

		return await this.rest.request({
			method: RequestMethod.PUT,
			route: `v1/calls/${call_id}`,
			requireAuth: true,
			json: json,
		});
	};

	setUserRole = async (call_id: number, user_id: number, role: string) => {
		return await this.rest.request({
			method: RequestMethod.PUT,
			route: `/v1/calls/${call_id}/users/${user_id}`,
			requireAuth: true,
			json: { role: role },
		});
	};
}
