import { createHash, createHmac } from 'crypto';
import util from 'util';
import { API_KEY, API_VERSION_KEY, API_VERSION_NAME, SHARED_KEY } from './Constants';

/**
 * **ユーザーをメンションします**
 *
 * @param options.userId - ユーザーID
 *
 * @example
 * ```javascript
 * import { Client, mention } from 'yay.js';
 *
 * const main = async () => {
 * 	const client = new Client();
 *
 * 	await client.login({
 * 		email: 'yourEmail',
 * 		password: 'yourPassword',
 * 	});
 *
 * 	client.createPost({
 * 		text: `こんにちは、${mention({userId: 15184, displayName: 'アルパカ'})}さん！`
 * 	});
 * };
 * ```
 *
 * @see https://github.com/qvco/yay.js
 */
export const mention = (options: { userId: number; displayName: string }): string => {
	return `${options.userId} ${options.displayName}`;
};

/** @ignore */
export const md5 = (uuid: string, timestamp: number, requireSharedKey: boolean): string => {
	const sharedKey: string = requireSharedKey ? SHARED_KEY : '';
	return createHash('md5')
		.update(API_KEY + uuid + timestamp.toString() + sharedKey)
		.digest('hex');
};

/** @ignore */
export const sha256 = (): string => {
	const message = util.format('yay_android/%s', API_VERSION_NAME);
	return createHmac('sha256', API_VERSION_KEY).update(message).digest('base64');
};
