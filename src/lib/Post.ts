import { RequestMethod } from '../util/Types';
import { REST } from '../util/Rest';

export class PostApi {
	public constructor(private readonly rest: REST) {}

	addBookmark = async (userId: number, id: number): Promise<BookmarkPostResponse> => {
		return await this.rest.request({
			method: RequestMethod.PUT,
			route: `v1/users/${userId}/bookmarks/${id}`,
			requireAuth: true,
		});
	};
}
