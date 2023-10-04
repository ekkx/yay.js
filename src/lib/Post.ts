import { BaseClient } from '../client/BaseClient';
import { BookmarkPostResponse } from 'util/Responses';
import { RequestMethod } from '../util/Types';

export class PostAPI {
	public constructor(private readonly base: BaseClient) {}

	public addBookmark = async (userId: number, id: number): Promise<BookmarkPostResponse> => {
		return await this.base.request({
			method: RequestMethod.PUT,
			route: `v1/users/${userId}/bookmarks/${id}`,
			requireAuth: true,
		});
	};

	public addGroupHighlightPost = async (groupId: number, postId: number): Promise<BookmarkPostResponse> => {
		return await this.base.request({
			method: RequestMethod.PUT,
			route: `v1/groups/${groupId}/highlights/${postId}`,
			requireAuth: false,
		});
	};

	public createGroupCallPost = async (): Promise<BookmarkPostResponse> => {
		return await this.base.request({
			method: RequestMethod.POST,
			route: `v2/posts/new_conference_call`,
			requireAuth: false,
			json: {},
		});
	};
}
