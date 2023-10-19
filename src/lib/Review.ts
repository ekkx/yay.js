import { HttpMethod } from '../util/Types';
import { BaseClient } from '../client/BaseClient';
import * as util from '../util/Utils';
import { API_KEY } from '../util/Constants';
import { ReviewsResponse } from 'util/Responses';

/**
 * レターAPI
 *
 * @remarks
 * レターAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class ReviewAPI {
	public constructor(private readonly base: BaseClient) {}

	public createReview = async (options: { userId: number; comment: string }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/users/reviews/${options.userId}`,
			json: { comment: options.comment },
			requireAuth: false,
		});
	};

	public deleteReviews = async (options: { reviewIds: number[] }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v1/users/reviews`,
			params: { 'review_ids[]': options.reviewIds },
			requireAuth: false,
		});
	};

	public getMyReviews = async (options: { fromId?: number } = {}): Promise<ReviewsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/users/reviews/mine`,
			params: { from_id: options.fromId },
			requireAuth: false,
		});
	};

	public getReviews = async (options: { userId: number; fromId?: number }): Promise<ReviewsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/users/reviews/${options.userId}`,
			params: { from_id: options.fromId },
			requireAuth: false,
		});
	};

	public pinReview = async (options: { reviewId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/pinned/reviews`,
			params: { id: options.reviewId },
			requireAuth: false,
		});
	};

	public unpinReview = async (options: { reviewId: number }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v1/pinned/reviews/${options.reviewId}`,
			params: { id: options.reviewId },
			requireAuth: false,
		});
	};
}
