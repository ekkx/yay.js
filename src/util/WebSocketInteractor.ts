import WebSocket from 'ws';
import { VERSION_NAME, WEB_SOCKET_URL } from './Constants';
import { BaseClient } from '../client/BaseClient';

export class WebSocketInteractor {
	private base: BaseClient;
	private ws: WebSocket | undefined;

	public constructor(base: BaseClient) {
		this.base = base;
		this.ws = undefined;
	}

	public async connect(wsToken: string) {
		this.ws = new WebSocket(`${WEB_SOCKET_URL}?token=${wsToken}&app_version=${VERSION_NAME}`);

		this.ws.on('open', () => {
			console.log('Connected to gateway.');
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
			identifier: intent,
		};
		this.ws.send(JSON.stringify(channelJSON));
	}

	public async unsubscribe(intent: string) {
		if (!this.ws) return;

		const channelJSON = {
			command: 'unsubscribe',
			identifier: intent,
		};
		this.ws.send(JSON.stringify(channelJSON));
	}
}
