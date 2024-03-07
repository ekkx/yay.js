import { BaseClient } from '../client/BaseClient';
import { ApplicationConfigResponse, BanWordsResponse, PopularWordsResponse } from '../util/Responses';
import { BASE_CONFIG_URL } from '../util/Constants';

/**
 * **設定API**
 *
 * @remarks
 * アプリの基本情報を取得するAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class ConfigAPI {
  public constructor(private readonly base: BaseClient) {}

  public getAppConfig = async (): Promise<ApplicationConfigResponse> => {
    return await this.base.request({
      method: 'GET',
      baseURL: BASE_CONFIG_URL,
      route: `api/apps/yay`,
      requireAuth: false,
    });
  };

  public getBanWords = async (options: { countryApiValue: string }): Promise<BanWordsResponse> => {
    return await this.base.request({
      method: 'GET',
      baseURL: BASE_CONFIG_URL,
      route: `${options.countryApiValue}/api/v2/banned_words`,
      requireAuth: false,
    });
  };

  public getPopularWords = async (options: { countryApiValue: string }): Promise<PopularWordsResponse> => {
    return await this.base.request({
      method: 'GET',
      baseURL: BASE_CONFIG_URL,
      route: `${options.countryApiValue}/api/apps/yay/popular_words`,
      requireAuth: false,
    });
  };
}
