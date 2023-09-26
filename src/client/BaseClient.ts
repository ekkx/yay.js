import { RequestMethod } from '../util/Types';
import { AuthenticationError } from '../lib/Errors';
import { DEFAULT_DEVICE } from '../util/Constants';

import { REST } from '../lib/Rest';

export class BaseClient {
	public rest: REST;

	public constructor() {
		this.rest = new REST({ device: DEFAULT_DEVICE });
	}
}
