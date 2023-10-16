<div align="center">
    <br />
    <p>
        <a href="https://github.com/qvco/yay.js"><img src="https://github.com/qvco/yay.js/raw/master/.github/logo-black.svg" width="546" alt="yay.js" /></a>
    </p>
    <br />
    <p>
		<a href="https://discord.gg/Y8f2K74URa"><img src="https://img.shields.io/discord/1113275904605552682?color=5865F2&logo=discord&logoColor=white" alt="Discord server" /></a>
		<a href="https://www.npmjs.com/package/yay.js"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="license" /></a>
		<a href="https://www.npmjs.com/package/yay.js"><img src="https://img.shields.io/npm/v/yay.js.svg?maxAge=3600" alt="npm version" /></a>
		<a href="https://www.npmjs.com/package/yay.js"><img src="https://img.shields.io/npm/dt/yay.js.svg?maxAge=3600" alt="npm downloads" /></a>
	</p>
    <p>
        <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" height=26px>
        <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height=26px>
    </p>
</div>

## About

同世代と趣味の通話コミュニティ - [Yay!（イェイ）](https://yay.space/)の API を簡単に扱える [Node.js](https://nodejs.org/ja) モジュールです。

- オブジェクト指向
- 非同期処理に対応
- 認証情報を暗号化

## Installation

**Node.js 16.17.0 以上のバージョンが必要です。**

```bash
npm install yay.js
```

## Example usage

yay.js をインストール:

```bash
npm install yay.js
```

通常の API にアクセスする場合:

```javascript
import { Client } from 'yay.js';

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
```

WebSocket を使用する場合:

```javascript
import { Client, GatewayIntents } from 'yay.js';
const client = new Client({ intents: [GatewayIntents.ChatMessage] });

client.on('ready', () => {
  console.log('The bot is ready!');
});

client.on('messageCreate', async (message) => {
  if (message.text === 'ping') {
    await client.reply({
      text: 'pong',
      messageId: message.id,
      chatRoomId: message.roomId,
    });
  }
});

client.login({
  email: 'yourEmail',
  password: 'yourPassword',
});
```

## Links

- [Documentation](https:github.com/qvco/yay.js)
- [GitHub](https:github.com/qvco/yay.js)
- [npm](https://www.npmjs.com/package/yay.js)
- [Discord Server](https://discord.gg/Y8f2K74URa)

## Contributing

現在開発中です。  
以下のアイコンをクリックして参加！

<a target="_blank" href="https://discord.gg/Y8f2K74URa"><img src="https://img.icons8.com/doodle/48/discord--v2.png" width="40px"></a>

## Help

もしドキュメントを読んでもわからないことがあったり、なかなか解決しない問題があった場合は、遠慮なく yay.js の公式 [Discord サーバー](https://discord.gg/Y8f2K74URa)に参加してください！
