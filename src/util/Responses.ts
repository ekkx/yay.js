import { User } from './Models';

export interface BlockedUserIdsResponse {
	blockIds: number[];
}

export interface BlockedUsersResponse {
	blocked_count: number;
	last_id: number;
	users: User[];
}

export interface PostResponse {}
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
	username: string;
	isNew: boolean;
	snsInfo: SnsInfo;
	accessToken: string;
	refreshToken: string;
	tokenType: string;
	createdAt: number;
	expiresIn: number;
}
