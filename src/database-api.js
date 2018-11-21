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
   * Add new user id to master table of all subscribers
   * @param {number} userId
   */
  addNewUser(userId: string) {
    const params = {
      TableName: Database.USER_TABLE,
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
  addSubscription(userId: string, teamId: string, ) {

  }

  // // TODO
  // setUserPreferences(userId) {

  // }

  getUserParams(userId: string) {
    const params = {
      TableName: Database.USER_TABLE,
      Key: {
        user_id: userId,
      },
    };

    return params;
  }

  getAllTeamsParams() {
    const params = {
      TableName: Database.TEAM_TABLE,
      AttributesToGet: [
        'team_id',
        'team_name',
      ],
    };

    return params;
  }

  getTeamByName(teamName: string): Promise<any> {
    let lowerCaseName = teamName.toLowerCase();
    log (`Getting team ${teamName} from dyanmo`);
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

  // TODO get team by ID


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
      log('params: %O', params);
      this.docClient.put(params, (err, data) => {
        if (err) {
          log(chalk.red('There was an error putting the game in the database.'));
          log(err);
          reject(err);
        } else {
          log('Successfully added game to database.');
          // log('%O', data);
          resolve(data);
        }
      });
    });
  }
}
