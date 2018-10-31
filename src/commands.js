import Database from './table-operations';

export function startConversation(userId) {
  // save user to dynamo table
  // prompt them for subscription suggestions
  // ask about frequency
  // save responses with id in dynamo table
  const users = new Database('dmn_users');
  users.addNewUser(userId);
  users.setUserFlowState(userId, 0);
  // TODO: remove after testing
  users.getUserFlowState(userId);
}

export function endConversation(userId) {
  // reprompt to make sure they wish to leave
  // remove all entries from dynamo table
  // send goodbye message
}
