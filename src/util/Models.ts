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
export interface BumpParams {}
export interface ConferenceCallUserRole {}
export interface Game {}
export interface Genre {}
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
export interface Group {}
export interface Shareable {}
export interface SharedUrl {}
export interface Survey {}
export interface Video {}
export interface GiftCount {}
export interface ThreadInfo {}
export interface MessageTag {}
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
