import { Database } from './table_operations';

export class Commands {
	constructor() {
		// TODO
	}

	static startConversation(user_id: string) {
		// save user to dynamo table
		// prompt them for subscription suggestions
		// ask about frequency
		// save responses with id in dynamo table 
		console.log("start conversation!");
		var users = new Database("dmn_users");
		users.addUser(user_id);
	}

	static endConversation(user_id: string) {
		// reprompt to make sure they wish to leave
		// remove all entries from dynamo table
		// send goodbye message
	}
}

