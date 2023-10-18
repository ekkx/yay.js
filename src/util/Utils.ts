import { Buffer } from 'buffer';
import { createHash, createHmac } from 'crypto';
import { API_KEY, API_VERSION_KEY, API_VERSION_NAME, SHARED_KEY } from './Constants';

const decode = (str: string): string => Buffer.from(str, 'base64').toString('binary');
const encode = (str: string): string => Buffer.from(str, 'binary').toString('base64');

export const signedInfo = (uuid: string, timestamp: number, requireSharedKey: boolean): string => {
	const sharedKey: string = requireSharedKey ? SHARED_KEY : '';
	return createHash('md5')
		.update(API_KEY + uuid + timestamp + sharedKey)
		.digest('hex');
};

export const signedVersion = (): string => {
	const hmac = createHmac('sha256', encode(API_VERSION_KEY));
	hmac.update(encode(`yay_android/${API_VERSION_NAME}`));
	const resultBuffer = hmac.digest().toString();
	return decode(resultBuffer);
};
