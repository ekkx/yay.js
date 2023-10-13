import EventEmitter from 'node:events';
import WebSocket from 'ws';
import { VERSION_NAME, WEB_SOCKET_URL } from './Constants';
import { Events } from './Events';
import { BaseClient } from '../client/BaseClient';
import { ChannelCommand, ChannelMessage, GatewayIntents, Identifier } from './Types';

export class WebSocketInteractor extends EventEmitter {
	private base: BaseClient;
	private ws: WebSocket | undefined;

	public constructor(base: BaseClient) {
		super();

		this.base = base;
		this.ws = undefined;
	}

	public async connect(wsToken: string) {
		this.ws = new WebSocket(`${WEB_SOCKET_URL}?token=${wsToken}&app_version=${VERSION_NAME}`);

		this.ws.on('message', (message: string) => {
			const eventMessage: ChannelMessage = JSON.parse(message);

			if (eventMessage.type === 'ping') return;

			if (eventMessage.type === 'welcome') {
				return this.base.emit(Events.ClientReady, eventMessage.sid);
			}

			if (eventMessage.type === 'confirm_subscription') {
				if (eventMessage.identifier) {
					const identifier: Identifier = JSON.parse(eventMessage.identifier);
					return this.base.logger.debug(`Connected to Gateway (${identifier.channel})`);
				}
			}

			const content = eventMessage.message;

			if (content) {
				if (eventMessage.identifier && content.event) {
					const identifier: Identifier = JSON.parse(eventMessage.identifier);

					switch (identifier.channel) {
						case GatewayIntents.ChatMessage:
							switch (content.event) {
								case 'new_message':
									this.base.emit(Events.MessageCreate, content.message);
									break;
								case 'chat_deleted':
									this.base.emit(Events.ChatRoomDelete, content.data?.room_id);
									break;
								case 'total_chat_request':
									this.base.emit(Events.ChatRequest, content.data?.total_count);
									break;
							}
							break;
						case GatewayIntents.GroupUpdates:
							if (content.event === 'new_post') {
								this.base.emit(Events.GroupUpdate, content.data?.group_id);
							}
							break;
					}
				}
			}
		});

		this.ws.on('close', (code, reason) => {
			if (reason.toString().toLowerCase() === 'auth failed') {
				this.base.emit(Events.WebSocketTokenExpiredError);
			}
			this.base.logger.debug(`WebSocket closed with code: ${code}`);
			this.base.logger.debug(`Reason: ${reason.toString()}`);
		});
	}

	public async subscribe(intent: string) {
		if (!this.ws) return;
		const channelJSON: ChannelCommand = {
			command: 'subscribe',
			identifier: JSON.stringify({ channel: intent }),
		};
		this.ws.send(JSON.stringify(channelJSON));
	}

	public async unsubscribe(intent: string) {
		if (!this.ws) return;
		const channelJSON: ChannelCommand = {
			command: 'unsubscribe',
			identifier: JSON.stringify({ channel: intent }),
		};
		this.ws.send(JSON.stringify(channelJSON));
	}
}
