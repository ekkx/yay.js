import { BaseClient } from './BaseClient';
import { ClientOptions } from '../util/Types';

export class Client extends BaseClient {
	public constructor(options: ClientOptions) {
		super(options);
	}
}

// usage
const main = async () => {
	const client = new Client({ saveCookie: true });

	// await client.login()
};

main();
