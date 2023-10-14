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

	public connect(wsToken: string, intents: string[]): void {
		this.ws = new WebSocket(`${WEB_SOCKET_URL}?token=${wsToken}&app_version=${VERSION_NAME}`);

		this.ws.on('message', (message: string) => {
			const eventMessage: ChannelMessage = JSON.parse(message);

			if (eventMessage.type === 'ping') {
				return; // ignore ping events
			}

			if (eventMessage.type === 'welcome') {
				for (const intent of intents) {
					this.subscribe(intent);
				}
				this.base.emit(Events.ClientReady, eventMessage.sid);
				return;
			}

			if (eventMessage.type === 'confirm_subscription' && eventMessage.identifier) {
				const identifier: Identifier = JSON.parse(eventMessage.identifier);
				this.base.logger.debug(`Connected to Gateway -> [${identifier.channel}]`);
				return;
			}

			const content = eventMessage.message;

			if (content && eventMessage.identifier && content.event) {
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
		});

		this.ws.on('close', (code, reason) => {
			if (reason.toString().toLowerCase() === 'auth failed') {
				this.base.emit(Events.WebSocketTokenExpiredError);
			}
			this.base.logger.debug(`WebSocket closed with code: ${code}`);
			this.base.logger.debug(`Reason: ${reason.toString()}`);
		});

		this.ws.on('error', (error: Error) => {
			this.base.logger.error(`WebSocket Error: ${error.message}`);
		});
	}

	private sendChannelCommand(command: string, intent: string) {
		if (!this.ws) return;
		const channelJSON: ChannelCommand = {
			command,
			identifier: JSON.stringify({ channel: intent }),
		};
		this.ws.send(JSON.stringify(channelJSON));
	}

	public subscribe(intent: string): void {
		this.sendChannelCommand('subscribe', intent);
	}

	public unsubscribe(intent: string): void {
		this.sendChannelCommand('unsubscribe', intent);
	}
}
