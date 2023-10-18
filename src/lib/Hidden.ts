import { BaseClient } from '../client/BaseClient';

/**
 * 非表示API
 *
 * @remarks
 * コンテンツやユーザーを非表示にするAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class HiddenAPI {
	public constructor(private readonly base: BaseClient) {}
}
