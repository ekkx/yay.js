import { BaseClient } from './BaseClient';
import { ClientOptions } from '../util/Types';

export class Client extends BaseClient {
	public constructor(options: ClientOptions) {
		super(options);
	}
}

// usage
const main = async () => {
	const client = new Client({
		email: 'your_email',
		password: 'your_password',
		saveCookie: true,
	});

	const bgms = await client.call.getBgms();
	console.log(bgms);
};

main();
