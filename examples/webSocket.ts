import { Client, GatewayIntents } from 'yay.js';

const client = new Client({
	// イベントを取得する範囲を指定
	intents: [
        GatewayIntents.ChatMessage,
        GatewayIntents.GroupUpdates
    ],
});

client.on('ready', () => {
	console.log('The bot is ready!');
});

// メッセージのイベントを取得
client.on('messageCreate', async (message) => {
	if (message.text === 'ping') {
		await client.reply({
			text: 'pong',
			messageId: message.id,
			chatRoomId: message.roomId,
		});
	}
});

// サークル更新のイベントを取得
client.on('groupUpdate', async (groupId) => {
	console.log(groupId);
});

client.login({
	email: 'yourEmail',
	password: 'yourPassword',
});
