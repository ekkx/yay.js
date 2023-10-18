import { createHash, createHmac } from 'crypto';
import util from 'util';
import { API_KEY, API_VERSION_KEY, API_VERSION_NAME, SHARED_KEY } from './Constants';

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
