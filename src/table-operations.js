import * as AWS from 'aws-sdk';

export default class Database {
  table: string;

  docClient: any;

  constructor(tableName: string) {
    AWS.config.update({
      region: 'us-east-1',
    });

    this.table = tableName;
    this.docClient = new AWS.DynamoDB.DocumentClient();
  }

  addUser(userId: string) {
    const params = {
      TableName: this.table,
      Item: {
        userId,
        preferences: null,
      },
    };
    console.log('Adding a new user...');
    this.docClient.put(params, (err, data) => {
      if (err) {
        console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
      } else {
        console.log('Added item:', JSON.stringify(data, null, 2));
      }
    });
  }
}
