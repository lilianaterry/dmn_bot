
import * as AWS from 'aws-sdk';
		
export class Database {
		
	table;
	docClient;	

    constructor(tableName: string) {
		AWS.config.update({
  			region: "us-east-1",
		});
		
		this.table = tableName;
		this.docClient = new AWS.DynamoDB.DocumentClient();
	}
	
	static addUser(user_id: string) {
    	var params = {
        	TableName:this.table,
            Item:{
            	"user_id": user_id,
                "preferences": null
            }
       	};
        console.log("Adding a new user...");
        docClient.put(params, function(err, data) {
        	if (err) {
        		console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        	} else {
            	console.log("Added item:", JSON.stringify(data, null, 2));
       		}
       	});
	}
}



