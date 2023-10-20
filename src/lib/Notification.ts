import { HttpMethod } from '../util/Types';
import { BaseClient } from '../client/BaseClient';
import { ActivitiesResponse } from '../util/Responses';
import { BASE_CASSANDRA_URL } from '../util/Constants';

/**
 * 通知API
 *
 * @remarks
 * 通知APIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class NotificationAPI {
	public constructor(private readonly base: BaseClient) {}

	public getUserActivities = async (options: {
		important?: boolean;
		fromTimestamp?: number;
		number?: number;
	}): Promise<ActivitiesResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `api/user_activities`,
			params: { important: options.important, from_timestamp: options.fromTimestamp, number: options.number },
			baseURL: BASE_CASSANDRA_URL,
			requireAuth: false,
		});
	};

	public getUserMergedActivities = async (options: { fromTimestamp?: number }): Promise<ActivitiesResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `api/v2/user_activities`,
			params: { from_timestamp: options.fromTimestamp },
			baseURL: BASE_CASSANDRA_URL,
			requireAuth: false,
		});
	};

	public receivedNotification = async (options: {
		pid: string;
		type: string;
		openedAt?: number;
	}): Promise<ActivitiesResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `api/received_push_notifications`,
			json: {
				pid: options.pid,
				type: options.type,
				opened_at: options.openedAt,
			},
			baseURL: BASE_CASSANDRA_URL,
			requireAuth: false,
		});
	};
}
