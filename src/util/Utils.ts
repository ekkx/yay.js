import { createHash, createHmac } from 'crypto';
import path from 'path';
import util from 'util';
import { API_KEY, API_VERSION_KEY, API_VERSION_NAME, SHARED_KEY } from './Constants';
import { Attachment, MessageTag } from './Models';
import { YJSError } from './Errors';

export const getFilenameAndExtension = (filePath: string): { filename: string; extension: string } => {
	const filename: string = path.basename(filePath);
	const extension: string = path.extname(filePath);
	return { filename, extension };
};

export const isValidImageFormat = (extension: string): boolean => {
	return /\.(jpg|jpeg|png|gif)$/.test(extension);
};

export const getHashedFilename = (att: Attachment, type: string, key: number, uuid: string): string => {
	return '';
};

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
	if (!options.displayName.length) {
		throw new YJSError('displayNameは空白にできません。');
	}
	return `<@>${options.userId}:${options.displayName}<@/>`;
};

/** @ignore */
export const buildMessageTags = (text: string): MessageTag[] => {
	const messageTags: MessageTag[] = [];
	const regex = /<@>(\d+):([^<]+)<@\/>/g;
	let result;

	let offsetAdjustment = 0;

	while ((result = regex.exec(text)) !== null) {
		const fullMatchLength = result[0].length;
		const displayNameLength = result[2].length;

		messageTags.push({
			type: 'user',
			userId: Number(result[1]),
			offset: result.index - offsetAdjustment,
			length: result[2].length,
		});

		offsetAdjustment += fullMatchLength - displayNameLength;
	}

	return messageTags;
};

/** @ignore */
export const getPostType = (options: Record<string, any>): string => {
	if (options.choices) {
		return 'survey';
	} else if (options.sharedUrl) {
		return 'shareable_url';
	} else if (options.videoFileName) {
		return 'video';
	} else if (options.attachmentFileName) {
		return 'image';
	} else {
		return 'text';
	}
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
