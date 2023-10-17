import { BaseClient } from './BaseClient';
import { ClientOptions } from '../util/Types';
import { API_KEY } from '../util/Constants';
import {
	AdditionalSettingsResponse,
	ApplicationConfigResponse,
	BanWordsResponse,
	BgmsResponse,
	BlockedUserIdsResponse,
	BlockedUsersResponse,
	CallStatusResponse,
	ChatRoomResponse,
	ChatRoomsResponse,
	ConferenceCallResponse,
	CreateChatRoomResponse,
	FollowUsersResponse,
	GamesResponse,
	GenresResponse,
	GifsDataResponse,
	LoginUserResponse,
	MessageResponse,
	MessagesResponse,
	NotificationSettingResponse,
	PolicyAgreementsResponse,
	PopularWordsResponse,
	PostResponse,
	PostsResponse,
	StickerPacksResponse,
	TokenResponse,
	TotalChatRequestResponse,
	UnreadStatusResponse,
	UsersByTimestampResponse,
} from '../util/Responses';
import { Post, SharedUrl, Walkthrough } from '../util/Models';
import { objectToSnake } from '../util/CaseConverter';

export class Client extends BaseClient {
	/**
	 * Returns the average of two numbers.
	 *
	 * @remarks
	 * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
	 *
	 * @param x - The first input number
	 * @param y - The second input number
	 * @returns The arithmetic mean of `x` and `y`
	 *
	 * @beta
	 */
	public constructor(options?: ClientOptions) {
		super(options);
	}

	// AuthAPI

	public getToken = async (options: {
		grantType: string;
		email?: string;
		password?: string;
		refreshToken?: string;
	}): Promise<TokenResponse> => {
		return await this.authAPI.getToken(options);
	};

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

	public blockUser = async (options: { userId: number }) => {
		return await this.blockAPI.blockUser(options);
	};

	public getBlockedUserIds = async (): Promise<BlockedUserIdsResponse> => {
		return await this.blockAPI.getBlockedUserIds();
	};

	public getBlockedUsers = async (
		options: {
			nickname?: string;
			username?: string;
			biography?: string;
			prefecture?: string;
			gender?: number;
			fromId?: number;
		} = {},
	): Promise<BlockedUsersResponse> => {
		return await this.blockAPI.getBlockedUsers(options);
	};

	public unblockUser = async (options: { userId: number }) => {
		return await this.blockAPI.unblockUser(options);
	};

	// CallAPI

	public bumpCall = async (options: { callId: number; participantLimit?: number }) => {
		return await this.callAPI.bumpCall(options);
	};

	public getActiveCall = async (options: { userId: number }): Promise<PostResponse> => {
		return await this.getActiveCall(options);
	};

	public getBgms = async (): Promise<BgmsResponse> => {
		return await this.callAPI.getBgms();
	};

	public getCall = async (options: { callId: number }): Promise<ConferenceCallResponse> => {
		return await this.callAPI.getCall(options);
	};

	public getCallInvitableUsers = async (options: {
		callId: number;
		fromTimestamp?: number;
		nickname?: string;
	}): Promise<UsersByTimestampResponse> => {
		return await this.callAPI.getCallInvitableUsers(options);
	};

	public getCallStatus = async (options: { opponentId: number }): Promise<CallStatusResponse> => {
		return await this.callAPI.getCallStatus(options);
	};

	public getGames = async (options: { number: number; gameIds: number[]; fromId?: number }): Promise<GamesResponse> => {
		return await this.callAPI.getGames(options);
	};

	public getGenres = async (options: { number: number; from: number }): Promise<GenresResponse> => {
		return await this.callAPI.getGenres(options);
	};

	public getGroupCalls = async (
		options: { number?: number; groupCategoryId?: number; fromTimestamp?: number; scope?: string } = {},
	): Promise<PostsResponse> => {
		return await this.callAPI.getGroupCalls(options);
	};

	public inviteMultipleToCall = async (options: { callId: number; groupId?: number }) => {
		return await this.callAPI.inviteToCallBulk(options);
	};

	public inviteUsersToCall = async (options: { callId: number; userIds: number[] }) => {
		return await this.callAPI.inviteUsersToCall(options);
	};

	public inviteUsersToChatCall = async (options: { chatRoomId?: number; roomId?: number; roomUrl?: string } = {}) => {
		return await this.callAPI.inviteUsersToChatCall(options);
	};

	public banUserFromCall = async (options: { callId: number; userId: number }) => {
		return await this.callAPI.kickAndBanFromCall(options);
	};

	public notifyAnonymousUserLeaveCall = async (options: { conferenceId: number; agoraUid: string }) => {
		return await this.callAPI.notifyAnonymousUserLeaveAgoraChannel(options);
	};

	public notifyUserLeaveCall = async (options: { conferenceId: number; userId: number }) => {
		return await this.callAPI.notifyUserLeaveAgoraChannel(options);
	};

	public sendCallScreenshot = async (options: { screenshotFilename: string; conferenceId: number }) => {
		return await this.callAPI.sendCallScreenshot(options);
	};

	public startCall = async (options: {
		callId: number;
		joinableBy: string;
		gameTitle?: string;
		categoryId?: string;
	}) => {
		return await this.callAPI.setCall(options);
	};

	public setCallUserRole = async (options: { callId: number; userId: number; role: string }) => {
		return await this.callAPI.setUserRole(options);
	};

	public joinCall = async (options: { conferenceId: number; callSid: string }): Promise<ConferenceCallResponse> => {
		return await this.callAPI.startCall(options);
	};

	public leaveCall = async (options: { conferenceId: number; callSid: string }) => {
		return await this.callAPI.stopCall(options);
	};

	// ChatAPI

	public acceptChatRequest = async (options: { roomIds: number[] }) => {
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

	public deleteChatBackground = async (options: { roomId: number }) => {
		return await this.chatAPI.deleteBackground(options);
	};

	public deleteMessage = async (options: { roomId: number; messageId: number }) => {
		return await this.chatAPI.deleteMessage(options);
	};

	public editChatRoom = async (options: {
		roomId: number;
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
		roomId: number;
		number?: number;
		fromMessageId?: number;
		toMessageId?: number;
	}): Promise<MessagesResponse> => {
		return await this.chatAPI.getMessages(options);
	};

	public getChatNotificationSettings = async (options: { roomId: number }): Promise<AdditionalSettingsResponse> => {
		return await this.chatAPI.getNotificationSettings(options);
	};

	public getChatRequests = async (options: { fromTimestamp?: number } = {}): Promise<ChatRoomsResponse> => {
		return await this.chatAPI.getRequestRooms(options);
	};

	public getChatRoom = async (options: { roomId: number }): Promise<ChatRoomResponse> => {
		return await this.chatAPI.getRoom(options);
	};

	public getStickerPacks = async (): Promise<StickerPacksResponse> => {
		return await this.chatAPI.getStickerPacks();
	};

	public getTotalChatRequests = async (): Promise<TotalChatRequestResponse> => {
		return await this.chatAPI.getTotalRequests();
	};

	public hideChatRoom = async (options: { roomId: number }) => {
		return await this.chatAPI.hideChat(options);
	};

	public inviteUsersToChatRoom = async (options: { roomId: number; withUserIds: number[] }) => {
		return await this.chatAPI.invite(options);
	};

	public kickUsersFromChatRoom = async (options: { roomId: number; withUserIds: number[] }) => {
		return await this.chatAPI.kickUsers(options);
	};

	public pinChatRoom = async (options: { roomId: number }) => {
		return await this.chatAPI.pin(options);
	};

	public readMessageAttachment = async (options: { roomId: number; attachmentMsgIds: number[] }) => {
		return await this.chatAPI.readAttachment(options);
	};

	public readMessage = async (options: { roomId: number; messageId: number }) => {
		return await this.chatAPI.readMessage(options);
	};

	public readVideoMessage = async (options: { roomId: number; videoMsgIds: number }) => {
		return await this.chatAPI.readVideoMessage(options);
	};

	public refreshChatRooms = async (options: { fromTime?: number } = {}): Promise<ChatRoomsResponse> => {
		return await this.chatAPI.refreshRooms(options);
	};

	public removeChatRooms = async (options: { roomIds: number[] }) => {
		return await this.chatAPI.remove(options);
	};

	public reportChatRoom = async (options: {
		roomId: number;
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

	public sendChatRoomMediaScreenshotNotification = async (options: { roomId: number }) => {
		return await this.chatAPI.sendMediaScreenshotNotification(options);
	};

	public sendMessage = async (options: {
		roomId: number;
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
		roomId: number;
		notificationChat: number;
	}): Promise<NotificationSettingResponse> => {
		return await this.chatAPI.setNotificationSettings(options);
	};

	public unHideChatRooms = async (options: { roomIds: number[] }) => {
		return await this.chatAPI.unHideChat(options);
	};

	public unpinChatRoom = async (options: { roomId: number }) => {
		return await this.chatAPI.unpin(options);
	};

	// ConfigAPI

	public getAppConfig = async (): Promise<ApplicationConfigResponse> => {
		return await this.configAPI.getAppConfig();
	};

	public getBanWords = async (options: { countryApiValue: string }): Promise<BanWordsResponse> => {
		return await this.configAPI.getBanWords(options);
	};

	public getPopularWords = async (options: { countryApiValue: string }): Promise<PopularWordsResponse> => {
		return await this.configAPI.getPopularWords(options);
	};

	// GameAPI

	public getWalkthroughs = async (options: { appId: number }): Promise<Walkthrough[]> => {
		return await this.gameAPI.getWalkthroughs(options);
	};

	public requestWalkthrough = async (options: { groupId: number }) => {
		return await this.gameAPI.requestWalkthrough(options);
	};

	// GiftAPI

	// GroupAPI

	// HiddenAPI

	// MiscAPI

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
