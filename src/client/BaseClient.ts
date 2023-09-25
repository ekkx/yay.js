import { RequestMethod } from '../util/Types';
import { AuthenticationError } from '../lib/Errors';

import { REST } from '../lib/Rest';

const rest = new REST({});

async function getTimeline() {
	try {
		const response = await rest.request({ method: RequestMethod.GET, route: 'v2/posts/timeline', requireAuth: false, params: { number: 5 }});
		console.log(response.posts[0].text);
	} catch (error) {
		if (error instanceof AuthenticationError) {
			console.log(error.response.error_code);
		}
	}
}

getTimeline();
