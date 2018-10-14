"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Database = void 0;

var AWS = _interopRequireWildcard(require("aws-sdk"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Database {
  constructor(tableName) {
    AWS.config.update({
      region: "us-east-1"
    });
    this.table = tableName;
    this.docClient = new AWS.DynamoDB.DocumentClient();
  }

  addUser(user_id) {
    var params = {
      TableName: this.table,
      Item: {
        "user_id": user_id,
        "preferences": null
      }
    };
    console.log("Adding a new user...");
    this.docClient.put(params, function (err, data) {
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
      }
    });
  }

}

exports.Database = Database;