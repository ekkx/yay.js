import { Client } from 'yay.js';

const main = async () => {
	const client = new Client();

	await client.login({
		email: 'your_email',
		password: 'your_password',
	});

	await client.createPost({
		text: 'Hello with yay.js!',
		sharedUrl: 'https://github.com/qvco/yay.js',
	});
};

main();