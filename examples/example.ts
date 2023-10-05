import { Client } from 'yay.js';

const main = async () => {
	const client = new Client();

	await client.login({
		email: 'aid935@instaddr.uk',
		password: 'abc123',
	});

	await client.createPost({
		text: 'Hello with yay.js!',
		sharedUrl: 'https://github.com/qvco/yay.js',
	});
};

main();
