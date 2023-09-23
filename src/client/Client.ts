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

import { REST } from '../util/Rest';

export class Client {
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

  public constructor(public readonly rest: REST) {
    this.AIPaca = new AIPacaApi(rest);
    this.block = new BlockApi(rest);
    this.call = new CallApi(rest);
    this.cassandra = new CassandraApi(rest);
    this.chat = new ChatApi(rest);
    this.config = new ConfigApi(rest);
    this.game = new GameApi(rest);
    this.gift = new GiftApi(rest);
    this.group = new GroupApi(rest);
    this.hidden = new HiddenApi(rest);
    this.login = new LoginApi(rest);
    this.misc = new MiscApi(rest);
    this.muteKeyword = new MuteKeywordApi(rest);
    this.post = new PostApi(rest);
    this.review = new ReviewApi(rest);
    this.thread = new ThreadApi(rest);
    this.user = new UserApi(rest);
  }
}
