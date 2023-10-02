import { RequestMethod, SearchCriteria } from '../util/Types';
import { BaseClient } from '../client/BaseClient';
import {
	AdditionalSettingsResponse,
	ChatRoomResponse,
	ChatRoomsResponse,
	CreateChatRoomResponse,
	GifsDataResponse,
	MessageResponse,
	MessagesResponse,
	NotificationSettingResponse,
	StickerPacksResponse,
	TotalChatRequestResponse,
	UnreadStatusResponse,
} from '../util/Responses';

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
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/chat_rooms/unread_status`,
			requireAuth: false,
			params: fromTime ? { from_time: fromTime } : {},
		});
	};

	public createGroup = async (
		name: string,
		withUserIds: number[],
		iconFilename?: string,
		backgroundFilename?: string,
	): Promise<CreateChatRoomResponse> => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v3/chat_rooms/new`,
			requireAuth: false,
			json: {
				name: name,
				'with_user_ids[]': withUserIds,
				icon_filename: iconFilename,
				background_filename: backgroundFilename,
			},
		});
	};

	public createPrivate = async (
		withUserId: number,
		matchingId?: number,
		himaChat?: boolean,
	): Promise<CreateChatRoomResponse> => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/chat_rooms/new`,
			requireAuth: false,
			json: { with_user_id: withUserId, matching_id: matchingId, hima_chat: himaChat },
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
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v3/chat_rooms/${id}/edit`,
			requireAuth: false,
			json: { name: name, icon_filename: iconFilename, background_filename: backgroundFilename },
		});
	};

	public getChatableUsers = async (
		// options?: SearchCriteria,
		fromFollowId?: number,
		fromTimestamp?: number,
		orderBy?: string,
	) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/users/followings/chatable`,
			requireAuth: false,
			params: { from_follow_id: fromFollowId, from_timestamp: fromTimestamp, order_by: orderBy },
		});
	};

	public getGifsData = async (): Promise<GifsDataResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/users/gif_data`,
			requireAuth: false,
		});
	};

	public getHiddenChatRooms = async (number?: number, fromTimestamp?: number): Promise<ChatRoomsResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `/v1/hidden/chats`,
			requireAuth: false,
			params: { number: number, from_timestamp: fromTimestamp },
		});
	};

	public getMainRooms = async (fromTimestamp?: number): Promise<ChatRoomsResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/chat_rooms/main_list`,
			requireAuth: false,
			params: fromTimestamp ? { from_timestamp: fromTimestamp } : {},
		});
	};

	public getMessages = async (
		id: number,
		number?: number,
		fromMessageId?: number,
		toMessageId?: number,
	): Promise<MessagesResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v2/chat_rooms/${id}/messages`,
			requireAuth: false,
			params: { number: number, from_message_id: fromMessageId, to_message_id: toMessageId },
		});
	};

	public getNotificationSettings = async (id: number): Promise<AdditionalSettingsResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v2/notification_settings/chat_rooms/${id}`,
			requireAuth: false,
		});
	};

	public getRequestRooms = async (fromTimestamp?: number): Promise<ChatRoomsResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/chat_rooms/request_list`,
			requireAuth: false,
			params: fromTimestamp ? { from_timestamp: fromTimestamp } : {},
		});
	};

	public getRoom = async (id: number): Promise<ChatRoomResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v2/chat_rooms/${id}`,
			requireAuth: false,
		});
	};

	public getStickerPacks = async (): Promise<StickerPacksResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v2/sticker_packs`,
			requireAuth: false,
		});
	};

	public getTotalRequests = async (): Promise<TotalChatRequestResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/chat_rooms/total_chat_request`,
			requireAuth: true,
		});
	};

	public hideChat = async (chatRoomId: number) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/hidden/chats`,
			requireAuth: true,
			json: { chat_room_id: chatRoomId },
		});
	};

	public invite = async (id: number, withUserIds: number[]) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v2/chat_rooms/${id}/invite`,
			requireAuth: true,
			json: { 'with_user_ids[]': withUserIds },
		});
	};

	public kickUsers = async (id: number, withUserIds: number[]) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v2/chat_rooms/${id}/kick`,
			requireAuth: true,
			json: { 'with_user_ids[]': withUserIds },
		});
	};

	public pin = async (id: number) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/chat_rooms/${id}/pinned`,
			requireAuth: true,
		});
	};

	public readAttachment = async (id: number, attachmentMsgIds: number[]) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/chat_rooms/${id}/attachments_read`,
			requireAuth: true,
			json: { 'attachment_msg_ids[]': attachmentMsgIds },
		});
	};

	public readMessage = async (id: number, messageId: number) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v2/chat_rooms/${id}/messages/${messageId}/read`,
			requireAuth: true,
		});
	};

	public readVideoMessage = async (id: number, videoMsgIds: number) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/chat_rooms/${id}/videos_read`,
			requireAuth: true,
			json: { 'video_msg_ids[]': videoMsgIds },
		});
	};

	public refreshRooms = async (fromTime?: number): Promise<ChatRoomsResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v2/chat_rooms/update`,
			requireAuth: true,
			params: fromTime ? { from_time: fromTime } : {},
		});
	};

	public remove = async (chatRoomIds: number[]) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/chat_rooms/mass_destroy`,
			requireAuth: true,
			json: { 'chat_room_ids[]': chatRoomIds },
		});
	};

	public report = async (
		chatRoomId: number,
		categoryId: number,
		reason?: string,
		opponentId?: number,
		screenshotFilename?: string,
		screenshot2Filename?: string,
		screenshot3Filename?: string,
		screenshot4Filename?: string,
	) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v3/chat_rooms/${chatRoomId}/report`,
			requireAuth: false,
			json: {
				category_id: categoryId,
				reason: reason,
				opponent_id: opponentId,
				screenshot_filename: screenshotFilename,
				screenshot_2_filename: screenshot2Filename,
				screenshot_3_filename: screenshot3Filename,
				screenshot_4_filename: screenshot4Filename,
			},
		});
	};

	public sendMediaScreenshotNotification = async (id: number) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/chat_rooms/${id}/screen_captured`,
			requireAuth: false,
		});
	};

	public sendMessage = async (
		id: number,
		messageType?: string,
		callType?: string,
		text?: string,
		fontSize?: number,
		gifImageId?: number,
		attachmentFileName?: string,
		stickerPackId?: number,
		stickerId?: number,
		videoFileName?: string,
		parentId?: string,
	): Promise<MessageResponse> => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v3/chat_rooms/${id}/messages/new`,
			requireAuth: false,
			json: {
				message_type: messageType,
				call_type: callType,
				text: text,
				font_size: fontSize,
				gif_image_id: gifImageId,
				attachment_file_name: attachmentFileName,
				sticker_pack_id: stickerPackId,
				sticker_id: stickerId,
				video_file_name: videoFileName,
				parent_id: parentId,
			},
		});
	};

	public setNotificationSettings = async (
		id: number,
		notificationChat: number,
	): Promise<NotificationSettingResponse> => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v2/notification_settings/chat_rooms/${id}`,
			requireAuth: false,
			json: { notification_chat: notificationChat },
		});
	};

	public unHideChat = async (chatRoomIds: number[]) => {
		return await this.base.request({
			method: RequestMethod.DELETE,
			route: `v1/hidden/chats`,
			requireAuth: false,
			params: { chat_room_ids: chatRoomIds },
		});
	};

	public unpin = async (id: number) => {
		return await this.base.request({
			method: RequestMethod.DELETE,
			route: `v1/chat_rooms/${id}/pinned`,
			requireAuth: false,
		});
	};
}
