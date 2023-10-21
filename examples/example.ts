import { Client, mention } from 'yay.js';

const main = async () => {
	const client = new Client();

	await client.login({
		email: 'yourEmail',
		password: 'yourPassword',
	});

	await client.createPost({
		text: 'Hello with yay.js!',
		sharedUrl: 'https://github.com/qvco/yay.js',
	});
};

main();