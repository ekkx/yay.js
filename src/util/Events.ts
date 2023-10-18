/**
 * リッスンイベント
 *
 * @remarks
 * WebSocket通信等でリッスンするイベントです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export const Events = {
	ChatRequest: 'chatRequest',
	ChatRoomDelete: 'chatRoomDelete',
	ClientReady: 'ready',
	MessageCreate: 'messageCreate',
	GroupUpdate: 'groupUpdate',
	WebSocketTokenExpire: 'webSocketTokenExpire',
};
