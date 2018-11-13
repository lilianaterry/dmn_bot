import * as AWS from 'aws-sdk';

export default class Database {
  table: any;
  docClient: any;

  constructor(tableName: string) {
    AWS.config.update({
      region: 'us-east-1',
    });

    this.table = tableName;
    this.docClient = new AWS.DynamoDB.DocumentClient();
  }

  /**
   * Add new user id to master table of all subscribers
   * @param {number} userId
   */
  addNewUser(userId: number) {
    const params = {
      TableName: this.table,
      Item: {
        user_id: userId,
        type_preferences: {
          kickoff: true,
          midGame: true,
          weeklyStandings: true,
          sportsDayHSNews: true,
        },
        freq_preferences: {
          everyScore: false,
          everyTD: false,
          everyQTR: true,
        },
        teams: [],
      },
    };

    this.docClient.put(params, (err) => {
      if (err) {
        console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
      }
    });
  }

  // TODO: Remove user

  // // TODO
  // setUserSubscriptions(userId) {

  // }

  // // TODO
  // setUserPreferences(userId) {

  // }

  // TODO
  getUser(userId) {
    const params = {
      TableName: this.table,
      Key: {
        user_id: userId,
      },
    };

    const user = this.docClient.get(params, (err, data) => {
      if (err) console.log(err);
      else console.log(data);
    });
    console.log(`***USER: ${user}`);
    return user;
  }
}
