import { BaseClient } from '../client/BaseClient';
import { BookmarkPostResponse } from 'util/Responses';
import { RequestMethod } from '../util/Types';

export class PostAPI {
	public constructor(private readonly base: BaseClient) {}

	addBookmark = async (userId: number, id: number): Promise<BookmarkPostResponse> => {
		return await this.base.request({
			method: RequestMethod.PUT,
			route: `v1/users/${userId}/bookmarks/${id}`,
			requireAuth: true,
		});
	};
}
