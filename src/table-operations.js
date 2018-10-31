import * as AWS from 'aws-sdk';

export default class Database {

  constructor(tableName) {
    AWS.config.update({
      region: 'us-east-1',
    });

    this.table = tableName;
    this.docClient = new AWS.DynamoDB.DocumentClient();
  }

  /**
   * Add new user id to master table of all subscribers
   * @param {int} userId 
   */
  addNewUser(userId) {
    const params = {
      TableName: this.table,
      Item: {
        user_id: userId,
        preferences: null
      },
    };
    
		this.docClient.put(params, (err, data) => {
      if (err) {
        console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
      }
    });
  }

	// TODO
	setUserSubscriptions(userId) {

	}

	// TODO
	setUserPreferences(userId) {

  }

  // TODO
  getUser(userId) {

  }

  /**
   * Return the current message state for this user.
   * @param {int} userId 
   */
  getUserFlowState(userId) {
    var params = {
      TableName : this.table,
      Key: {
        user_id: userId
      }
    };
    
    var response = this.docClient.get(params, function(err, data) {
      if (err) console.log(err);
      else console.log(data);
    });

    console.log("Response item from get: " + response);
  }

/**
 * Update the user's message state after their message is received and answered.
 * @param {int} userId 
 * @param {int} userState 
 */
  setUserFlowState(userId, userState) {     
    var params = {
            TableName:this.table,
            Key: {
                user_id : userId
            },
            UpdateExpression: "set message_state = :userState",
            ExpressionAttributeValues:{
                ":userState":userState
            },
            ReturnValues:"UPDATED_NEW"
        };
     
    this.docClient.update(params,callback);
  }
}