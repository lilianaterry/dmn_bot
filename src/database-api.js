import * as AWS from 'aws-sdk';
import debug from 'debug';
import chalk from 'chalk';
import * as _ from 'lodash';
import moment from 'moment';
import { GameData } from './models/teamplayer';

const log = debug('database');

export default class Database {
  docClient: any;

  static USER_TABLE = 'dmn_users';
  static GAME_TABLE = 'dmn_games';
  static TEAM_TABLE = 'dmn_teams';
  static SUBSCRIPTION_TABLE = 'dmn_subscriptions';

  constructor() {
    AWS.config.update({
      region: 'us-east-1',
    });

    this.docClient = new AWS.DynamoDB.DocumentClient();
  }

  /**
   * Returns parameters needs to retrive user from data base
   */
  getUserParams(userId: string) {
    const params = {
      TableName: Database.USER_TABLE,
      Key: {
        user_id: userId,
      },
    };

    return params;
  }

  /**
   * Returns parameters needed to add user to database 
   */
  addUserParams(userId: string) {
    const params = {
      TableName: Database.USER_TABLE,
      Item: {
        user_id: userId,
      },
    };

    return params;
  }

  /**
   * Add new user id to master table of all subscribers
   * @param {string} userId
   */
  addNewUser(userId: string) {
    const getUserParams = this.getUserParams(userId);

    this.docClient.get(getUserParams, (err, data) => {
      if (err) {
        log(chalk.red(`An error occured in addNewUser`));
        log(err);
      } else if (_.isEmpty(data)) {
        // user not found
        const addUserParams = this.addUserParams(userId);

        this.docClient.put(addUserParams, (err) => {
          if (err) {
            log(chalk.red('Unable to add new user. Error JSON:', JSON.stringify(err, null, 2)));
          }
        });
      }
    });
  }

  /**
   * Add an entry with userId and teamId and preferences.
   * @param {string} userId
   * @param {string} teamId
   */
  addNewSubscription(userId: string, teamId: string) {
    const params = {
      TableName: Database.SUBSCRIPTION_TABLE,
      Item: {
        team_id: teamId,
        user_id: userId,
        kickoff: true, 
        everyScore: false,
        everyTD: false,
        everyQTR: false
      },
    };

    this.docClient.put(params, (err) => {
      if (err) {
        log(chalk.red('Unable to add subscription. Error JSON:', JSON.stringify(err, null, 2)));
      }
    });
  }

  setPrefForAllTeams(userId: string, prefName: string, prefVal: bool) {
    this.getTeamsByUser(userId).then((teams) => {
      teams.forEach(team => {
        this.setPreference(userId, team.team_id, prefName, prefVal);
      });
    })
    .catch((err) => {
      log(chalk.red(`An error occured in setTypePrefForAllTeams`));
      log(err);
    });
  }

  setPreference(userId: string, teamId: string, prefName: string, prefVal: bool) {
    var params = {
      TableName: Database.SUBSCRIPTION_TABLE,
      Key: {
        team_id: teamId
      },
      UpdateExpression: 'set #type_pref = :prefVal',
      ConditionExpression: '#user_id = :userId',
      ExpressionAttributeNames: {
        '#type_pref' : prefName,
        '#user_id' : 'user_id'
      },
      ExpressionAttributeValues: {
        ':userId' : userId,
        ':prefVal' : prefVal,
      },
    };
        
    this.docClient.update(params, function(err, data) {
       if (err) log(chalk.red('Unable to add type preference. Error JSON:', JSON.stringify(err, null, 2)));
       else {
         log(`Data from update:` + JSON.stringify(data))
       }
    });
  }

  getTeamsByUser(userId: string): Promise<any> {
    return new Promise ((resolve, reject) => {
      const params = {
        TableName: Database.SUBSCRIPTION_TABLE,
        FilterExpression: 'user_id = :userId',
        ExpressionAttributeValues: { ':userId': userId },
      };

      this.docClient.scan(params, (err, data) => {
        if (err) {
          log(chalk.red('There was an error retrieving the user\'s teams from the database.'));
          log(err);
          reject(err);
        } else {
          log(`Successfully retrieved team from database`);
          if (data.Items) {
            resolve(data.Items);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
 
  getTeamByName(teamName: string): Promise<any> {
    let lowerCaseName = teamName.toLowerCase();
    log (`Getting team ${teamName} from dynamo`);
    return new Promise ((resolve, reject) => {
      const params = {
        TableName: Database.TEAM_TABLE,
        FilterExpression: 'team_name = :teamName',
        ExpressionAttributeValues: { ':teamName': lowerCaseName },
      };

      this.docClient.scan(params, (err, data) => {
        if (err) {
          log(chalk.red('There was an error retrieving the team from the database.'));
          log(err);
          reject(err);
        } else {
          log(`Successfully retrieved team from database`);
          if (data.Items) {
            resolve(data.Items[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  getGame(gameId: string): Promise<any> {
    log(`Getting game ${gameId} from dynamo.`);
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.GAME_TABLE,
        Key: {
          game_id: gameId,
        },
      };
      this.docClient.get(params, (err, data) => {
        if (err) {
          log(chalk.red('There was an error retrieving the game from the database.'));
          log(err);
          reject(err);
        } else {
          log('Successfully retrieved game from database.');
          // log('%O', data);
          if (data.Item) {
            resolve(data.Item);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  addGame(game: GameData) {
    log(`Adding game ${game.gameInfo.GameID} to database.`);
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.GAME_TABLE,
        Item: {
          game_id: game.gameInfo.GameID,
          expires_at: moment().add(1, 'w').unix(),
          ..._.pickBy(game.gameInfo, (v: any) => !_.isEmpty(v)),
        },
      };

      this.docClient.put(params, (err, data) => {
        if (err) {
          log(chalk.red('There was an error putting the game in the database.'));
          log(err);
          reject(err);
        } else {
          log('Successfully added game to database.');
          resolve(data);
        }
      });
    });
  }
}
