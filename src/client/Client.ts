import { AIPacaApi } from '../lib/AIPaca';
import { BlockApi } from '../lib/Block';
import { CallApi } from '../lib/Call';
import { CassandraApi } from '../lib/Cassandra';
import { ChatApi } from '../lib/Chat';
import { ConfigApi } from '../lib/Config';
import { GameApi } from '../lib/Game';
import { GiftApi } from '../lib/Gift';
import { GroupApi } from '../lib/Group';
import { HiddenApi } from '../lib/Hidden';
import { LoginApi } from '../lib/Login';
import { MiscApi } from '../lib/Misc';
import { MuteKeywordApi } from '../lib/MuteKeyword';
import { PostApi } from '../lib/Post';
import { ReviewApi } from '../lib/Review';
import { ThreadApi } from '../lib/Thread';
import { UserApi } from '../lib/User';

import { BaseClient } from './BaseClient';
import { ClientOptions } from 'util/Types';

export class Client extends BaseClient {
	public readonly AIPaca: AIPacaApi;
	public readonly block: BlockApi;
	public readonly call: CallApi;
	public readonly cassandra: CassandraApi;
	public readonly chat: ChatApi;
	public readonly config: ConfigApi;
	public readonly game: GameApi;
	public readonly gift: GiftApi;
	public readonly group: GroupApi;
	public readonly hidden: HiddenApi;
	public readonly login: LoginApi;
	public readonly misc: MiscApi;
	public readonly muteKeyword: MuteKeywordApi;
	public readonly post: PostApi;
	public readonly review: ReviewApi;
	public readonly thread: ThreadApi;
	public readonly user: UserApi;

	public constructor(options: ClientOptions) {
		super();
		this.AIPaca = new AIPacaApi(this.rest);
		this.block = new BlockApi(this.rest);
		this.call = new CallApi(this.rest);
		this.cassandra = new CassandraApi(this.rest);
		this.chat = new ChatApi(this.rest);
		this.config = new ConfigApi(this.rest);
		this.game = new GameApi(this.rest);
		this.gift = new GiftApi(this.rest);
		this.group = new GroupApi(this.rest);
		this.hidden = new HiddenApi(this.rest);
		this.login = new LoginApi(this.rest);
		this.misc = new MiscApi(this.rest);
		this.muteKeyword = new MuteKeywordApi(this.rest);
		this.post = new PostApi(this.rest);
		this.review = new ReviewApi(this.rest);
		this.thread = new ThreadApi(this.rest);
		this.user = new UserApi(this.rest);
	}
}

// usage
const main = async () => {
	const client = new Client({
		email: 'your_email',
		password: 'your_password',
	});

	const bgms = await client.call.getBgms();
	console.log(bgms);
};

main();
