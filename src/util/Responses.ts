import { User } from './Models';

export interface BlockedUserIdsResponse {
	blockIds: number[];
}
export interface BlockedUsersResponse {
	blockedCount: number;
	lastId: number;
	users: User[];
}
export interface PostResponse {
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
export interface PostsResponse {}
export interface BgmsResponse {}
export interface ConferenceCallResponse {}
export interface UsersByTimestampResponse {}
export interface CallStatusResponse {}
export interface GamesResponse {}
export interface GenresResponse {}
export interface BookmarkPostResponse {}
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
export interface UnreadStatusResponse {}
export interface CreateChatRoomResponse {}
export interface GifsDataResponse {}
export interface ChatRoomResponse {}
export interface ChatRoomsResponse {}
export interface MessageResponse {}
export interface MessagesResponse {}
export interface AdditionalSettingsResponse {}
export interface NotificationSettingResponse {}
export interface StickerPacksResponse {}
export interface TotalChatRequestResponse {}
