/**
 * REST インスタンスを作成するときの引数
 */
export interface RESTOptions {
	/**
	 * プロキシのアドレス
	 */
	proxy: string | null;
	/**
	 * リクエストの最大リトライ回数
	 *
	 * @defaultValue `3`
	 */
	max_retries: number;
	/**
	 * リトライ待機時間の増加割合係数
	 *
	 * @defaultValue `1.5`
	 */
	backoff_factor: number;
	/**
	 * レート制限を待機するかどうか
	 *
	 * @defaultValue `true`
	 */
	wait_on_rate_limit: boolean;
	/**
	 * リクエストの待機時間
	 *
	 * @defaultValue `30`
	 */
	timeout: number;
	/**
	 * クッキーを保存するかどうか
	 *
	 * @defaultValue `true`
	 */
	save_cookie_file: boolean;
	/**
	 * 保存するクッキーを暗号化するかどうか
	 *
	 * @defaultValue `true`
	 */
	encrypt_cookie: boolean;
	/**
	 * 保存するクッキーのファイル名
	 *
	 * @defaultValue `'cookie'`
	 */
	cookie_filename: string;
}

/**
 * リクエストを送信する際のヘッダー情報
 */
export interface RequestHeaders {
	Authorization?: string;
	Host: string;
	'User-Agent': string;
	'X-Timestamp': string;
	'X-App-Version': string;
	'X-Device-Info': string;
	'X-Device-UUID': string;
	'X-Client-IP': string;
	'X-Connection-Type': string;
	'X-Connection-Speed': string;
	'Accept-Language': string;
	'Content-Type': string;
}

/**
 * リクエストを送信する際のAPIメソッド
 */
export enum RequestMethod {
	delete = 'DELETE',
	get = 'GET',
	patch = 'PATCH',
	post = 'POST',
	put = 'PUT',
}

/**
 * 投稿のタイプ
 */
export enum PostType {
	text = 'text',
	media = 'media',
	image = 'image',
	video = 'video',
	survey = 'survey',
	call = 'call',
	shareable_url = 'shareable_url',
}

/**
 * 通話のタイプ
 */
export enum CallType {
	voice = 'voice',
	video = 'vdo',
}

/**
 * 画像のタイプ
 */
export enum ImageType {
	post = 'post',
	chatMessage = 'chat_message',
	chatBackground = 'chat_background',
	report = 'report',
	userAvatar = 'user_avatar',
	userCover = 'user_cover',
	groupIcon = 'group_icon',
	groupCover = 'group_cover',
	groupThreadIcon = 'group_thread_icon',
}

/**
 * 共有のタイプ
 */
export enum ShareableType {
	group = 'group',
	thread = 'thread',
}
