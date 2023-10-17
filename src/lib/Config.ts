import { HttpMethod } from '../util/Types';
import { BaseClient } from '../client/BaseClient';
import { ApplicationConfigResponse, BanWordsResponse, PopularWordsResponse } from '../util/Responses';
import { BASE_CONFIG_URL } from '../util/Constants';

export class ConfigAPI {
	public constructor(private readonly base: BaseClient) {}

	public getAppConfig = async (): Promise<ApplicationConfigResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			baseURL: BASE_CONFIG_URL,
			route: `api/apps/yay`,
			requireAuth: false,
		});
	};

	public getBanWords = async (options: { countryApiValue: string }): Promise<BanWordsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			baseURL: BASE_CONFIG_URL,
			route: `${options.countryApiValue}/api/v2/banned_words`,
			requireAuth: false,
		});
	};

	public getPopularWords = async (options: { countryApiValue: string }): Promise<PopularWordsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			baseURL: BASE_CONFIG_URL,
			route: `${options.countryApiValue}/api/apps/yay/popular_words`,
			requireAuth: false,
		});
	};
}
