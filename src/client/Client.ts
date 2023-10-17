import { BaseClient } from './BaseClient';
import { ClientOptions } from '../util/Types';
import { API_KEY } from '../util/Constants';
import {
	AdditionalSettingsResponse,
	ChatRoomResponse,
	ChatRoomsResponse,
	CreateChatRoomResponse,
	FollowUsersResponse,
	GifsDataResponse,
	LoginUserResponse,
	MessageResponse,
	MessagesResponse,
	NotificationSettingResponse,
	PolicyAgreementsResponse,
	StickerPacksResponse,
	TokenResponse,
	TotalChatRequestResponse,
	UnreadStatusResponse,
} from '../util/Responses';
import { Post, SharedUrl } from '../util/Models';
import { objectToSnake } from '../util/CaseConverter';

export class Client extends BaseClient {
	public constructor(options?: ClientOptions) {
		super(options);
	}

	// AuthAPI

	public login = async (options: { email: string; password: string }): Promise<LoginUserResponse> => {
		const loginResponse = await this.prepare({
			apiKey: API_KEY,
			email: options.email,
			password: options.password,
			uuid: this.uuid,
		});

		// 利用規約に同意する
		const policyResponse = await this.getPolicyAgreements();
		if (!policyResponse.latestPrivacyPolicyAgreed) {
			this.acceptPolicyAgreement({ type: 'privacy_policy' });
		}
		if (!policyResponse.latestTermsOfUseAgreed) {
			this.acceptPolicyAgreement({ type: 'terms_of_use' });
		}

		return loginResponse;
	};

	// BlockAPI

	// CallAPI

	// ChatAPI

	public acceptChatRequest = async (options: { chatRoomIds: number[] }) => {
		return await this.chatAPI.acceptRequest(options);
	};

	public checkUnreadStatus = async (options: { fromTime?: number } = {}): Promise<UnreadStatusResponse> => {
		return await this.chatAPI.checkUnreadStatus(options);
	};

	public createGroupChat = async (options: {
		name: string;
		withUserIds: number[];
		iconFilename?: string;
		backgroundFilename?: string;
	}): Promise<CreateChatRoomResponse> => {
		return await this.chatAPI.createGroup(options);
	};

	public createPrivateChat = async (options: {
		withUserId: number;
		matchingId?: number;
		himaChat?: boolean;
	}): Promise<CreateChatRoomResponse> => {
		return await this.chatAPI.createPrivate(options);
	};

	public deleteChatBackground = async (options: { id: number }) => {
		return await this.chatAPI.deleteBackground(options);
	};

	public deleteMessage = async (options: { roomId: number; messageId: number }) => {
		return await this.chatAPI.deleteMessage(options);
	};

	public editChatRoom = async (options: {
		id: number;
		name?: number;
		iconFilename?: string;
		backgroundFilename?: string;
	}) => {
		return await this.chatAPI.edit(options);
	};

	public getChatableUsers = async (
		// options?: SearchCriteria,
		options: { fromFollowId?: number; fromTimestamp?: number; orderBy?: string } = {},
	): Promise<FollowUsersResponse> => {
		return await this.chatAPI.getChatableUsers(options);
	};

	public getGifsData = async (): Promise<GifsDataResponse> => {
		return await this.chatAPI.getGifsData();
	};

	public getHiddenChatRooms = async (
		options: { number?: number; fromTimestamp?: number } = {},
	): Promise<ChatRoomsResponse> => {
		return await this.getHiddenChatRooms(options);
	};

	public getMainChatRooms = async (options: { fromTimestamp?: number } = {}): Promise<ChatRoomsResponse> => {
		return await this.chatAPI.getMainRooms(options);
	};

	public getMessages = async (options: {
		id: number;
		number?: number;
		fromMessageId?: number;
		toMessageId?: number;
	}): Promise<MessagesResponse> => {
		return await this.chatAPI.getMessages(options);
	};

	public getChatNotificationSettings = async (options: { id: number }): Promise<AdditionalSettingsResponse> => {
		return await this.chatAPI.getNotificationSettings(options);
	};

	public getChatRequests = async (options: { fromTimestamp?: number } = {}): Promise<ChatRoomsResponse> => {
		return await this.chatAPI.getRequestRooms(options);
	};

	public getChatRoom = async (options: { id: number }): Promise<ChatRoomResponse> => {
		return await this.chatAPI.getRoom(options);
	};

	public getStickerPacks = async (): Promise<StickerPacksResponse> => {
		return await this.chatAPI.getStickerPacks();
	};

	public getTotalChatRequests = async (): Promise<TotalChatRequestResponse> => {
		return await this.chatAPI.getTotalRequests();
	};

	public hideChatRoom = async (options: { chatRoomId: number }) => {
		return await this.chatAPI.hideChat(options);
	};

	public inviteUsersToChatRoom = async (options: { id: number; withUserIds: number[] }) => {
		return await this.chatAPI.invite(options);
	};

	public kickUsersFromChatRoom = async (options: { id: number; withUserIds: number[] }) => {
		return await this.chatAPI.kickUsers(options);
	};

	public pinChatRoom = async (options: { id: number }) => {
		return await this.chatAPI.pin(options);
	};

	public readMessageAttachment = async (options: { id: number; attachmentMsgIds: number[] }) => {
		return await this.chatAPI.readAttachment(options);
	};

	public readMessage = async (options: { id: number; messageId: number }) => {
		return await this.chatAPI.readMessage(options);
	};

	public readVideoMessage = async (options: { id: number; videoMsgIds: number }) => {
		return await this.chatAPI.readVideoMessage(options);
	};

	public refreshChatRooms = async (options: { fromTime?: number } = {}): Promise<ChatRoomsResponse> => {
		return await this.chatAPI.refreshRooms(options);
	};

	public removeChatRooms = async (options: { chatRoomIds: number[] }) => {
		return await this.chatAPI.remove(options);
	};

	public reportChatRoom = async (options: {
		chatRoomId: number;
		categoryId: number;
		reason?: string;
		opponentId?: number;
		screenshotFilename?: string;
		screenshot2Filename?: string;
		screenshot3Filename?: string;
		screenshot4Filename?: string;
	}) => {
		return await this.chatAPI.report(options);
	};

	public sendChatRoomMediaScreenshotNotification = async (options: { id: number }) => {
		return await this.chatAPI.sendMediaScreenshotNotification(options);
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
		return await this.chatAPI.sendMessage(options);
	};

	public setChatRoomNotificationSettings = async (options: {
		id: number;
		notificationChat: number;
	}): Promise<NotificationSettingResponse> => {
		return await this.chatAPI.setNotificationSettings(options);
	};

	public unHideChatRooms = async (options: { chatRoomIds: number[] }) => {
		return await this.chatAPI.unHideChat(options);
	};

	public unpinChatRoom = async (options: { id: number }) => {
		return await this.chatAPI.unpin(options);
	};

	// ConfigAPI

	// GameAPI

	// GiftAPI

	// GroupAPI

	// HiddenAPI

	// MiscAPI

	public getToken = async (options: {
		grantType: string;
		email?: string;
		password?: string;
		refreshToken?: string;
	}): Promise<TokenResponse> => {
		return await this.authAPI.getToken(options);
	};

	public acceptPolicyAgreement = async (options: { type: string }) => {
		return await this.miscAPI.acceptPolicyAgreement(options);
	};

	public getPolicyAgreements = async (): Promise<PolicyAgreementsResponse> => {
		return await this.miscAPI.getPolicyAgreements();
	};

	public getWebSocketToken = async (): Promise<string> => {
		return (await this.miscAPI.getWebSocketToken()).token;
	};

	// MuteKeywordAPI

	// NotificationAPI

	// PostAPI

	// messageTags
	public createPost = async (
		options: {
			text?: string;
			fontSize?: number;
			color?: number;
			inReplyTo?: number;
			groupId?: number;
			mentionIds?: number[];
			choices?: string[];
			sharedUrl?: string;
			attachmentFilename?: string;
			attachment2Filename?: string;
			attachment3Filename?: string;
			attachment4Filename?: string;
			attachment5Filename?: string;
			attachment6Filename?: string;
			attachment7Filename?: string;
			attachment8Filename?: string;
			attachment9Filename?: string;
			videoFileName?: string;
		} = {},
	): Promise<Post> => {
		const postType = this.getPostType(options);
		let sharedUrlObj: SharedUrl | undefined = undefined;
		if (options.sharedUrl) {
			sharedUrlObj = objectToSnake(await this.getUrlMetadata({ url: options.sharedUrl }));
		}
		const res = await this.postAPI.createPost({
			...options,
			jwt: await this.getWebSocketToken(),
			postType: postType,
			sharedUrl: sharedUrlObj,
			messageTags: undefined,
		});
		this.logger.info('投稿を作成しました。');
		return res;
	};

	public getUrlMetadata = async (options: { url: string }): Promise<SharedUrl> => {
		return await this.postAPI.getUrlMetadata(options);
	};

	// ReviewAPI

	// ThreadAPI

	// UserAPI
}

export default Client;
