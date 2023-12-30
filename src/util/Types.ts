import { AxiosProxyConfig } from 'axios';
import { YJSLogger } from './Logger';

/**
 * RESTクラスのrequest関数の引数
 */
export type RESTOptions = {
	logger: YJSLogger;
	baseURL: string;
	proxy?: AxiosProxyConfig;
	timeout?: number;
	defaultHeaders: Record<string, any>;
};

export type RequestOptions = {
	method: HttpMethod;
	route: string;
	requireAuth: boolean;
	params?: Record<string, any>;
	json?: Record<string, any>;
	baseURL?: string;
	accessToken?: string;
	headers?: Record<string, any>;
};

export type ClientOptions = {
	/**
	 * プロキシのアドレス
	 */
	proxy?: AxiosProxyConfig;
	/**
	 * リクエストの待機時間
	 *
	 * @defaultValue `30` 秒
	 */
	timeout?: number;
	/**
	 * リクエストの最大リトライ回数
	 *
	 * @defaultValue `3` 回
	 */
	maxRetries?: number;
	/**
	 * リトライ待機時間の増加割合係数
	 *
	 * @defaultValue `1.5` 倍
	 */
	backoffFactor?: number;
	/**
	 * レート制限を待機するか
	 *
	 * @defaultValue `true`
	 */
	waitOnRateLimit?: boolean;
	/**
	 * クッキーを保存するか
	 *
	 * @defaultValue `true`
	 */
	saveCookie?: boolean;
	/**
	 * クッキーを暗号化&復号化する際のパスワード
	 *
	 * @defaultValue `true`
	 */
	cookiePassword?: string;
	/**
	 * クッキーを保存するパス
	 *
	 * @defaultValue 作業デレクトリ
	 */
	cookieDirPath?: string;
	/**
	 * クッキーを保存するファイル名
	 *
	 * @defaultValue `'cookie.json'`
	 */
	cookieFilename?: string;
	/**
	 * 取得するWebSocketイベントの範囲
	 *
	 * @defaultValue `'undefined'`
	 */
	intents?: string[];
	/**
	 * ログのデバッグモードをオンにするか
	 *
	 * @defaultValue `false`
	 */
	debugMode?: boolean;
	/**
	 * ログを非表示にするか
	 *
	 * @defaultValue `false`
	 */
	disableLog?: boolean;
};

export type CookieProps = {
	authentication: CookieAuthentication;
	user: CookieUser;
	device: CookieDevice;
};

export type CookieAuthentication = {
	accessToken: string;
	refreshToken: string;
};

export type CookieUser = {
	userId: number;
	email: string;
	uuid: string;
};

export type CookieDevice = {
	deviceUuid: string;
};

export type Device = {
	deviceType: string;
	osVersion: string;
	screenDensity: string;
	screenSize: string;
	model: string;
};

export type RequestObject = Record<string, unknown>;

export type LoginEmailUserRequest = {
	email: string;
	password: string;
};

export type SearchCriteria = {
	nickname?: string;
	username?: string;
	biography?: string;
	prefecture?: string;
	gender?: number;
};

export interface ChannelCommand {
	command?: string;
	identifier?: string;
}

export interface ChannelMessage {
	identifier?: string;
	message?: EventMessage;
	type?: string;
	sid?: string;
}

export interface Identifier {
	channel?: string;
}

export interface EventMessage {
	data?: Record<string, any>;
	message?: Record<string, any>;
	event?: string;
}

/**
 * リクエストを送信する際のAPIメソッド
 */
export enum HttpMethod {
	DELETE = 'DELETE',
	GET = 'GET',
	PATCH = 'PATCH',
	POST = 'POST',
	PUT = 'PUT',
}

export interface ErrorResponse {
	result: string;
	message: string;
	errorCode: number;
	banUntil: number | null;
}

export const GatewayIntents: { [key: string]: string } = {
	ChatMessage: 'ChatRoomChannel',
	GroupUpdates: 'GroupUpdatesChannel',
};

/**
 * 投稿のタイプ
 */
export const PostType: { [key: string]: string } = {
	text: 'text',
	media: 'media',
	image: 'image',
	video: 'video',
	survey: 'survey',
	call: 'call',
	shareableUrl: 'shareable_url',
};

/**
 * 通話のタイプ
 */
export const CallType: { [key: string]: string } = {
	voice: 'voice',
	video: 'vdo',
};

/**
 * 画像のタイプ
 */
export const ImageType: { [key: string]: string } = {
	post: 'post',
	chatMessage: 'chat_message',
	chatBackground: 'chat_background',
	report: 'report',
	userAvatar: 'user_avatar',
	userCover: 'user_cover',
	groupIcon: 'group_icon',
	groupCover: 'group_cover',
	groupThreadIcon: 'group_thread_icon',
};

/**
 * 共有のタイプ
 */
export const ShareableType: { [key: string]: string } = {
	group: 'group',
	thread: 'thread',
};
