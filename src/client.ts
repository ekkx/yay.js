import { AIPacaApi } from './lib/AIPaca';
import { BlockApi } from './lib/block';
import { CallApi } from './lib/call';
import { CassandraApi } from './lib/cassandra';
import { ChatApi } from './lib/chat';
import { ConfigApi } from './lib/config';
import { GameApi } from './lib/game';
import { GiftApi } from './lib/gift';
import { GroupApi } from './lib/group';
import { HiddenApi } from './lib/hidden';
import { LoginApi } from './lib/login';
import { MiscApi } from './lib/misc';
import { MuteKeywordApi } from './lib/muteKeyword';
import { PostApi } from './lib/post';
import { ReviewApi } from './lib/review';
import { ThreadApi } from './lib/thread';
import { UserApi } from './lib/user';

import { REST } from './rest';

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
