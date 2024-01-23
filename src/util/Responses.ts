import {
	Activity,
	Application,
	BanWord,
	Bgm,
	ChatRoom,
	ConferenceCall,
	CreateGroupQuota,
	Footprint,
	Game,
	Genre,
	GifImageCategory,
	Gift,
	GiftingAbility,
	Group,
	GroupCategory,
	GroupSetting,
	GroupUser,
	Message,
	MuteKeyword,
	PopularWord,
	Post,
	PostTag,
	PresignedUrl,
	Promotion,
	RefreshCounterRequest,
	Review,
	Settings,
	StickerPack,
	Survey,
	ThreadInfo,
	TimelineSettings,
	User,
	UserSetting,
	UserWrapper,
} from './Models';

export interface BlockedUserIdsResponse {
	blockIds: number[];
}
export interface BlockedUsersResponse {
	blockedCount: number;
	lastId: number;
	users: User[];
}
export interface PostResponse {
	post: Post;
}
export interface PostsResponse {
	hasMoreHotPosts?: boolean;
	nextPageValue?: string;
	pinnedPosts?: Post[];
	posts: Post[];
}
export interface BgmsResponse {
	bgm: Bgm[];
}
export interface ConferenceCallResponse {
	conferenceCall?: ConferenceCall;
	conferenceCallUserUuid?: string;
}
export interface UsersByTimestampResponse {
	lastTimestamp?: number;
	users: User[];
}
export interface CallStatusResponse {
	phoneStatus?: boolean;
	roomUrl?: string;
	videoStatus?: boolean;
}
export interface GamesResponse {
	fromId?: number;
	games: Game[];
}
export interface GenresResponse {
	genres: Genre[];
	nextPageValue?: string;
}
export interface UserTimestampResponse {
	time: number;
	ipAddress: string;
	country: string;
}
export interface SnsInfo {
	type: string;
	uid: string;
	nickname: string;
	biography: string;
	profileImage: string;
	gender: string;
}
export interface LoginUserResponse {
	userId: number;
	username?: string;
	isNew?: boolean;
	snsInfo?: SnsInfo;
	accessToken: string;
	refreshToken: string;
	tokenType?: string;
	createdAt?: number;
	expiresIn?: number;
}
export interface ActivitiesResponse {
	activities: Activity[];
	lastTimestamp?: number;
}
export interface UnreadStatusResponse {
	isUnread?: boolean;
}
export interface CreateChatRoomResponse {
	roomId: number;
}
export interface FollowUsersResponse {
	lastFollowId?: number;
	users: User[];
}
export interface GifsDataResponse {
	gifCategories: GifImageCategory[];
}
export interface ChatRoomResponse {
	chat?: ChatRoom;
}
export interface ChatRoomsResponse {
	chatRooms: ChatRoom[];
	nextPageValue?: string;
	pinnedChats?: ChatRoom[];
}
export interface MessageResponse {
	conferenceCall?: ConferenceCall;
	id: number;
}
export interface MessagesResponse {
	messages: Message[];
}
export interface AdditionalSettingsResponse {
	setting?: Settings;
}
export interface NotificationSettingResponse {
	setting: UserSetting;
}
export interface StickerPacksResponse {
	stickerPacks: StickerPack[];
}
export interface TotalChatRequestResponse {
	total?: number;
}
export interface ApplicationConfigResponse {
	app?: Application;
}
export interface BanWordsResponse {
	banWords: BanWord[];
}
export interface PopularWordsResponse {
	popularWords: PopularWord[];
}
export interface GiftingAbilitiesResponse {
	giftingAbilities: GiftingAbility[];
}
export interface GiftsResponse {
	gifts: Gift[];
	nextPageValue?: string;
	totalCount?: number;
}
export interface GiftSendersResponse {
	senders: User[];
	totalSendersCount?: number;
}
export interface CreateGroupResponse {
	groupId?: number;
}
export interface UserResponse {
	birthDate?: string;
	blockingLimit?: number;
	emailConfirmed?: boolean;
	facebookConnected?: boolean;
	giftingAbility?: GiftingAbility;
	groupPhoneOn?: boolean;
	groupVideoOn?: boolean;
	interestsCount?: number;
	lineConnected?: boolean;
	lobiConnected?: boolean;
	maskedEmail?: string;
	phoneOn?: boolean;
	pushNotification?: boolean;
	twitterId?: string;
	user?: User;
	uuid?: string;
	videoOn?: boolean;
	vipUntil?: number;
}
export interface UsersResponse {
	nextPageValue?: string;
	users: User[];
}
export interface GroupCategoriesResponse {
	groupCategories: GroupCategory[];
}
export interface CreateQuotaResponse {
	create: CreateGroupQuota;
}
export interface GroupResponse {
	group?: Group;
}
export interface GroupNotificationSettingsResponse {
	setting?: GroupSetting;
}
export interface GroupsResponse {
	groups?: Group[];
	pinnedGroups?: Group[];
}
export interface GroupUserResponse {
	groupUser: GroupUser;
}
export interface GroupUsersResponse {
	groupUsers: GroupUser[];
}
export interface GroupsRelatedResponse {
	groups: Group[];
	nextPageValue?: string;
}
export interface HiddenResponse {
	hiddenUsers: User[];
	limit?: number;
	nextPageValue?: string;
	totalCount?: number;
}
export interface LoginUpdateResponse {
	accessToken: string;
	expiresIn?: number;
	refreshToken: string;
	userId?: number;
	username?: string;
}
export interface TokenResponse {
	accessToken: string;
	createdAt?: number;
	expiresIn?: number;
	id?: number;
	refreshToken: string;
}
export interface RegisterDeviceTokenResponse {
	createdAt?: number;
	id?: number;
	serverDeviceId?: string;
	updatedAt?: number;
	uuid?: string;
}
export interface EmailGrantTokenResponse {
	emailGrantToken: string;
}
export interface EmailVerificationPresignedUrlResponse {
	url: string;
}
export interface PresignedUrlsResponse {
	presignedUrls: PresignedUrl;
}
export interface IdCheckerPresignedUrlResponse {
	presignedUrl: string;
}
export interface PresignedUrlResponse {
	presignedUrl: string;
}
export interface PolicyAgreementsResponse {
	latestPrivacyPolicyAgreed?: boolean;
	latestTermsOfUseAgreed?: boolean;
}
export interface PromotionsResponse {
	promotions: Promotion[];
}
export interface VipGameRewardUrlResponse {
	url: string;
}
export interface WebSocketTokenResponse {
	token: string;
}
export interface VerifyDeviceResponse {
	verified?: boolean;
	verifiedAt: string;
}
export interface CreateMuteKeywordResponse {
	hiddenWord: MuteKeyword;
}
export interface MuteKeywordResponse {
	hiddenWords: MuteKeyword[];
}
export interface BookmarkPostResponse {
	bookmarked?: boolean;
}
export interface CreatePostResponse {
	conferenceCall?: ConferenceCall;
	post?: Post;
}
export interface PostLikersResponse {
	lastId?: number;
	users: User[];
}
export interface PostTagsResponse {
	tags: PostTag;
}
export interface LikePostsResponse {
	likeIds: number[];
}
export interface ValidationPostResponse {
	result?: boolean;
}
export interface VoteSurveyResponse {
	survey?: Survey;
}
export interface ReviewsResponse {
	pinnedReviews: Review[];
	reviews: Review[];
}
export interface GroupThreadListResponse {
	nextPageValue?: string;
	threads: ThreadInfo[];
}
export interface CreateUserResponse {
	accessToken: string;
	expiresIn?: number;
	id: number;
	refreshToken: string;
}
export interface ActiveFollowingsResponse {
	lastLoggedinAt?: number;
	users: User[];
}
export interface DefaultSettingsResponse {
	timelineSettings?: TimelineSettings;
}
export interface FollowRecommendationsResponse {
	next?: number;
	total?: number;
	users: User[];
}
export interface FollowRequestCountResponse {
	usersCount?: number;
}
export interface FootprintsResponse {
	footprints: Footprint[];
}
export interface HimaUsersResponse {
	himaUsers: UserWrapper[];
}
export interface RefreshCounterRequestsResponse {
	resetCounterRequests: RefreshCounterRequest;
}
export interface UserCustomDefinitionsResponse {
	age?: number;
	createdAt?: number;
	followersCount?: number;
	followingsCount?: number;
	lastLoggedinAt?: number;
	reportedCount?: number;
	status?: string;
}
export interface UserEmailResponse {
	email?: string;
}
