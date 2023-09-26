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