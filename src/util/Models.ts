export interface User {
	ageVerified?: boolean;
	biography?: string;
	birthDate?: string;
	blockingLimit?: number;
	chatRequest?: boolean;
	connectedBy?: string[];
	contactPhones?: string[];
	countryCode?: string;
	coverImage?: string;
	coverImageThumbnail?: string;
	createdAt?: number;
	dangerousUser?: boolean;
	emailConfirmed?: boolean;
	facebookConnected?: boolean;
	followPending?: boolean;
	followedBy?: boolean;
	followersCount?: number;
	following?: boolean;
	followingsCount?: number;
	fromDifferentGenerationAndTrusted?: boolean;
	gender?: number;
	generation?: number;
	giftingAbility?: GiftingAbility;
	groupPhoneOn?: boolean;
	groupUser?: GroupUser;
	groupVideoOn?: boolean;
	groupsUsersCount?: number;
	hidden?: boolean;
	hideVip?: boolean;
	id: number;
	interestsCount?: number;
	interestsSelected?: boolean;
	isPrivate?: boolean;
	lastLoggedinAt?: number;
	lineConnected?: boolean;
	lobiConnected?: boolean;
	loginStreakCount?: number;
	maskedEmail?: string;
	mobileNumber?: string;
	newUser?: boolean;
	nickname?: string;
	onlineStatus?: string;
	phoneOn?: boolean;
	postsCount?: number;
	prefecture?: string;
	profileIcon?: string;
	profileIconThumbnail?: string;
	pushNotification?: boolean;
	recentlyKenta?: boolean;
	restrictedReviewBy?: string;
	reviewsCount?: number;
	title?: string;
	twitterId?: string;
	updatedTime?: number;
	username?: string;
	uuid?: string;
	videoOn?: boolean;
	vip: boolean;
	vipUntil?: number;
}
export interface GiftingAbility {
	canReceive?: boolean;
	canSend?: boolean;
	enabled: boolean;
	userId?: number;
}
export interface GroupUser {
	user: User;
	isModerator: boolean;
	pendingTransfer: boolean;
	pendingDeputize: boolean;
	title: string;
}
export interface BumpParams {
	participantLimit: number;
}
export interface ConferenceCallUserRole {
	id?: number;
	role: string;
	userId?: number;
}
export interface Game {
	iconUrl: string;
	id: number;
	platformDetails?: PlatformDetails;
	title: string;
}
export interface PlatformDetails {
	affiliateUrl?: string;
	packageId: string;
}
export interface Genre {
	iconUrl: string;
	id: number;
	title: string;
}
export interface ConferenceCall {
	active?: boolean;
	agoraChannel?: string;
	agoraToken?: string;
	anonymousCallUsersCount?: number;
	bumpParams?: BumpParams;
	callType?: string;
	conferenceCallUserRoles?: ConferenceCallUserRole[];
	conferenceCallUsers?: User[];
	conferenceCallUsersCount?: number;
	duration?: number;
	game?: Game;
	genre?: Genre;
	groupId?: number;
	id: number;
	joinableBy?: string;
	maxParticipants?: number;
	postId?: number;
	server?: string;
}
export interface Group {
	allowMembersToPostImageAndVideo?: boolean;
	allowMembersToPostUrl?: boolean;
	allowOwnershipTransfer?: boolean;
	allowThreadCreationBy?: string;
	callTimelineDisplay?: boolean;
	coverImage?: string;
	coverImageThumbnail?: string;
	description?: string;
	gender?: number;
	generationGroupsLimit?: number;
	groupCategoryId?: number;
	groupIcon?: string;
	groupIconThumbnail?: string;
	groupsUsersCount?: number;
	guidelines?: string;
	hideConferenceCall?: boolean;
	hideFromGameEight?: boolean;
	hideReportedPosts?: boolean;
	highlightedCount?: number;
	id: number;
	invitedToJoin?: boolean;
	isJoined?: boolean;
	isPending?: boolean;
	isPrivate?: boolean;
	isRelated?: boolean;
	moderatorIds?: number[];
	onlyMobileVerified?: boolean;
	onlyVerifiedAge?: boolean;
	owner?: User;
	pendingCount?: number;
	pendingDeputizeIds?: number[];
	pendingTransferId?: number;
	postsCount?: number;
	relatedCount?: number;
	safeMode?: boolean;
	secret?: boolean;
	seizable?: boolean;
	seizableBefore?: number;
	subCategoryId?: number;
	threadsCount?: number;
	title?: string;
	topic?: string;
	unreadCounts?: number;
	unreadThreadsCount?: number;
	updatedAt?: number;
	userId?: number;
	viewsCount?: number;
	walkthroughRequested?: boolean;
}
export interface Shareable {
	group?: Group;
	post?: Post;
	// @SerializedName("posts/thread")
	thread?: ThreadInfo;
}
export interface SharedUrl {
	description?: string;
	imageUrl?: string;
	title?: string;
	url: string;
}
export interface Survey {
	choices: Choice[];
	id: number;
	voted?: boolean;
	votesCount?: number;
}
export interface Choice {
	id: number;
	label: string;
	votesCount?: number;
}
export interface Video {
	bitrate?: number;
	completed?: boolean;
	height?: number;
	id: number;
	thumbnailBigUrl?: string;
	thumbnailUrl?: string;
	videoUrl?: string;
	viewsCount?: number;
	width?: number;
}
export interface GiftCount {
	id: number;
	quantity?: number;
}
export interface ThreadInfo {
	createdAt?: number;
	id: number;
	isJoined?: boolean;
	lastPost?: Post;
	newUpdates?: boolean;
	owner?: User;
	postsCount?: number;
	threadIcon?: string;
	title: string;
	unreadCount?: number;
	updatedAt?: number;
}
export interface MessageTag {
	length?: number;
	offset?: number;
	type: string;
	userId?: number;
}
export interface Post {
	id?: number;
	text?: string;
	postType?: string;
	groupId?: number;
	fontSize?: number;
	color?: number;
	likesCount?: number;
	createdAt?: number;
	updatedAt?: number;
	editedAt?: number;
	liked?: boolean;
	likers?: User[];
	tag?: string;
	likersCount?: number;
	repostsCount?: number;
	reposted?: boolean;
	repostable?: boolean;
	reportedCount?: number;
	conversationId?: number;
	inReplyTo?: number;
	inReplyToPost?: Post;
	inReplyToPostCount?: number;
	user?: User;
	mentions?: User[];
	group?: Group;
	conferenceCall?: ConferenceCall;
	attachment?: string;
	attachmentThumbnail?: string;
	attachment_2?: string;
	attachment_2Thumbnail?: string;
	attachment_3?: string;
	attachment_3Thumbnail?: string;
	attachment_4?: string;
	attachment_4Thumbnail?: string;
	attachment_5?: string;
	attachment_5Thumbnail?: string;
	attachment_6?: string;
	attachment_6Thumbnail?: string;
	attachment_7?: string;
	attachment_7Thumbnail?: string;
	attachment_8?: string;
	attachment_8Thumbnail?: string;
	attachment_9?: string;
	attachment_9Thumbnail?: string;
	shareable?: Shareable;
	sharedUrl?: SharedUrl;
	survey?: Survey;
	videos?: Video[];
	giftsCount?: GiftCount[];
	sharedThread?: ThreadInfo;
	threadId?: number;
	thread?: ThreadInfo;
	highlighted?: boolean;
	messageTags?: MessageTag[];
	isFailToSend?: boolean;
}
export interface Bgm {
	id: number;
	musicUrl: string;
	order?: number;
	title: string;
}
export interface Activity {
	birthdayUsers?: User[];
	birthdayUsersCount?: number;
	createdAt?: number;
	followers?: User[];
	followersCount?: number;
	fromPost?: Post;
	fromPostIds?: number[];
	group?: Group;
	id: number;
	metadata?: Metadata;
	toPost?: Post;
	type?: string;
	user?: User;
	vipReward?: number;
}
export interface Metadata {
	body?: string;
	bulkInvitation?: boolean;
	contentPreview?: string;
	title?: string;
	url?: string;
}
export interface GifImageCategory {
	gifs: GifImage[];
	id: number;
	language?: string;
	name?: string;
}
export interface GifImage {
	height?: number;
	id: number;
	url?: string;
	width?: number;
}
export interface ChatRoom {
	background?: string;
	id: number;
	isGroup?: boolean;
	isRequest?: boolean;
	lastMessage?: Message;
	members: User[];
	name?: string;
	owner?: User;
	unreadCount?: number;
	updatedAt?: number;
	userSetting?: UserSetting;
}
export interface Message {
	attachment?: string;
	attachmentAndroid?: string;
	attachmentReadCount?: number;
	attachmentThumbnail?: string;
	conferenceCall?: ConferenceCall;
	createdAt?: number;
	fontSize?: number;
	gif?: GifImage;
	id: number;
	isError?: boolean;
	isSent?: boolean;
	messageType?: string;
	parent?: Message;
	refreshRetryCount?: number;
	roomId?: number;
	sticker?: Sticker;
	text?: string;
	userId?: number;
	videoProcessed?: boolean;
	videoThumbnailUrl?: string;
	videoUrl?: string;
}
export interface UserSetting {
	notificationChat?: boolean;
}
export interface Sticker {
	extension?: string;
	height?: number;
	id: number;
	stickerPackId?: number;
	url?: string;
	width?: number;
}
export interface Settings {
	ageRestrictedOnReview?: boolean;
	allowReposts?: boolean;
	cautionUserChat?: boolean;
	followingOnlyCallInvite?: boolean;
	followingOnlyGroupInvite?: boolean;
	followingRestrictedOnReview?: boolean;
	hideActiveCall?: boolean;
	hideHotPost?: boolean;
	hideOnInvitable?: boolean;
	hideOnlineStatus?: boolean;
	hideReplyFollowingTimeline?: boolean;
	hideReplyPublicTimeline?: boolean;
	hideVip?: boolean;
	invisibleOnUserSearch?: boolean;
	noReplyGroupTimeline?: boolean;
	notificationBirthdayToFollowers?: boolean;
	notificationBulkCallInvite?: boolean;
	notificationCallInvite?: boolean;
	notificationChat?: boolean;
	notificationChatDelete?: boolean;
	notificationContactFriend?: boolean;
	notificationDailySummary?: boolean;
	notificationFollow?: boolean;
	notificationFollowAccept?: boolean;
	notificationFollowRequest?: boolean;
	notificationFollowerConferenceCall?: boolean;
	notificationFollowerCreateGroup?: boolean;
	notificationFollowingBirthdateOn?: boolean;
	notificationFollowingPostAfterBreak?: boolean;
	notificationFollowingsInCall?: boolean;
	notificationFootprint?: boolean;
	notificationGroupAccept?: boolean;
	notificationGroupConferenceCall?: boolean;
	notificationGroupInvite?: boolean;
	notificationGroupJoin?: boolean;
	notificationGroupMessageTagAll?: boolean;
	notificationGroupModerator?: boolean;
	notificationGroupPost?: boolean;
	notificationGroupRequest?: boolean;
	notificationHimaNow?: boolean;
	notificationLatestNews?: boolean;
	notificationLike?: boolean;
	notificationMessageTag?: boolean;
	notificationPopularPost?: boolean;
	notificationProfileScreenshot?: boolean;
	notificationReply?: boolean;
	notificationRepost?: boolean;
	notificationReview?: boolean;
	notificationSecurityWarning?: boolean;
	notificationTwitterFriend?: boolean;
	privacyMode?: boolean;
	privatePost?: boolean;
	privateUserTimeline?: boolean;
	vipInvisibleFootprintMode?: boolean;
	visibleOnSnsFriendRecommendation?: boolean;
}
export interface StickerPack {
	cover?: string;
	description?: string;
	id: number;
	name?: string;
	order?: number;
	stickers?: Sticker[];
}
export interface Application {
	settings?: Config;
}
export interface Config {
	adTesterUserIds?: string;
	isChatWebsocketEnabled?: string;
	isDirectVipPurchaseEnabled?: string;
	isGiftFeaturesEnabled?: string;
	isIdCardAndPhoneVerificationCheckForReviewEnabled?: string;
	isIdCardCheckRequiredBlockerViewEnabled?: string;
	isMaintenanced?: string;
	isPhoneVerificationRequiredBlockerViewEnabled?: string;
	isSpeedTestEnabled?: string;
	isStarEnabled?: string;
	latestAndroidAppVersion?: string;
	lineOfficialAccountId?: string;
	localizedMaintenanceUrl?: string;
	localizedNewsTitle?: string;
	localizedNewsUrl?: string;
	maintenanceFeatures?: string;
	maxImageFrameCount?: string;
	minimumAndroidAppVersionRequired?: string;
	minimumAndroidVersionSupported?: string;
	newsVersion?: string;
	promotionStickerPackIds?: string;
	shouldAppendUserIdToNewsUrl?: string;
	supportEmailAddress?: string;
	twitterOfficialAccountId?: string;
	useRandomMessageRefreshRate?: string;
}
export interface BanWord {
	id: number;
	type?: string;
	word?: string;
}
export interface PopularWord {
	id: number;
	type: string;
	word: string;
}
export interface Walkthrough {
	title: string;
	url: string;
}
export interface Gift {
	icon: string;
	iconThumbnail: string;
	id: number;
	price?: number;
	title: string;
}
export interface GroupCategory {
	icon?: string;
	id: number;
	name?: string;
	rank?: number;
	gameIdSupportedCategoryIds?: unknown;
}
export interface CreateGroupQuota {
	remainingQuota?: number;
	usedQuota?: number;
}
export interface GroupSetting {
	notificationGroupJoin?: boolean;
	notificationGroupMessageTagAll?: boolean;
	notificationGroupPost?: boolean;
	notificationGroupRequest?: boolean;
}
export interface PresignedUrl {
	filename: string;
	url: string;
}
export interface Promotion {
	id: number;
	imageUrl: string;
	order?: number;
	promotionUrl: string;
	title: string;
}
export interface MuteKeyword {
	context: string[];
	id: number;
	word: string;
}
export interface PostTag {
	id?: number;
	postHashtagsCount?: number;
	tag?: string;
}
export interface Review {
	comment: string;
	createdAt?: number;
	id: number;
	mutualReview?: boolean;
	reportedCount?: number;
	reviewer?: User;
	user?: User;
}
export interface TimelineSettings {
	favesFilter?: boolean;
	hideHotPost?: boolean;
	hideReplyFollowingTimeline?: boolean;
	hideReplyPublicTimeline?: boolean;
}
export interface Footprint {
	id: number;
	user?: User;
	visitedAt?: number;
}
export interface UserWrapper {
	id: number;
	user?: User;
}
export interface RefreshCounterRequest {
	counter: string;
	lastRequestedAt?: number;
	status: string;
}
