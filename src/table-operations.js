import * as AWS from 'aws-sdk';

export default class Database {

  constructor(tableName) {
    AWS.config.update({
      region: 'us-east-1',
    });

    this.table = tableName;
    this.docClient = new AWS.DynamoDB.DocumentClient();
  }

	// add new user id to general list of all subscribers
  addNewUser(userId) {
    const params = {
      TableName: this.table,
      Item: {
        user_id: userId,
        preferences: null,
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

  // TODO
  getUserFlowState(userId) {

  }

  // TODO
  setUserFlowState(userId, userState) {
    
  }
}
