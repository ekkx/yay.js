import { BaseClient } from '../client/BaseClient';

/**
 * ミュートキーワードAPI
 *
 * @remarks
 * 特定のキーワードのミュート設定APIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class MuteKeywordAPI {
	public constructor(private readonly base: BaseClient) {}
}
