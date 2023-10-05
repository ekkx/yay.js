import { RequestMethod, SearchCriteria } from '../util/Types';
import { BaseClient } from '../client/BaseClient';
import {
	AdditionalSettingsResponse,
	ChatRoomResponse,
	ChatRoomsResponse,
	CreateChatRoomResponse,
	FollowUsersResponse,
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

	public acceptRequest = async (options: { chatRoomIds: number[] }) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/chat_rooms/accept_chat_request`,
			requireAuth: false,
			json: { 'chat_room_ids[]': options.chatRoomIds },
		});
	};

	public checkUnreadStatus = async (options: { fromTime?: number } = {}): Promise<UnreadStatusResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/chat_rooms/unread_status`,
			requireAuth: false,
			params: { from_time: options.fromTime },
		});
	};

	public createGroup = async (options: {
		name: string;
		withUserIds: number[];
		iconFilename?: string;
		backgroundFilename?: string;
	}): Promise<CreateChatRoomResponse> => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v3/chat_rooms/new`,
			requireAuth: false,
			json: {
				name: options.name,
				'with_user_ids[]': options.withUserIds,
				icon_filename: options.iconFilename,
				background_filename: options.backgroundFilename,
			},
		});
	};

	public createPrivate = async (options: {
		withUserId: number;
		matchingId?: number;
		himaChat?: boolean;
	}): Promise<CreateChatRoomResponse> => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/chat_rooms/new`,
			requireAuth: false,
			json: { with_user_id: options.withUserId, matching_id: options.matchingId, hima_chat: options.himaChat },
		});
	};

	public deleteBackground = async (options: { id: number }) => {
		return await this.base.request({
			method: RequestMethod.DELETE,
			route: `v2/chat_rooms/${options.id}/background`,
			requireAuth: false,
		});
	};

	public deleteMessage = async (options: { roomId: number; messageId: number }) => {
		return await this.base.request({
			method: RequestMethod.DELETE,
			route: `v1/chat_rooms/${options.roomId}/messages/${options.messageId}/delete`,
			requireAuth: false,
		});
	};

	public edit = async (options: { id: number; name?: number; iconFilename?: string; backgroundFilename?: string }) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v3/chat_rooms/${options.id}/edit`,
			requireAuth: false,
			json: {
				name: options.name,
				icon_filename: options.iconFilename,
				background_filename: options.backgroundFilename,
			},
		});
	};

	public getChatableUsers = async (
		// options?: SearchCriteria,
		options: { fromFollowId?: number; fromTimestamp?: number; orderBy?: string } = {},
	): Promise<FollowUsersResponse> => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/users/followings/chatable`,
			requireAuth: false,
			params: {
				from_follow_id: options.fromFollowId,
				from_timestamp: options.fromTimestamp,
				order_by: options.orderBy,
			},
		});
	};

	public getGifsData = async (): Promise<GifsDataResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/users/gif_data`,
			requireAuth: false,
		});
	};

	public getHiddenChatRooms = async (
		options: { number?: number; fromTimestamp?: number } = {},
	): Promise<ChatRoomsResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `/v1/hidden/chats`,
			requireAuth: false,
			params: { number: options.number, from_timestamp: options.fromTimestamp },
		});
	};

	public getMainRooms = async (options: { fromTimestamp?: number } = {}): Promise<ChatRoomsResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/chat_rooms/main_list`,
			requireAuth: false,
			params: { from_timestamp: options.fromTimestamp },
		});
	};

	public getMessages = async (options: {
		id: number;
		number?: number;
		fromMessageId?: number;
		toMessageId?: number;
	}): Promise<MessagesResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v2/chat_rooms/${options.id}/messages`,
			requireAuth: false,
			params: { number: options.number, from_message_id: options.fromMessageId, to_message_id: options.toMessageId },
		});
	};

	public getNotificationSettings = async (options: { id: number }): Promise<AdditionalSettingsResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v2/notification_settings/chat_rooms/${options.id}`,
			requireAuth: false,
		});
	};

	public getRequestRooms = async (options: { fromTimestamp?: number } = {}): Promise<ChatRoomsResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v1/chat_rooms/request_list`,
			requireAuth: false,
			params: { from_timestamp: options.fromTimestamp },
		});
	};

	public getRoom = async (options: { id: number }): Promise<ChatRoomResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v2/chat_rooms/${options.id}`,
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

	public hideChat = async (options: { chatRoomId: number }) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/hidden/chats`,
			requireAuth: true,
			json: { chat_room_id: options.chatRoomId },
		});
	};

	public invite = async (options: { id: number; withUserIds: number[] }) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v2/chat_rooms/${options.id}/invite`,
			requireAuth: true,
			json: { 'with_user_ids[]': options.withUserIds },
		});
	};

	public kickUsers = async (options: { id: number; withUserIds: number[] }) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v2/chat_rooms/${options.id}/kick`,
			requireAuth: true,
			json: { 'with_user_ids[]': options.withUserIds },
		});
	};

	public pin = async (options: { id: number }) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/chat_rooms/${options.id}/pinned`,
			requireAuth: true,
		});
	};

	public readAttachment = async (options: { id: number; attachmentMsgIds: number[] }) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/chat_rooms/${options.id}/attachments_read`,
			requireAuth: true,
			json: { 'attachment_msg_ids[]': options.attachmentMsgIds },
		});
	};

	public readMessage = async (options: { id: number; messageId: number }) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v2/chat_rooms/${options.id}/messages/${options.messageId}/read`,
			requireAuth: true,
		});
	};

	public readVideoMessage = async (options: { id: number; videoMsgIds: number }) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/chat_rooms/${options.id}/videos_read`,
			requireAuth: true,
			json: { 'video_msg_ids[]': options.videoMsgIds },
		});
	};

	public refreshRooms = async (options: { fromTime?: number } = {}): Promise<ChatRoomsResponse> => {
		return await this.base.request({
			method: RequestMethod.GET,
			route: `v2/chat_rooms/update`,
			requireAuth: true,
			params: { from_time: options.fromTime },
		});
	};

	public remove = async (options: { chatRoomIds: number[] }) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/chat_rooms/mass_destroy`,
			requireAuth: true,
			json: { 'chat_room_ids[]': options.chatRoomIds },
		});
	};

	public report = async (options: {
		chatRoomId: number;
		categoryId: number;
		reason?: string;
		opponentId?: number;
		screenshotFilename?: string;
		screenshot2Filename?: string;
		screenshot3Filename?: string;
		screenshot4Filename?: string;
	}) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v3/chat_rooms/${options.chatRoomId}/report`,
			requireAuth: false,
			json: {
				category_id: options.categoryId,
				reason: options.reason,
				opponent_id: options.opponentId,
				screenshot_filename: options.screenshotFilename,
				screenshot_2_filename: options.screenshot2Filename,
				screenshot_3_filename: options.screenshot3Filename,
				screenshot_4_filename: options.screenshot4Filename,
			},
		});
	};

	public sendMediaScreenshotNotification = async (options: { id: number }) => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v1/chat_rooms/${options.id}/screen_captured`,
			requireAuth: false,
		});
	};

	public sendMessage = async (options: {
		id: number;
		messageType?: string;
		callType?: string;
		text?: string;
		fontSize?: number;
		gifImageId?: number;
		attachmentFileName?: string;
		stickerPackId?: number;
		stickerId?: number;
		videoFileName?: string;
		parentId?: string;
	}): Promise<MessageResponse> => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v3/chat_rooms/${options.id}/messages/new`,
			requireAuth: false,
			json: {
				message_type: options.messageType,
				call_type: options.callType,
				text: options.text,
				font_size: options.fontSize,
				gif_image_id: options.gifImageId,
				attachment_file_name: options.attachmentFileName,
				sticker_pack_id: options.stickerPackId,
				sticker_id: options.stickerId,
				video_file_name: options.videoFileName,
				parent_id: options.parentId,
			},
		});
	};

	public setNotificationSettings = async (options: {
		id: number;
		notificationChat: number;
	}): Promise<NotificationSettingResponse> => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v2/notification_settings/chat_rooms/${options.id}`,
			requireAuth: false,
			json: { notification_chat: options.notificationChat },
		});
	};

	public unHideChat = async (options: { chatRoomIds: number[] }) => {
		return await this.base.request({
			method: RequestMethod.DELETE,
			route: `v1/hidden/chats`,
			requireAuth: false,
			params: { chat_room_ids: options.chatRoomIds },
		});
	};

	public unpin = async (options: { id: number }) => {
		return await this.base.request({
			method: RequestMethod.DELETE,
			route: `v1/chat_rooms/${options.id}/pinned`,
			requireAuth: false,
		});
	};
}
