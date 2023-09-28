import { Cookie } from '../src/util/Cookie';
import { CookieProps } from '../src/util/Types';

describe('CookieManager', () => {
	let cookie: Cookie;
	// 暗号化用
	let cookieEncrypt: Cookie;

	const testFilePath = './testCookie.json';
	const testEncryptFilePath = './testEncryptCookie.json';

	beforeAll(() => {
		cookie = new Cookie(true, testFilePath);
		cookieEncrypt = new Cookie(true, testEncryptFilePath, 'test-password');
	});

	afterAll(() => {
		cookie.destroy();
		cookieEncrypt.destroy();
	});

	const testCookie: CookieProps = {
		user: {
			email: 'test@example.com',
			userId: 123,
			uuid: 'test-uuid',
		},
		device: {
			deviceUuid: 'test-device-uuid',
		},
		authentication: {
			accessToken: 'test-access-token',
			refreshToken: 'test-refresh-token',
		},
	};

	it('クッキーデータをセットして保存する', () => {
		cookie.set(testCookie);
		cookie.save();

		const loadedCookie = cookie.load(testCookie.user.email);
		expect(loadedCookie).toEqual(testCookie);
	});

	it('クッキーデータをセットし、暗号化して保存する', () => {
		cookieEncrypt.set(testCookie);
		cookieEncrypt.save();

		const loadedCookie = cookieEncrypt.load(testCookie.user.email);
		expect(loadedCookie).toEqual(testCookie);
	});
});
