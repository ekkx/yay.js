import { BaseClient } from './BaseClient';
import { ClientOptions } from '../util/Types';
import { API_KEY } from '../util/Constants';
import {
	ActiveFollowingsResponse,
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
	CreateGroupResponse,
	CreateQuotaResponse,
	FollowUsersResponse,
	GamesResponse,
	GenresResponse,
	GifsDataResponse,
	GroupCategoriesResponse,
	GroupNotificationSettingsResponse,
	GroupResponse,
	GroupUserResponse,
	GroupUsersResponse,
	GroupsRelatedResponse,
	GroupsResponse,
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
	UsersResponse,
} from '../util/Responses';
import { Post, SharedUrl, Walkthrough } from '../util/Models';
import { objectToSnake } from '../util/CaseConverter';

export class Client extends BaseClient {
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

	public checkChatUnreadStatus = async (options: { fromTime?: number } = {}): Promise<UnreadStatusResponse> => {
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

	public acceptGroupModeratorOffer = async (options: { groupId: number }) => {
		return await this.groupAPI.acceptModeratorOffer(options);
	};

	public acceptGroupOwnershipOffer = async (options: { groupId: number }) => {
		return await this.groupAPI.acceptOwnershipOffer(options);
	};

	public acceptGroupJoinRequest = async (options: { groupId: number; userId: number }) => {
		return await this.groupAPI.acceptUserRequest(options);
	};

	public addRelatedGroups = async (options: { groupId: number; relatedGroupId: number }) => {
		return await this.groupAPI.addRelatedGroups(options);
	};

	public banGroupUser = async (options: { groupId: number; userId: number }) => {
		return await this.groupAPI.banUser(options);
	};

	public checkGroupUnreadStatus = async (options: { fromTime: number }): Promise<UnreadStatusResponse> => {
		return await this.groupAPI.checkUnreadStatus(options);
	};

	public createGroup = async (options: {
		topic: string;
		description?: string;
		secret?: string;
		hideReportedPosts?: boolean;
		hideConferenceCall?: boolean;
		isPrivate?: boolean;
		onlyVerifiedAge?: boolean;
		onlyMobileVerified?: boolean;
		callTimelineDisplay?: boolean;
		allowOwnershipTransfer?: boolean;
		allowThreadCreationBy?: string;
		gender?: number;
		generationGroupsLimit?: number;
		groupCategoryId?: number;
		coverImageFilename?: string;
		groupIconFilename?: string;
		uuid: string;
		apiKey: string;
		timestamp: string;
		signedInfo: string;
		subCategoryId?: string;
		hideFromGameEight?: boolean;
		allowMembersToPostImageAndVideo?: boolean;
		allowMembersToPostUrl?: boolean;
		guidelines?: string;
	}): Promise<CreateGroupResponse> => {
		return await this.groupAPI.create(options);
	};

	public pinGroup = async (options: { groupId: number }) => {
		return await this.groupAPI.createPinGroup(options);
	};

	public declineGroupModeratorOffer = async (options: { groupId: number }) => {
		return await this.groupAPI.declineModeratorOffer(options);
	};

	public declineGroupOwnershipOffer = async (options: { groupId: number }) => {
		return await this.groupAPI.declineOwnershipOffer(options);
	};

	public declineGroupJoinRequest = async (options: { groupId: number; userId: number }) => {
		return await this.groupAPI.declineUserRequest(options);
	};

	public deleteGroupCover = async (options: { groupId: number }) => {
		return await this.groupAPI.deleteCover(options);
	};

	public deleteGroupIcon = async (options: { groupId: number }) => {
		return await this.groupAPI.deleteIcon(options);
	};

	public unpinGroup = async (options: { groupId: number }) => {
		return await this.groupAPI.deletePinGroup(options);
	};

	public getBannedGroupMembers = async (options: { groupId: number; page?: number }): Promise<UsersResponse> => {
		return await this.groupAPI.getBannedMembers(options);
	};

	public getGroupCategories = async (options: { page?: number; number?: number }): Promise<GroupCategoriesResponse> => {
		return await this.groupAPI.getCategories(options);
	};

	public getGroupCreateQuota = async (): Promise<CreateQuotaResponse> => {
		return await this.groupAPI.getCreateQuota();
	};

	public getGroup = async (options: { groupId: number }): Promise<GroupResponse> => {
		return await this.groupAPI.getGroup(options);
	};

	public getGroupNotificationSettings = async (options: {
		groupId: number;
	}): Promise<GroupNotificationSettingsResponse> => {
		return await this.groupAPI.getGroupNotificationSettings(options);
	};

	public getGroups = async (options: {
		groupCategoryId?: number;
		keyword?: string;
		fromTimestamp?: number;
		subCategoryId?: number;
	}): Promise<GroupsResponse> => {
		return await this.groupAPI.getGroups(options);
	};

	public getGroupInvitableUsers = async (options: {
		groupId: number;
		fromTimestamp?: number;
		// user[nickname]
		nickname?: string;
	}): Promise<UsersByTimestampResponse> => {
		return await this.groupAPI.getInvitableUsers(options);
	};

	public getGroupJoinedStatuses = async (options: { groupIds: number[] }): Promise<Record<string, string>> => {
		return await this.groupAPI.getJoinedStatuses(options);
	};

	public getGroupMember = async (options: { groupId: number; userId: number }): Promise<GroupUserResponse> => {
		return await this.groupAPI.getMember(options);
	};

	public getGroupMembers = async (options: {
		groupId: number;
		mode?: string;
		keyword?: string;
		fromId?: number;
		fromTimestamp?: number;
		orderBy?: string;
		followedByMe?: boolean;
	}): Promise<GroupUsersResponse> => {
		return await this.groupAPI.getMembers(options);
	};

	public getMyGroups = async (options: { fromTimestamp?: number }): Promise<GroupsResponse> => {
		return await this.groupAPI.getMyGroups(options);
	};

	public getRelatableGroups = async (options: {
		groupId: number;
		keyword?: string;
		from?: string;
	}): Promise<GroupsRelatedResponse> => {
		return await this.groupAPI.getRelatableGroups(options);
	};

	public getJoinedGroups = async (options: { userId: number; page?: number }): Promise<GroupsResponse> => {
		return await this.groupAPI.getUserGroups(options);
	};

	public inviteUsersToGroup = async (options: { groupId: number; userIds: number[] }) => {
		return await this.groupAPI.inviteUsers(options);
	};

	public joinGroup = async (options: { groupId: number }) => {
		return await this.groupAPI.join(options);
	};

	public leaveGroup = async (options: { groupId: number }) => {
		return await this.groupAPI.leave(options);
	};

	public removeGroupModerator = async (options: { groupId: number; userId: number }) => {
		return await this.groupAPI.removeModerator(options);
	};

	/**
	 *
	 * 関連するサークルを削除します
	 *
	 * @remarks
	 * `DELETE`: https://api.yay.space/v1/groups/:groupId/related
	 *
	 * @param options - 引数のオプション
	 * @param options.groupId - サークルのID
	 * @param options.relatedGroupIds - 関連するサークルのID
	 *
	 * @see https://github.com/qvco/yay.js
	 *
	 */
	public removeRelatedGroups = async (options: { groupId: number; relatedGroupIds: number[] }) => {
		return await this.groupAPI.removeRelatedGroups(options);
	};

	public reportGroup = async (options: {
		groupId: number;
		categoryId: number;
		reason?: string;
		opponentId?: number;
		screenshotFilename?: string;
		screenshot2Filename?: string;
		screenshot3Filename?: string;
		screenshot4Filename?: string;
	}) => {
		return await this.groupAPI.report(options);
	};

	public sendGroupModeratorOffers = async (options: {
		groupId: number;
		userIds: number[];
		uuid: string;
		apiKey: string;
		timestamp: number;
		signedInfo: string;
	}) => {
		return await this.groupAPI.sendModeratorOffers(options);
	};

	public sendGroupOwnershipOffer = async (options: {
		groupId: number;
		userId: number;
		uuid: string;
		apiKey: string;
		timestamp: number;
		signedInfo: string;
	}) => {
		return await this.groupAPI.sendOwnershipOffer(options);
	};

	public setGroupNotificationSettings = async (options: {
		groupId: number;
		notificationGroupPost?: number;
		notificationGroupJoin?: number;
		notificationGroupRequest?: number;
		notificationGroupMessageTagAll?: number;
	}): Promise<AdditionalSettingsResponse> => {
		return await this.groupAPI.setGroupNotificationSettings(options);
	};

	public setGroupTitle = async (options: { groupId: number; title: string }) => {
		return await this.groupAPI.setTitle(options);
	};

	public takeoverGroupOwnership = async (options: { groupId: number }) => {
		return await this.groupAPI.takeoverOwnership(options);
	};

	public unbanGroupUser = async (options: { groupId: number; userId: number }) => {
		return await this.groupAPI.unbanUser(options);
	};

	public editGroup = async (options: {
		groupId: number;
		topic?: string;
		description?: string;
		secret?: string;
		hideReportedPosts?: boolean;
		hideConferenceCall?: boolean;
		isPrivate?: boolean;
		onlyVerifiedAge?: boolean;
		onlyMobileVerified?: boolean;
		callTimelineDisplay?: boolean;
		allowOwnershipTransfer?: boolean;
		allowThreadCreationBy?: string;
		gender?: number;
		generationGroupsLimit?: number;
		groupCategoryId?: number;
		coverImageFilename?: string;
		groupIconFilename?: string;
		uuid: string;
		apiKey: string;
		timestamp: string;
		signedInfo: string;
		subCategoryId?: string;
		hideFromGameEight?: boolean;
		allowMembersToPostImageAndVideo?: boolean;
		allowMembersToPostUrl?: boolean;
		guidelines?: string;
	}): Promise<GroupResponse> => {
		return await this.groupAPI.update(options);
	};

	public visitGroup = async (options: { groupId: number }) => {
		return await this.groupAPI.visit(options);
	};

	public withdrawGroupModeratorOffer = async (options: { groupId: number; userId: number }) => {
		return await this.groupAPI.withdrawModeratorOffer(options);
	};

	public withdrawGroupOwnershipOffer = async (options: { groupId: number; userId: number }) => {
		return await this.groupAPI.withdrawOwnershipOffer(options);
	};

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

		return await this.postAPI.createPost({
			...options,
			jwt: await this.getWebSocketToken(),
			postType: postType,
			sharedUrl: sharedUrlObj,
			messageTags: undefined,
		});
	};

	public getUrlMetadata = async (options: { url: string }): Promise<SharedUrl> => {
		return await this.postAPI.getUrlMetadata(options);
	};

	// ReviewAPI

	// ThreadAPI

	// UserAPI

	public deleteContactFriends = async () => {
		return await this.userAPI.deleteContactFriends();
	};

	public deleteFootprint = async (options: { userId: number; footprintId: number }) => {
		return await this.userAPI.deleteFootprint(options);
	};

	public destroyUser = async (options: { uuid: string; apiKey: string; timestamp: string; signedInfo: string }) => {
		// clientの処理
		return await this.userAPI.destroyUser(options);
	};

	public followUser = async (options: { userId: number }) => {
		return await this.userAPI.followUser(options);
	};

	public followUsers = async (options: { userIds: number[] }) => {
		return await this.userAPI.followUsers(options);
	};

	public getActiveFollowings = async (options: {
		onlyOnline: boolean;
		fromLoggedinAt?: number;
	}): Promise<ActiveFollowingsResponse> => {
		return await this.userAPI.getActiveFollowings(options);
	};
}

export default Client;
