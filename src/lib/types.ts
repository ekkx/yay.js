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
  Delete = 'DELETE',
  Get = 'GET',
  Patch = 'PATCH',
  Post = 'POST',
  Put = 'PUT',
}
