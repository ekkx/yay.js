import EventEmitter from 'node:events';
import WebSocket from 'ws';
import { VERSION_NAME, WEB_SOCKET_URL } from './Constants';
import { BaseClient } from '../client/BaseClient';

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

		this.ws.on('open', () => {
			this.base.emit('ready');
		});

		this.ws.on('message', (message: string) => {
			console.log(`Received message: ${message}`);
		});

		this.ws.on('close', () => {
			console.log('Disconnected.');
		});
	}

	public async subscribe(intent: string) {
		if (!this.ws) return;
		const channelJSON = {
			command: 'subscribe',
			identifier: JSON.stringify({ channel: intent }),
		};
		this.ws.send(JSON.stringify(channelJSON));
	}

	public async unsubscribe(intent: string) {
		if (!this.ws) return;
		const channelJSON = {
			command: 'unsubscribe',
			identifier: JSON.stringify({ channel: intent }),
		};
		this.ws.send(JSON.stringify(channelJSON));
	}
}
