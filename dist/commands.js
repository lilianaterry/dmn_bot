"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startConversation = startConversation;
exports.endConversation = endConversation;

var _tableOperations = _interopRequireDefault(require("./table-operations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startConversation(userId) {
  // save user to dynamo table
  // prompt them for subscription suggestions
  // ask about frequency
  // save responses with id in dynamo table
  console.log('start conversation!');
  const users = new _tableOperations.default('dmn_users');
  users.addUser(userId);
}

function endConversation(userId) {// reprompt to make sure they wish to leave
  // remove all entries from dynamo table
  // send goodbye message
}