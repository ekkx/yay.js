import { Json, Params, RequestMethod } from '../util/Types';
import { BaseClient } from '../client/BaseClient';
import { CreateChatRoomResponse, UnreadStatusResponse } from '../util/Responses';

export class ChatAPI {
	public constructor(private readonly base: BaseClient) {}

	public acceptRequest = async (chatRoomIds: number[]) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/chat_rooms/accept_chat_request`,
			requireAuth: false,
			json: { 'chat_room_ids[]': chatRoomIds },
		});
	};

	public checkUnreadStatus = async (fromTime?: number): Promise<UnreadStatusResponse> => {
		const params: Params = {};
		if (fromTime) params.fromTime = fromTime;

		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/chat_rooms/unread_status`,
			requireAuth: false,
			params: params,
		});
	};

	public createGroup = async (
		name: string,
		withUserIds: number[],
		iconFilename?: string,
		backgroundFilename?: string,
	): Promise<CreateChatRoomResponse> => {
		const json: Json = {};
		json.name = name;
		json['with_user_ids[]'] = withUserIds;

		if (iconFilename) json.iconFilename = iconFilename;
		if (backgroundFilename) json.backgroundFilename = backgroundFilename;

		return await this.base.request({
			method: RequestMethod.POST,
			route: `v3/chat_rooms/new`,
			requireAuth: false,
			json: json,
		});
	};

	public createPrivate = async (
		withUserId: number,
		matchingId?: number,
		himaChat?: boolean,
	): Promise<CreateChatRoomResponse> => {
		const json: Json = {};
		json.withUserId = withUserId;

		if (matchingId) json.matchingId = matchingId;
		if (himaChat) json.himaChat = himaChat;

		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/chat_rooms/new`,
			requireAuth: false,
			json: json,
		});
	};

	public deleteBackground = async (id: number) => {
		return await this.base.request({
			method: RequestMethod.DELETE,
			route: `v2/chat_rooms/${id}/background`,
			requireAuth: false,
		});
	};

	public deleteMessage = async (roomId: number, messageId: number) => {
		return await this.base.request({
			method: RequestMethod.DELETE,
			route: `v1/chat_rooms/${roomId}/messages/${messageId}/delete`,
			requireAuth: false,
		});
	};

	public edit = async (id: number, name?: number, iconFilename?: string, backgroundFilename?: string) => {
		const json: Json = {};
		json.name = name;

		if (iconFilename) json.iconFilename = iconFilename;
		if (backgroundFilename) json.backgroundFilename = backgroundFilename;

		return await this.base.request({
			method: RequestMethod.POST,
			route: `v3/chat_rooms/${id}/edit`,
			requireAuth: false,
			json: json,
		});
	};
}
