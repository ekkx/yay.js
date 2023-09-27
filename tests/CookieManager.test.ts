import { CookieManager } from '../src/util/CookieManager';
import { Cookie } from '../src/util/Types';

describe('CookieManager', () => {
	let cookieManager: CookieManager;
	// 暗号化用
	let cookieEncryptManager: CookieManager;

	const testFilePath = './testCookie.json';
	const testEncryptFilePath = './testEncryptCookie.json';

	beforeAll(() => {
		cookieManager = new CookieManager(testFilePath);
		cookieEncryptManager = new CookieManager(testEncryptFilePath, 'test-password');
	});

	afterAll(() => {
		cookieManager.deleteCookie();
		cookieEncryptManager.deleteCookie();
	});

	const testCookie: Cookie = {
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
		cookieManager.setCookie(testCookie);
		cookieManager.saveCookie();

		const loadedCookie = cookieManager.loadCookie();
		expect(loadedCookie).toEqual(testCookie);
	});

	it('クッキーデータをセットし、暗号化して保存する', () => {
		cookieEncryptManager.setCookie(testCookie);
		cookieEncryptManager.saveCookie();

		const loadedCookie = cookieEncryptManager.loadCookie();
		expect(loadedCookie).toEqual(testCookie);
	});
});
