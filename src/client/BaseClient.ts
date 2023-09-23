import { RequestMethod } from '../util/Types';
import { AuthenticationError } from '../util/Errors';

import { REST } from '../util/Rest';

const rest = new REST();

async function getTimeline() {
	try {
		const response = await rest.request(RequestMethod.GET, '/v2/posts/timeline', { number: 5 });
		console.log(response.posts[0].text);
	} catch (error) {
		if (error instanceof AuthenticationError) {
			console.log(error.response.error_code);
		}
	}
}

getTimeline();
