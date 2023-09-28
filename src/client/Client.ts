import { BaseClient } from './BaseClient';
import { ClientOptions } from '../util/Types';
import { API_KEY } from '../util/Constants';
import { LoginUserResponse } from '../util/Responses';

export class Client extends BaseClient {
	public constructor(options: ClientOptions) {
		super(options);
	}

	public login = async (email: string, password: string): Promise<LoginUserResponse> => {
		return await this.authenticate({
			apiKey: API_KEY,
			email: email,
			password: password,
			uuid: this.cookie.uuid,
		});
	};
}

// usage
const main = async () => {
	const client = new Client({ saveCookie: true });
	const res = await client.login('your_email', 'your_password');
	console.log(res);
	console.log(client.cookie.get());
};

main();
