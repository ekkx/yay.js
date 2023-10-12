import { WebSocketInteractor } from '../util/WebSocketInteractor';
import Client from './Client';

export class WebSocketClient extends WebSocketInteractor {
	private client: Client;
	private scope: Record<string, boolean>;

	public constructor(client: Client, scope: { chatRoom: boolean; groupUpdates: boolean; groupPosts: boolean }) {
		super();
		this.client = client;
		this.scope = scope;
	}
}
