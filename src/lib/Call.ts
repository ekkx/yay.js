import { GetGamesOptions, GetCallInvitableUsersOptions, RequestMethod, GetGroupCallsOptions } from '../util/Types';
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

	getCallInvitableUsers = async (options: GetCallInvitableUsersOptions): Promise<UsersByTimestampResponse> => {
		const params: Record<string, any> = {};

		if (options.from_timestamp) {
			params.from_timestamp = options.from_timestamp;
		}

		if (options.nickname) {
			params.nickname = options.nickname;
		}

		return await this.rest.request({
			method: RequestMethod.GET,
			route: `v1/calls/conferences/${options.call_id}`,
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

	getGames = async (options: GetGamesOptions): Promise<GamesResponse> => {
		const params: Record<string, any> = {};

		params.number = options.number;
		params['ids[]'] = options.ids;

		if (options.from_id) {
			params.from_id = options.from_id;
		}

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

		if (from) {
			params.from = from;
		}

		return await this.rest.request({
			method: RequestMethod.GET,
			route: `v1/genres`,
			requireAuth: false,
			params: params,
		});
	};

	getGroupCalls = async (options: GetGroupCallsOptions): Promise<PostsResponse> => {
		const params: Record<string, any> = {};

		if (options.from_timestamp) {
			params.from_timestamp = options.from_timestamp;
		}

		if (options.group_category_id) {
			params.group_category_id = options.group_category_id;
		}

		if (options.number) {
			params.number = options.number;
		}

		if (options.scope) {
			params.scope = options.scope;
		}

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
			params: { 'user_ids[]': user_ids },
		});
	};
}
