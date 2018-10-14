"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Commands = void 0;

var _table_operations = require("./table_operations");

class Commands {
  constructor() {// TODO
  }

  static startConversation(user_id) {
    // save user to dynamo table
    // prompt them for subscription suggestions
    // ask about frequency
    // save responses with id in dynamo table 
    console.log("start conversation!");
    var users = new _table_operations.Database("dmn_users");
    users.addUser(user_id);
  }

  static endConversation(user_id) {// reprompt to make sure they wish to leave
    // remove all entries from dynamo table
    // send goodbye message
  }

}

exports.Commands = Commands;