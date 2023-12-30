import { BaseClient } from './BaseClient';
import { ClientOptions } from '../util/Types';
import {
	ActiveFollowingsResponse,
	ActivitiesResponse,
	AdditionalSettingsResponse,
	ApplicationConfigResponse,
	BanWordsResponse,
	BgmsResponse,
	BlockedUsersResponse,
	BookmarkPostResponse,
	CallStatusResponse,
	ChatRoomResponse,
	ChatRoomsResponse,
	ConferenceCallResponse,
	CreateChatRoomResponse,
	CreateGroupResponse,
	CreatePostResponse,
	CreateQuotaResponse,
	CreateUserResponse,
	EmailVerificationPresignedUrlResponse,
	FollowRecommendationsResponse,
	FollowRequestCountResponse,
	FollowUsersResponse,
	FootprintsResponse,
	GamesResponse,
	GenresResponse,
	GroupCategoriesResponse,
	GroupNotificationSettingsResponse,
	GroupResponse,
	GroupUsersResponse,
	GroupsRelatedResponse,
	GroupsResponse,
	HiddenResponse,
	HimaUsersResponse,
	LikePostsResponse,
	LoginUpdateResponse,
	LoginUserResponse,
	MessageResponse,
	MessagesResponse,
	NotificationSettingResponse,
	PolicyAgreementsResponse,
	PopularWordsResponse,
	PostLikersResponse,
	PostResponse,
	PostTagsResponse,
	PostsResponse,
	PresignedUrlResponse,
	PresignedUrlsResponse,
	PromotionsResponse,
	RefreshCounterRequestsResponse,
	ReviewsResponse,
	StickerPacksResponse,
	TokenResponse,
	TotalChatRequestResponse,
	UnreadStatusResponse,
	UserCustomDefinitionsResponse,
	UserEmailResponse,
	UserResponse,
	UserTimestampResponse,
	UsersByTimestampResponse,
	UsersResponse,
	ValidationPostResponse,
	VerifyDeviceResponse,
	VipGameRewardUrlResponse,
	VoteSurveyResponse,
} from '../util/Responses';
import { GifImageCategory, GroupUser, MessageTag, MuteKeyword, Post, SharedUrl, Walkthrough } from '../util/Models';
import * as util from '../util/Utils';
import { objectToSnake } from '../util/CaseConverter';

/**
 * **yay.js - クライアント**
 *
 * @remarks
 * yay.js のエントリーポイントとなるクラスです
 *
 * @example
 * ```typescript
 * import { Client } from 'yay.js';
 *
 * const main = async () => {
 * 	const client = new Client();
 *
 *		await client.login({
 *			email: 'yourEmail',
 *			password: 'yourPassword',
 *		});
 *
 *		await client.createPost({
 *			text: 'Hello with yay.js!',
 *			sharedUrl: 'https://github.com/qvco/yay.js',
 *		});
 * };
 *
 * main();
 * ```
 *
 * @see {@link https://qvco.github.io/yay.js/classes/Client | ドキュメントを参照}
 *
 */
export class Client extends BaseClient {
	public constructor(options?: ClientOptions) {
		super(options);
	}

	// AuthAPI

	/**
	 *
	 * **メールアドレスを変更します**
	 *
	 * @param options.email - 新しいメールアドレス
	 * @param options.password - アカウントのパスワード
	 * @param options.emailGrantToken - メール認証トークン
	 *
	 * @endpoint
	 * `PUT`: {@link https://api.yay.space/v1/users/change_email}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#changeEmail | ドキュメントを参照}
	 *
	 */
	public changeEmail = async (options: {
		email: string;
		password: string;
		emailGrantToken?: string;
	}): Promise<LoginUpdateResponse> => await this.authAPI.changeEmail(options);

	/**
	 *
	 * **パスワードを変更します**
	 *
	 * @param options.currentPassword - 現在のパスワード
	 * @param options.newPassword - 新しいパスワード
	 *
	 * @endpoint
	 * `PUT`: {@link https://api.yay.space/v1/users/change_password}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#changePassword | ドキュメントを参照}
	 *
	 */
	public changePassword = async (options: {
		currentPassword: string;
		newPassword: string;
	}): Promise<LoginUpdateResponse> => await this.authAPI.changePassword(options);

	/**
	 *
	 * **新しいトークンを取得します**
	 *
	 * @param options.grantType - 取得する方法
	 * @param options.email - メールアドレス
	 * @param options.password - ・パスワード
	 * @param options.refreshToken - リフレッシュトークン
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/api/v1/oauth/token}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getToken | ドキュメントを参照}
	 *
	 */
	public getToken = async (options: {
		grantType: string;
		email?: string;
		password?: string;
		refreshToken?: string;
	}): Promise<TokenResponse> => {
		return await this.authAPI.getToken(options);
	};

	/**
	 *
	 * **メールアドレスでログインします**
	 *
	 * @param options.email - メールアドレス
	 * @param options.password - ・パスワード
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/v3/users/login_with_email}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#login | ドキュメントを参照}
	 *
	 */
	public login = async (options: { email: string; password: string }): Promise<LoginUserResponse> => {
		return await this.prepare({ email: options.email, password: options.password });
	};

	/**
	 *
	 * **ログアウトします**
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/v1/users/logout}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#logout | ドキュメントを参照}
	 *
	 */
	public logout = async () => {
		return await this.authAPI.logoutDevice();
	};

	/**
	 *
	 * **トークンを移行します**
	 *
	 * @param options.token - トークン
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/api/v1/oauth/token/migrate}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#migrateToken | ドキュメントを参照}
	 *
	 */
	public migrateToken = async (options: { token: string }) => {
		return await this.authAPI.migrateToken(options);
	};

	/**
	 *
	 * **デバイストークンを登録します**
	 *
	 * @param options.deviceToken - デバイストークン
	 * @param options.deviceType - デバイスのタイプ
	 * @param options.osVersion - デバイスのOS
	 * @param options.screenResolution - スクリーンの画質
	 * @param options.screenDensity - スクリーンの比
	 * @param options.deviceModel - デバイスのモデル
	 * @param options.appsflyerId - AppsFlyerのID
	 * @param options.advertisingId - 宣伝ID
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/v2/users/device_tokens/new}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#registerDeviceToken | ドキュメントを参照}
	 *
	 */
	public registerDeviceToken = async (options: {
		deviceToken: string;
		deviceType: string;
		osVersion: string;
		screenResolution: string;
		screenDensity: string;
		deviceModel: string;
		appsflyerId: string;
		advertisingId?: string;
	}) => {
		return await this.authAPI.registerDeviceToken(options);
	};

	/**
	 *
	 * **確認メールを再送信します**
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/v2/users/resend_confirm_email}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#resendConfirmEmail | ドキュメントを参照}
	 *
	 */
	public resendConfirmEmail = async () => {
		return await this.authAPI.resendConfirmEmail();
	};

	/**
	 *
	 * **ユーザーを復元します**
	 *
	 * @param options.userId - ユーザーのID
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/api/v1/oauth/token/migrate}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#restoreUser | ドキュメントを参照}
	 *
	 */
	public restoreUser = async (options: { userId: number }) => {
		return await this.authAPI.restoreUser(options);
	};

	/**
	 *
	 * **デバイストークンを無効化します**
	 *
	 * @endpoint
	 * `DELETE`: {@link https://api.yay.space/v1/users/device_tokens}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#revokeDeviceTokens | ドキュメントを参照}
	 *
	 */
	public revokeDeviceTokens = async () => {
		return await this.authAPI.revokeTokens();
	};

	/**
	 *
	 * **アカウントをメールアドレスと紐付けます**
	 *
	 * @param options.email - メールアドレス
	 * @param options.password - パスワード
	 * @param options.currentPassword - 現在のパスワード
	 * @param options.emailGrantToken - メール認証トークン
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/v3/users/login_update}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#saveAccountWithEmail | ドキュメントを参照}
	 *
	 */
	public saveAccountWithEmail = async (options: {
		email: string;
		password?: string;
		currentPassword?: string;
		emailGrantToken?: string;
	}) => {
		return await this.authAPI.saveAccountWithEmail(options);
	};

	// BlockAPI

	/**
	 *
	 * **ユーザーをブロックします**
	 *
	 * @param options.userId - ユーザーのID
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/v1/users/:userId/block}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#blockUser | ドキュメントを参照}
	 *
	 */
	public blockUser = async (options: { userId: number }) => {
		return await this.blockAPI.blockUser(options);
	};

	/**
	 *
	 * **あなたをブロックしているユーザーのIDを取得します**
	 *
	 * @endpoint
	 * `GET`: {@link https://api.yay.space/v1/users/block_ids}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getBlockedUserIds | ドキュメントを参照}
	 *
	 */
	public getBlockedUserIds = async (): Promise<number[]> => {
		return (await this.blockAPI.getBlockedUserIds()).blockIds;
	};

	/**
	 *
	 * **ブロックしているユーザーのIDを取得します**
	 *
	 * @param options.nickname - カスタムユーザーID
	 * @param options.username - ユーザー名
	 * @param options.biography - 自己紹介文
	 * @param options.prefecture - 都道府県
	 * @param options.gender - 性別
	 * @param options.fromId - 取得元ID
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/v2/users/blocked}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getBlockedUsers | ドキュメントを参照}
	 *
	 */
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

	/**
	 *
	 * **ユーザーのブロックを解除します**
	 *
	 * @param options.userId - ユーザーのID
	 *
	 * @endpoint
	 * `GET`: {@link https://api.yay.space/v2/users/:userId/unblock}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#unblockUser | ドキュメントを参照}
	 *
	 */
	public unblockUser = async (options: { userId: number }) => {
		return await this.blockAPI.unblockUser(options);
	};

	// CallAPI

	/**
	 *
	 * **通話に参加できる上限人数を設定します**
	 *
	 * @param options.callId - 通話ルームのID
	 * @param options.participantLimit - 参加上限人数
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/v1/calls/:callId/bump}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#bumpCall | ドキュメントを参照}
	 *
	 */
	public bumpCall = async (options: { callId: number; participantLimit?: number }) => {
		return await this.callAPI.bumpCall(options);
	};

	/**
	 *
	 * **ユーザーが参加している通話を取得します**
	 *
	 * @param options.userId - ユーザーのID
	 *
	 * @endpoint
	 * `GET`: {@link https://api.yay.space/v1/posts/active_call}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getUserActiveCall | ドキュメントを参照}
	 *
	 */
	public getUserActiveCall = async (options: { userId: number }): Promise<PostResponse> => {
		return await this.callAPI.getActiveCall(options);
	};

	/**
	 *
	 * **通話用のデフォルトBGMを取得します**
	 *
	 * @endpoint
	 * `GET`: {@link https://api.yay.space/v1/calls/bgm}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getBgms | ドキュメントを参照}
	 *
	 */
	public getBgms = async (): Promise<BgmsResponse> => {
		return await this.callAPI.getBgms();
	};

	/**
	 *
	 * **通話ルームのデータを取得します**
	 *
	 * @param options.callId - 通話ルームのID
	 *
	 * @endpoint
	 * `GET`: {@link https://api.yay.space/v1/calls/conferences/:callId}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getCall | ドキュメントを参照}
	 *
	 */
	public getCall = async (options: { callId: number }): Promise<ConferenceCallResponse> => {
		return await this.callAPI.getCall(options);
	};

	/**
	 *
	 * **通話ルームに招待可能なユーザーを取得します**
	 *
	 * @param options.callId - 通話ルームのID
	 * @param options.fromTimestamp - 取得元タイムスタンプ
	 * @param options.nickname - ニックネーム
	 *
	 * @endpoint
	 * `GET`: {@link https://api.yay.space/v1/calls/:callId/users/invitable}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getCallInvitableUsers | ドキュメントを参照}
	 *
	 */
	public getCallInvitableUsers = async (options: {
		callId: number;
		fromTimestamp?: number;
		nickname?: string;
	}): Promise<UsersByTimestampResponse> => {
		return await this.callAPI.getCallInvitableUsers(options);
	};

	/**
	 *
	 * **通話の状態を取得します**
	 *
	 * @param options.opponentId - 相手のID
	 *
	 * @endpoint
	 * `GET`: {@link https://api.yay.space/v1/calls/:callId/users/invitable}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getCallStatus | ドキュメントを参照}
	 *
	 */
	public getCallStatus = async (options: { opponentId: number }): Promise<CallStatusResponse> => {
		return await this.callAPI.getCallStatus(options);
	};

	/**
	 *
	 * **ゲームを取得します**
	 *
	 * @param options.number - 取得する数
	 * @param options.gameIds - ゲームのID
	 * @param options.fromId - 取得元ID
	 *
	 * @endpoint
	 * `GET`: {@link https://api.yay.space/v1/games/apps}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getGames | ドキュメントを参照}
	 *
	 */
	public getGames = async (options: { number: number; gameIds: number[]; fromId?: number }): Promise<GamesResponse> => {
		return await this.callAPI.getGames(options);
	};

	/**
	 *
	 * **ジャンルを取得します**
	 *
	 * @param options.number - 取得する数
	 * @param options.from - 取得元ID
	 *
	 * @endpoint
	 * `GET`: {@link https://api.yay.space/v1/genres}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getGenres | ドキュメントを参照}
	 *
	 */
	public getGenres = async (options: { number: number; from: number }): Promise<GenresResponse> => {
		return await this.callAPI.getGenres(options);
	};

	/**
	 *
	 * **サークルの通話を取得します**
	 *
	 * @param options.number - 取得する数
	 * @param options.groupCategoryId - サークルのカテゴリーID
	 * @param options.fromTimestamp - 取得元タイムスタンプ
	 * @param options.scope - 取得する範囲
	 *
	 * @endpoint
	 * `GET`: {@link https://api.yay.space/v1/posts/group_calls}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#getGroupCalls | ドキュメントを参照}
	 *
	 */
	public getGroupCalls = async (
		options: { number?: number; groupCategoryId?: number; fromTimestamp?: number; scope?: string } = {},
	): Promise<PostsResponse> => {
		return await this.callAPI.getGroupCalls(options);
	};

	/**
	 *
	 * **招待可能なユーザーを通話に招待します**
	 *
	 * @param options.callId - 通話ルームのID
	 * @param options.groupId - サークルのID
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/v1/calls/:callId/bulk_invite}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#inviteOnlineUsersToCall | ドキュメントを参照}
	 *
	 */
	public inviteOnlineUsersToCall = async (options: { callId: number; groupId?: number }) => {
		return await this.callAPI.inviteToCallBulk(options);
	};

	/**
	 *
	 * **ユーザーを通話に招待します**
	 *
	 * @param options.callId - 通話ルームのID
	 * @param options.userIds - 招待するユーザーのID
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/v1/calls/conference_calls/:callId/invite}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#inviteUsersToCall | ドキュメントを参照}
	 *
	 */
	public inviteUsersToCall = async (options: { callId: number; userIds: number[] }) => {
		return await this.callAPI.inviteUsersToCall(options);
	};

	/**
	 *
	 * **ユーザーをチャットルームの通話に招待します**
	 *
	 * @param options.chatRoomId - チャットルームのID
	 * @param options.roomId - ルームID
	 * @param options.roomUrl - ルームのURL
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/v2/calls/invite}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#inviteUsersToChatCall | ドキュメントを参照}
	 *
	 */
	public inviteUsersToChatCall = async (options: { chatRoomId?: number; roomId?: number; roomUrl?: string } = {}) => {
		return await this.callAPI.inviteUsersToChatCall(options);
	};

	/**
	 *
	 * **ユーザーを通話から追放します**
	 *
	 * @param options.callId - 通話ルームのID
	 * @param options.userId - 追放するユーザーのID
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/v1/calls/conference_calls/:callId/kick}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#banUserFromCall | ドキュメントを参照}
	 *
	 */
	public banUserFromCall = async (options: { callId: number; userId: number }) => {
		return await this.callAPI.kickAndBanFromCall(options);
	};

	/**
	 *
	 * **匿名ユーザーが通話から退出したことを通知します**
	 *
	 * @param options.conferenceId - 通話ルームのID
	 * @param options.agoraUid - AgoraのUID
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/v1/anonymous_calls/leave_agora_channel}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#notifyAnonymousUserLeaveCall | ドキュメントを参照}
	 *
	 */
	public notifyAnonymousUserLeaveCall = async (options: { conferenceId: number; agoraUid: string }) => {
		return await this.callAPI.notifyAnonymousUserLeaveAgoraChannel(options);
	};

	/**
	 *
	 * **ユーザーが通話から退出したことを通知します**
	 *
	 * @param options.conferenceId - 通話ルームのID
	 * @param options.userId - ユーザーのID
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/v1/calls/leave_agora_channel}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#notifyUserLeaveCall | ドキュメントを参照}
	 *
	 */
	public notifyUserLeaveCall = async (options: { conferenceId: number; userId: number }) => {
		return await this.callAPI.notifyUserLeaveAgoraChannel(options);
	};

	/**
	 *
	 * **通話のスクリーンショットを送信します**
	 *
	 * @param options.screenshotFilename - スクリーンショットのファイル名
	 * @param options.conferenceId - 通話ルームのID
	 *
	 * @endpoint
	 * `PUT`: {@link https://api.yay.space/v1/calls/screenshot}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#sendCallScreenshot | ドキュメントを参照}
	 *
	 */
	public sendCallScreenshot = async (options: { screenshotFilename: string; conferenceId: number }) => {
		return await this.callAPI.sendCallScreenshot(options);
	};

	/**
	 *
	 * **通話を開始します**
	 *
	 * @param options.callId - 通話ルームのID
	 * @param options.joinableBy - 参加可能なユーザー
	 * @param options.gameTitle - ゲームのタイトル
	 * @param options.categoryId - カテゴリーID
	 *
	 * @endpoint
	 * `PUT`: {@link https://api.yay.space/v1/calls/:callId}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#startCall | ドキュメントを参照}
	 *
	 */
	public startCall = async (options: {
		callId: number;
		joinableBy: string;
		gameTitle?: string;
		categoryId?: string;
	}) => {
		return await this.callAPI.setCall(options);
	};

	/**
	 *
	 * **通話参加者の権限を設定します**
	 *
	 * @param options.callId - 通話ルームのID
	 * @param options.userId - ユーザーのID
	 * @param options.role - 権限 / 役割
	 *
	 * @endpoint
	 * `PUT`: {@link https://api.yay.space/v1/calls/:callId/users/:userId}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#setCallUserRole | ドキュメントを参照}
	 *
	 */
	public setCallUserRole = async (options: { callId: number; userId: number; role: string }) => {
		return await this.callAPI.setUserRole(options);
	};

	/**
	 *
	 * **通話に参加します**
	 *
	 * @param options.conferenceId - 通話ルームのID
	 * @param options.callSid - 通話のSID
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/v2/calls/start_conference_call}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#joinCall | ドキュメントを参照}
	 *
	 */
	public joinCall = async (options: { conferenceId: number; callSid?: string }): Promise<ConferenceCallResponse> => {
		return await this.callAPI.startCall(options);
	};

	/**
	 *
	 * **通話から退出します**
	 *
	 * @param options.conferenceId - 通話ルームのID
	 * @param options.callSid - 通話のSID
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/v1/calls/leave_conference_call}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#leaveCall | ドキュメントを参照}
	 *
	 */
	public leaveCall = async (options: { conferenceId: number; callSid?: string }) => {
		return await this.callAPI.stopCall(options);
	};

	/**
	 *
	 * **匿名ユーザーとして通話に参加します**
	 *
	 * @param options.conferenceId - 通話ルームのID
	 * @param options.AgoraUid - AgoraのUID
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/v1/anonymous_calls/start_conference_call}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#joinCallAsAnonymous | ドキュメントを参照}
	 *
	 */
	public joinCallAsAnonymous = async (options: {
		conferenceId: number;
		AgoraUid?: string;
	}): Promise<ConferenceCallResponse> => {
		return await this.callAPI.startAnonymousCall(options);
	};

	/**
	 *
	 * **匿名ユーザーとして通話から退出します**
	 *
	 * @param options.conferenceId - 通話ルームのID
	 * @param options.AgoraUid - AgoraのUID
	 *
	 * @endpoint
	 * `POST`: {@link https://api.yay.space/v1/anonymous_calls/leave_conference_call}
	 *
	 * @see {@link https://qvco.github.io/yay.js/classes/Client.html#leaveCallAsAnonymous | ドキュメントを参照}
	 *
	 */
	public leaveCallAsAnonymous = async (options: { conferenceId: number; AgoraUid?: string }) => {
		return await this.callAPI.stopAnonymousCall(options);
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

	public getChatGifs = async (): Promise<GifImageCategory[]> => {
		return (await this.chatAPI.getGifsData()).gifCategories;
	};

	public getHiddenChatRooms = async (
		options: { number?: number; fromTimestamp?: number } = {},
	): Promise<ChatRoomsResponse> => {
		return await this.chatAPI.getHiddenChatRooms(options);
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

	public unhideChatRooms = async (options: { roomIds: number[] }) => {
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

	public getGroupMember = async (options: { groupId: number; userId: number }): Promise<GroupUser> => {
		return (await this.groupAPI.getMember(options)).groupUser;
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
	 * **関連するサークルを削除します**
	 *
	 * @param options.groupId - サークルのID
	 * @param options.relatedGroupIds - 関連するサークルのID
	 *
	 * @endpoint
	 * `DELETE`: https://api.yay.space/v1/groups/:groupId/related
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

	public sendGroupModeratorOffers = async (options: { groupId: number; userIds: number[] }) => {
		return await this.groupAPI.sendModeratorOffers(options);
	};

	public sendGroupOwnershipOffer = async (options: { groupId: number; userId: number }) => {
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
		secret?: boolean;
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

	public getMutedUsers = async (options: { from?: string; number?: number }): Promise<HiddenResponse> => {
		return await this.hiddenAPI.getList(options);
	};

	public muteUser = async (options: { userId: number }) => {
		return await this.hiddenAPI.hideUser(options);
	};

	public unmuteUsers = async (options: { userIds: number[] }) => {
		return await this.hiddenAPI.unHideUsers(options);
	};

	// MiscAPI

	public acceptPolicyAgreement = async (options: { type: string }) => {
		return await this.miscAPI.acceptPolicyAgreement(options);
	};

	public getEmailGrantToken = async (options: { email: string; code: string }): Promise<string> => {
		return (await this.miscAPI.getEmailGrantToken(options)).emailGrantToken;
	};

	public getEmailVerificationPresignedUrl = async (options: {
		email: string;
		locale: string;
		intent?: string;
	}): Promise<EmailVerificationPresignedUrlResponse> => {
		return await this.miscAPI.getEmailVerificationPresignedUrl(options);
	};

	public getFileUploadPresignedUrls = async (options: { filenames: string[] }): Promise<PresignedUrlsResponse> => {
		return await this.miscAPI.getFileUploadPresignedUrls(options);
	};

	public getVideoFileUploadPresignedUrl = async (options: { videoFilename: string }): Promise<PresignedUrlResponse> => {
		return await this.miscAPI.getOldFileUploadPresignedUrl(options);
	};

	public getPolicyAgreements = async (): Promise<PolicyAgreementsResponse> => {
		return await this.miscAPI.getPolicyAgreements();
	};

	public getPromotions = async (options: { page: number; number?: number }): Promise<PromotionsResponse> => {
		return await this.miscAPI.getPromotions(options);
	};

	public getVipGameRewardUrl = async (options: { deviceType: string }): Promise<VipGameRewardUrlResponse> => {
		return await this.miscAPI.getVipGameRewardUrl(options);
	};

	public getWebSocketToken = async (): Promise<string> => {
		return (await this.miscAPI.getWebSocketToken()).token;
	};

	public svc = async (options: { email: string; locale: string }) => {
		return await this.miscAPI.svc(options);
	};

	public verifyDevice = async (options: {
		platform: string;
		verificationString: string;
	}): Promise<VerifyDeviceResponse> => {
		return await this.miscAPI.verifyDevice(options);
	};

	// MuteKeywordAPI

	public muteKeyword = async (options: { word: string; context: string[] }): Promise<MuteKeyword> => {
		return (await this.muteKeywordAPI.createKeyword(options)).hiddenWord;
	};

	public deleteMutedKeyword = async (options: { keywordIds: number[] }) => {
		return await this.muteKeywordAPI.deleteKeyword(options);
	};

	public getMutedKeywords = async (): Promise<MuteKeyword[]> => {
		return (await this.muteKeywordAPI.getKeywords()).hiddenWords;
	};

	public editMutedKeyword = async (options: {
		keywordId: number;
		word: string;
		context: string[];
	}): Promise<MuteKeyword> => {
		return (await this.muteKeywordAPI.updateKeyword(options)).hiddenWord;
	};

	// NotificationAPI

	public getNotifications = async (
		options: {
			important?: boolean;
			fromTimestamp?: number;
			number?: number;
		} = {},
	): Promise<ActivitiesResponse> => {
		return await this.notificationAPI.getUserActivities(options);
	};

	public getMergedNotifications = async (options: { fromTimestamp?: number } = {}): Promise<ActivitiesResponse> => {
		return await this.notificationAPI.getUserMergedActivities(options);
	};

	public receivedNotification = async (options: { pid: string; type: string; openedAt?: number }) => {
		return await this.notificationAPI.receivedNotification(options);
	};

	// PostAPI

	public addBookmark = async (options: { userId: number; postId: number }): Promise<BookmarkPostResponse> => {
		return await this.postAPI.addBookmark(options);
	};

	public addGroupHighlightPost = async (options: {
		groupId: number;
		postId: number;
	}): Promise<BookmarkPostResponse> => {
		return await this.postAPI.addGroupHighlightPost(options);
	};

	public createGroupCallPost = async (
		options: {
			text?: string;
			fontSize?: number;
			color?: number;
			groupId?: number;
			callType?: string;
			categoryId?: number;
			gameTitle?: string;
			joinableBy?: string;
			attachmentFilename?: string;
			attachment2Filename?: string;
			attachment3Filename?: string;
			attachment4Filename?: string;
			attachment5Filename?: string;
			attachment6Filename?: string;
			attachment7Filename?: string;
			attachment8Filename?: string;
			attachment9Filename?: string;
		} = {},
	): Promise<CreatePostResponse> => {
		let messageTags: MessageTag[] | undefined = undefined;

		if (options.text?.includes('<@>') && options.text.includes('<@/>')) {
			messageTags = objectToSnake(util.buildMessageTags(options.text));
			options.text = options.text.replace(/<@>(\d+):([^<]+)<@\/>/g, '$2');
		}

		return await this.postAPI.createGroupCallPost({ ...options, messageTags: messageTags });
	};

	public pinGroupPost = async (options: { postId: number; groupId: number }) => {
		return await this.postAPI.createGroupPinPost(options);
	};

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
		const postType = util.getPostType(options);

		let sharedUrlObj: SharedUrl | undefined = undefined;
		let messageTags: MessageTag[] | undefined = undefined;

		if (options.sharedUrl) {
			sharedUrlObj = objectToSnake(await this.getUrlMetadata({ url: options.sharedUrl }));
		}

		if (options.text?.includes('<@>') && options.text.includes('<@/>')) {
			messageTags = objectToSnake(util.buildMessageTags(options.text));
			options.text = options.text.replace(/<@>(\d+):([^<]+)<@\/>/g, '$2');
		}

		return await this.postAPI.createPost({
			...options,
			jwt: await this.getWebSocketToken(),
			postType: postType,
			sharedUrl: sharedUrlObj,
			messageTags: messageTags,
		});
	};

	public createRepost = async (options: {
		postId: number;
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
	}): Promise<CreatePostResponse> => {
		const postType = util.getPostType(options);

		let sharedUrlObj: SharedUrl | undefined = undefined;
		let messageTags: MessageTag[] | undefined = undefined;

		if (options.sharedUrl) {
			sharedUrlObj = objectToSnake(await this.getUrlMetadata({ url: options.sharedUrl }));
		}

		if (options.text?.includes('<@>') && options.text.includes('<@/>')) {
			messageTags = objectToSnake(util.buildMessageTags(options.text));
			options.text = options.text.replace(/<@>(\d+):([^<]+)<@\/>/g, '$2');
		}

		return this.postAPI.createRepost({
			...options,
			jwt: await this.getWebSocketToken(),
			postType: postType,
			sharedUrl: sharedUrlObj,
			messageTags: messageTags,
		});
	};

	public createSharePost = async (options: {
		shareableType: string;
		shareableId: number;
		postId: number;
		text?: string;
		fontSize?: number;
		color?: number;
		groupId?: number;
	}): Promise<Post> => {
		return await this.postAPI.createSharePost(options);
	};

	public createThreadPost = async (options: {
		threadId: number;
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
	}): Promise<Post> => {
		const postType = util.getPostType(options);

		let sharedUrlObj: SharedUrl | undefined = undefined;
		let messageTags: MessageTag[] | undefined = undefined;

		if (options.sharedUrl) {
			sharedUrlObj = objectToSnake(await this.getUrlMetadata({ url: options.sharedUrl }));
		}

		if (options.text?.includes('<@>') && options.text.includes('<@/>')) {
			messageTags = objectToSnake(util.buildMessageTags(options.text));
			options.text = options.text.replace(/<@>(\d+):([^<]+)<@\/>/g, '$2');
		}

		return await this.postAPI.createThreadPost({
			...options,
			jwt: await this.getWebSocketToken(),
			postType: postType,
			sharedUrl: sharedUrlObj,
			messageTags: messageTags,
		});
	};

	public deleteAllMyPost = async () => {
		return await this.postAPI.deleteAllPost();
	};

	public unpinGroupPost = async (options: { groupId: number }) => {
		return await this.postAPI.deleteGroupPinPost(options);
	};

	public unpinPost = async (options: { postId: number }) => {
		return await this.postAPI.deletePinPost(options);
	};

	public getBookmark = async (options: { userId: number; from?: string }): Promise<PostsResponse> => {
		return await this.postAPI.getBookmark(options);
	};

	public getTimelineCalls = async (
		options: {
			groupId?: number;
			fromTimestamp?: number;
			number?: number;
			categoryId?: number;
			callType?: string;
			includeCircleCall?: boolean;
			crossGeneration?: boolean;
			excludeRecentGomimushi?: boolean;
			sharedInterestCategories?: boolean;
		} = {},
	): Promise<PostsResponse> => {
		return await this.postAPI.getCallTimeline(options);
	};

	public getConversation = async (options: {
		conversationId: number;
		groupId?: number;
		threadId?: number;
		fromPostId?: number;
		reverse?: boolean;
	}): Promise<PostsResponse> => {
		return await this.postAPI.getConversation(options);
	};

	public getConversationRootPosts = async (options: { postIds: number[] }): Promise<PostsResponse> => {
		return await this.postAPI.getConversationRootPosts(options);
	};

	public getFollowingTimelineCalls = async (
		options: {
			fromTimestamp?: number;
			number?: number;
			categoryId?: number;
			callType?: string;
			includeCircleCall?: boolean;
			excludeRecentGomimushi?: boolean;
		} = {},
	): Promise<PostsResponse> => {
		return await this.postAPI.getFollowingCallTimeline(options);
	};

	public getFollowingTimeline = async (
		options: {
			from?: string;
			fromPostId?: number;
			onlyRoot?: boolean;
			orderBy?: string;
			number?: number;
			mxn?: number;
			reduceSelfie?: boolean;
			customGenerationRange?: boolean;
		} = {},
	): Promise<PostsResponse> => {
		return await this.postAPI.getFollowingTimeline(options);
	};

	public getGroupHighlightPosts = async (options: {
		groupId: number;
		from?: string;
		number?: number;
	}): Promise<PostsResponse> => {
		return await this.postAPI.getGroupHighlightPosts(options);
	};

	public searchGroupPosts = async (options: {
		groupId: number;
		keyword: string;
		fromPostId?: number;
		number?: number;
		onlyThreadPosts?: boolean;
	}): Promise<PostsResponse> => {
		return await this.postAPI.getGroupSearchPosts(options);
	};

	public getGroupTimeline = async (options: {
		groupId: number;
		fromPostId?: number;
		reverse?: boolean;
		postType?: string;
		number?: number;
		onlyRoot?: boolean;
	}): Promise<PostsResponse> => {
		return await this.postAPI.getGroupTimeline(options);
	};

	public getTimelineByHashtag = async (options: {
		tag: number;
		fromPostId?: number;
		number?: number;
	}): Promise<PostsResponse> => {
		return await this.postAPI.getHashtagTimeline(options);
	};

	public getMyPosts = async (
		options: {
			fromPostId?: number;
			number?: number;
			includeGroupPost?: boolean;
		} = {},
	): Promise<PostsResponse> => {
		return await this.postAPI.getMyPosts(options);
	};

	public getPost = async (options: { postId: number }): Promise<PostResponse> => {
		return await this.postAPI.getPost(options);
	};

	public getPostLikers = async (options: { postId: number; fromId?: number }): Promise<PostLikersResponse> => {
		return await this.postAPI.getPostLikers(options);
	};

	public getReposts = async (options: { postId: number; fromPostId?: number }): Promise<PostsResponse> => {
		return await this.postAPI.getPostReposts(options);
	};

	public getPosts = async (options: { postIds: number[] }): Promise<PostsResponse> => {
		return await this.postAPI.getPosts(options);
	};

	public getRecentEngagementsPosts = async (options: { number?: number } = {}): Promise<PostsResponse> => {
		return await this.postAPI.getRecentEngagementsPosts(options);
	};

	public getRecommendedPostTags = async (options: {
		tag: string;
		saveRecentSearch?: boolean;
	}): Promise<PostTagsResponse> => {
		return await this.postAPI.getRecommendedPostTags(options);
	};

	public getRecommendedPosts = async (
		options: {
			experimentNum?: number;
			variantNum?: number;
			number?: number;
			saveRecentSearch?: boolean;
		} = {},
	): Promise<PostsResponse> => {
		return await this.postAPI.getRecommendedPosts(options);
	};

	public searchPosts = async (options: {
		keyword: string;
		postOwnerScope: number;
		onlyMedia?: boolean;
		fromPostId?: number;
		number?: number;
	}): Promise<PostsResponse> => {
		return await this.postAPI.getSearchPosts(options);
	};

	public getTimeline = async (options: {
		noreplyMode: boolean;
		orderBy: string;
		experimentOlderAgeRules?: boolean;
		sharedInterestCategories?: boolean;
		from?: string;
		fromPostId?: number;
		number?: number;
		mxn?: number;
		en?: number;
		vn?: number;
		reduceSelfie?: boolean;
		customGenerationRange?: boolean;
	}): Promise<PostsResponse> => {
		return await this.postAPI.getTimeline(options);
	};

	public getUrlMetadata = async (options: { url: string }): Promise<SharedUrl> => {
		return await this.postAPI.getUrlMetadata(options);
	};

	public getUserTimeline = async (options: {
		userId: number;
		fromPostId?: number;
		postType?: string;
		number?: number;
	}): Promise<PostsResponse> => {
		return await this.postAPI.getUserTimeline(options);
	};

	public likePost = async (options: { postId: number }): Promise<LikePostsResponse> => {
		return await this.postAPI.likePosts({ postIds: [options.postId] });
	};

	public likeMultiplePosts = async (options: { postIds: number[] }): Promise<LikePostsResponse> => {
		return await this.postAPI.likePosts(options);
	};

	public removeGroupHighlightPost = async (options: { groupId: number; postId: number }) => {
		return await this.postAPI.removeGroupHighlightPost(options);
	};

	public deletePosts = async (options: { postIds: number[] }) => {
		return await this.postAPI.removePosts(options);
	};

	public reportPost = async (options: {
		postId: number;
		categoryId?: number;
		reason?: string;
		opponentId?: number;
		screenshotFilename?: string;
		screenshot2Filename?: string;
		screenshot3Filename?: string;
		screenshot4Filename?: string;
	}) => {
		return await this.postAPI.reportPost(options);
	};

	public unlikePost = async (options: { postId: number }) => {
		return await this.postAPI.unlikePost(options);
	};

	public updatePost = async (options: {
		postId: number;
		text?: string;
		fontSize?: number;
		color?: number;
	}): Promise<Post> => {
		let messageTags: MessageTag[] | undefined = undefined;

		if (options.text?.includes('<@>') && options.text.includes('<@/>')) {
			messageTags = objectToSnake(util.buildMessageTags(options.text));
			options.text = options.text.replace(/<@>(\d+):([^<]+)<@\/>/g, '$2');
		}

		return await this.postAPI.updatePost({ ...options, messageTags: messageTags });
	};

	public updateRecommendationFeedback = async (options: {
		postId: number;
		experimentNum?: number;
		variantNum?: number;
		feedbackResult: string;
	}) => {
		return await this.postAPI.updateRecommendationFeedback(options);
	};

	public validatePost = async (options: {
		text: string;
		groupId?: number;
		threadId?: number;
	}): Promise<ValidationPostResponse> => {
		return await this.postAPI.validatePost(options);
	};

	public viewVideo = async (options: { videoId: number }) => {
		return await this.postAPI.viewVideo(options);
	};

	public voteSurvey = async (options: { surveyId: number; choiceId: number }): Promise<VoteSurveyResponse> => {
		return await this.postAPI.voteSurvey(options);
	};

	// ReviewAPI

	public sendReview = async (options: { userId: number; comment: string }) => {
		return await this.reviewAPI.createReview(options);
	};

	public deleteReviews = async (options: { reviewIds: number[] }) => {
		return await this.reviewAPI.deleteReviews(options);
	};

	public getMyReviews = async (options: { fromId?: number } = {}): Promise<ReviewsResponse> => {
		return await this.reviewAPI.getMyReviews(options);
	};

	public getReviews = async (options: { userId: number; fromId?: number }): Promise<ReviewsResponse> => {
		return await this.reviewAPI.getReviews(options);
	};

	public pinReview = async (options: { reviewId: number }) => {
		return await this.reviewAPI.pinReview(options);
	};

	public unpinReview = async (options: { reviewId: number }) => {
		return await this.reviewAPI.unpinReview(options);
	};

	// ThreadAPI

	// UserAPI

	public deleteContactFriends = async () => {
		return await this.userAPI.deleteContactFriends();
	};

	public deleteFootprint = async (options: { userId: number; footprintId: number }) => {
		return await this.userAPI.deleteFootprint(options);
	};

	public destroyUser = async () => {
		return await this.userAPI.destroyUser();
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

	public getAdditionalSettings = async (): Promise<AdditionalSettingsResponse> => {
		return await this.userAPI.getAdditionalSettings();
	};

	public getFollowRecommendations = async (
		options: {
			fromTimestamp?: number;
			number?: number;
			sources?: string[];
		} = {},
	): Promise<FollowRecommendationsResponse> => {
		return await this.userAPI.getFollowRecommendations(options);
	};

	public getFollowRequests = async (options: { fromTimestamp?: number } = {}): Promise<UsersByTimestampResponse> => {
		return await this.userAPI.getFollowRequest(options);
	};

	public getFollowRequestsCount = async (): Promise<FollowRequestCountResponse> => {
		return await this.userAPI.getFollowRequestCount();
	};

	public getFollowingUserBirthdate = async (options: { birthdate?: string } = {}): Promise<UsersResponse> => {
		return await this.userAPI.getFollowingUsersBorn(options);
	};

	public getFootprints = async (
		options: { fromId?: number; number?: number; mode?: string } = {},
	): Promise<FootprintsResponse> => {
		return await this.userAPI.getFootprints(options);
	};

	public getFreshUser = async (options: { userId: number }): Promise<UserResponse> => {
		return await this.userAPI.getFreshUser(options);
	};

	public getHimaUsers = async (options: { fromHimaId?: number; number?: number } = {}): Promise<HimaUsersResponse> => {
		return await this.userAPI.getHimaUsers(options);
	};

	public getRecommendedUsersToFollow = async (options: {
		userId: number;
		number?: number;
		page?: number;
	}): Promise<UsersResponse> => {
		return await this.userAPI.getRecommendedUsersToFollowForProfile(options);
	};

	public getRefreshCounterRequests = async (): Promise<RefreshCounterRequestsResponse> => {
		return await this.userAPI.getRefreshCounterRequests();
	};

	public getTimestamp = async (): Promise<UserTimestampResponse> => {
		return await this.userAPI.getTimestamp();
	};

	public getUser = async (options: { userId: number }): Promise<UserResponse> => {
		return await this.userAPI.getUser(options);
	};

	public getUserCustomDefinitions = async (): Promise<UserCustomDefinitionsResponse> => {
		return await this.userAPI.getUserCustomDefinitions();
	};

	public getUserEmail = async (options: { userId: number }): Promise<UserEmailResponse> => {
		return await this.userAPI.getUserEmail(options);
	};

	public getUserFollowers = async (options: {
		userId: number;
		fromFollowId?: number;
		followedByMe?: boolean;
		nickname?: string;
	}): Promise<FollowUsersResponse> => {
		return await this.userAPI.getUserFollowers(options);
	};

	public getUserFollowings = async (options: {
		userId: number;
		fromFollowId?: number;
		fromTimestamp?: boolean;
		orderBy?: string;
		// SearchUsersRequest
	}): Promise<FollowUsersResponse> => {
		return await this.userAPI.getUserFollowings(options);
	};

	public getUserFromQr = async (options: { qr: string }): Promise<UserResponse> => {
		return await this.userAPI.getUserFromQr(options);
	};

	public getUserWithCallUserId = async (options: { callId: number; callUserId: string }): Promise<UserResponse> => {
		return await this.userAPI.getUserWithCallUserId(options);
	};

	public getUserWithoutLeavingFootprint = async (options: { userId: number }): Promise<UserResponse> => {
		return await this.userAPI.getUserWithoutLeavingFootprint(options);
	};

	public getUsers = async (options: { userIds: number[] }): Promise<UsersResponse> => {
		return await this.userAPI.getUsers({
			...options,
			jwt: await this.getWebSocketToken(),
		});
	};

	public getUsersFromUuid = async (options: { uuid: string }): Promise<UsersResponse> => {
		return await this.userAPI.getUsersFromUuid(options);
	};

	public refreshProfileCounter = async (options: { counter: string }) => {
		return await this.userAPI.refreshCounter(options);
	};

	public reg = async (options: {
		nickname: string;
		biography?: string;
		birthDate: string;
		gender: number;
		countryCode: string;
		prefecture?: string;
		profileIconFilename?: string;
		coverImageFilename?: string;
		email?: string;
		password?: string;
		emailGrantToken?: string;
		en?: number;
		vn?: number;
	}): Promise<CreateUserResponse> => {
		return await this.userAPI.reg(options);
	};

	public removeUserAvatar = async () => {
		return await this.userAPI.removeUserAvatar();
	};

	public removeUserCover = async () => {
		return await this.userAPI.removeUserCover();
	};

	public reportUser = async (options: {
		userId: number;
		categoryId: number;
		reason?: string;
		screenshotFilename?: string;
		screenshot2Filename?: string;
		screenshot3Filename?: string;
		screenshot4Filename?: string;
	}) => {
		return await this.userAPI.reportUser(options);
	};

	public resetPassword = async (options: { email: string; emailGrantToken: string; password: string }) => {
		return await this.userAPI.resetPassword(options);
	};

	public searchLobiUsers = async (
		options: { nickname?: string; number?: number; from?: string } = {},
	): Promise<UsersResponse> => {
		return await this.userAPI.searchLobiUsers(options);
	};

	public searchUsers = async (options: {
		gender?: number;
		nickname?: string;
		title?: string;
		biography?: string;
		fromTimestamp?: number;
		similarAge?: boolean;
		notRecentGomimushi?: boolean;
		recentlyCreated?: boolean;
		samePrefecture?: boolean;
		prefecture?: string;
		saveRecentSearch?: boolean;
	}): Promise<UsersResponse> => {
		return await this.userAPI.searchUsers(options);
	};

	public setAdditionalUserSettingEnabled = async (options: { mode: string; on?: number }) => {
		return await this.userAPI.setAdditionalSettingEnabled(options);
	};

	public setFollowPermissionEnabled = async (options: { nickname: string; isPrivate?: boolean }) => {
		return await this.userAPI.setFollowPermissionEnabled(options);
	};

	public setSettingFollowRecommendationEnabled = async (options: { on: boolean }) => {
		return await this.userAPI.setSettingFollowRecommendationEnabled(options);
	};

	public takeActionFollowRequest = async (options: { userId: number; action: string }) => {
		return await this.userAPI.takeActionFollowRequest(options);
	};

	public turnOnHima = async () => {
		return await this.userAPI.turnOnHima();
	};

	public unfollowUser = async (options: { userId: number }) => {
		return await this.userAPI.unfollowUser(options);
	};

	public updateLanguage = async (options: { language: string }) => {
		return await this.userAPI.updateLanguage(options);
	};

	public editUser = async (options: {
		nickname: string;
		username?: string;
		biography?: string;
		prefecture?: string;
		gender?: number;
		countryCode?: string;
		profileIconFilename?: string;
		coverImageFilename?: string;
	}) => {
		return await this.userAPI.updateUser(options);
	};

	public uploadTwitterFriendIds = async (options: { twitterFriendIds: string[] }) => {
		return await this.userAPI.uploadTwitterFriendIds(options);
	};
}
