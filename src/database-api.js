/* All CRUD operations needed for Dynamo tables */

import * as AWS from 'aws-sdk';
import debug from 'debug';
import chalk from 'chalk';
import * as _ from 'lodash';
import moment from 'moment';
import uuid from 'uuid/v4';
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
   * @param {string} userId
   */
  addNewUser(userId: string) {
    const getUserParams = {
      TableName: Database.USER_TABLE,
      Key: {
        user_id: userId,
      },
    };

    this.docClient.get(getUserParams, (err, data) => {
      if (err) {
        log(chalk.red('An error occurred in addNewUser'));
        log(err);
      } else if (_.isEmpty(data)) {
        // user not found
        const addUserParams = {
          TableName: Database.USER_TABLE,
          Item: {
            user_id: userId,
          },
        };

        this.docClient.put(addUserParams, (putErr) => {
          if (putErr) {
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
        subscription_id: uuid(),
        team_id: teamId,
        user_id: userId,
        kickoff: true,
        everyScore: false,
        everyTD: false,
        everyQTR: false,
      },
    };

    this.docClient.put(params, (err) => {
      if (err) {
        log(chalk.red('Unable to add subscription. Error JSON:', JSON.stringify(err, null, 2)));
      }
    });
  }

  setPrefForAllTeams(userId: string, prefName: string, prefVal: bool) {
    this.getSubscriptionsByUser(userId).then((teams) => {
      teams.forEach((team) => {
        this.setPreference(team.subscription_id, userId, team.team_id, prefName, prefVal);
      });
    }).catch((err) => {
      log(chalk.red('An error occured in setTypePrefForAllTeams'));
      log(err);
    });
  }

  setPreference(
    subscriptionId: string,
    userId: string,
    teamId: string,
    prefName: string,
    prefVal: bool,
  ) {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.SUBSCRIPTION_TABLE,
        Key: {
          subscription_id: subscriptionId,
        },
        UpdateExpression: 'set #type_pref = :prefVal',
        ConditionExpression: 'team_id = :teamId AND user_id = :userId',
        ExpressionAttributeNames: {
          '#type_pref': prefName,
        },
        ExpressionAttributeValues: {
          ':userId': userId,
          ':teamId': teamId,
          ':prefVal': prefVal,
        },
      };

      this.docClient.update(params, (err, data) => {
        if (err) {
          log(chalk.red('Unable to add type preference. Error JSON:', JSON.stringify(err, null, 2)));
          reject();
        } else {
          log(`Data from update team preference:${JSON.stringify(data)}`);
          resolve();
        }
      });
    });
  }

  getSubscriptionsByUser(userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
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
          log(`Successfully retrieved user ${userId}'s teams from database`);
          if (data.Items) {
            resolve(data.Items);
          } else {
            resolve([]);
          }
        }
      });
    });
  }

  getSingleTeamSubscription(userId: string, teamId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.SUBSCRIPTION_TABLE,
        FilterExpression: 'team_id = :teamId AND user_id = :userId',
        ExpressionAttributeValues: { ':userId': userId, ':teamId': teamId },
      };

      this.docClient.scan(params, (err, data) => {
        if (err) {
          log(chalk.red('There was an error retrieving the singular subscription from the database.'));
          log(err);
          reject(err);
        } else {
          log('Successfully retrieved subscription from database');
          if (data.Items) {
            resolve(data.Items[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  removeSubscription(userId: string, teamId: string) {
    const scanParams = {
      TableName: Database.SUBSCRIPTION_TABLE,
      FilterExpression: 'team_id = :teamId AND user_id = :userId',
      ExpressionAttributeValues: { ':userId': userId, ':teamId': teamId },
    };

    this.docClient.scan(scanParams, (err, data) => {
      if (err) {
        log('Unable to find item. Error JSON:', JSON.stringify(err, null, 2));
      } else {
        log('Found item succeeded:', JSON.stringify(data, null, 2));
        const deleteParams = {
          TableName: Database.SUBSCRIPTION_TABLE,
          Key: {
            subscription_id: data.Items[0].subscription_id,
          },
        };
        this.docClient.delete(deleteParams, () => {
          if (err) {
            log(`Failed to delete team ${data.Items[0].team_id}`);
          } else {
            log(`Successfully deleted team ${data.Items[0].team_id}`);
          }
        });
      }
    });
  }

  getTeamByName(teamName: string): Promise<any> {
    const lowerCaseName = teamName.toLowerCase();
    log(`Getting team ${teamName} from dynamo`);
    return new Promise((resolve, reject) => {
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
          log('Successfully retrieved team from database');
          if (data.Items) {
            resolve(data.Items[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  getTeamById(teamId: string): Promise<any> {
    log(`Getting team id ${teamId} from dynamo`);
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.TEAM_TABLE,
        Key: {
          team_id: teamId,
        },
      };

      this.docClient.get(params, (err, data) => {
        if (err) {
          log(chalk.red(`There was an error retrieving team ${teamId} from the database.`));
          log(err);
          reject(err);
        } else {
          log(`Successfully retrieved team ${teamId} from database`);
          if (data.Item) {
            resolve(data.Item);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  addTeam(teamId:string, teamName: string) {
    log(`Adding team ${teamName} to database.`);
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.TEAM_TABLE,
        Item: {
          team_id: teamId,
          team_name: teamName.toLowerCase(),
          display_name: teamName,
        },
      };

      this.docClient.put(params, (err) => {
        if (err) {
          log(chalk.red('There was an error adding the team to the database.'));
          log(err);
          reject(err);
        } else {
          log('Successfully added team to database.');
          resolve();
        }
      });
    });
  }

  getSubscriptionsByTeam(teamId: string): Promise<any> {
    log(`Getting subscriptions for team: ${teamId}`);
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.SUBSCRIPTION_TABLE,
        FilterExpression: 'team_id = :teamId',
        ExpressionAttributeValues: { ':teamId': teamId },
      };

      this.docClient.scan(params, (err, data) => {
        if (err) {
          log(chalk.red('There was an error retrieving the team\'s subscriptions from the database.'));
          log(err);
          reject(err);
        } else {
          log('Successfully retrieved subscriptions from database');
          if (data.Items) {
            resolve(data.Items);
          } else {
            resolve([]);
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
          home_score: 0,
          away_score: 0,
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

  getUserNotifications(userId: string, teamId: string) {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.SUBSCRIPTION_TABLE,
        FilterExpression: 'team_id = :teamId AND user_id = :userId',
        ExpressionAttributeValues: { ':userId': userId, ':teamId': teamId },
      };

      this.docClient.scan(params, (err, data) => {
        if (err) {
          log(chalk.red('There was an error retrieving the user\'s preferences from the database.'));
          log(err);
          reject(err);
        } else {
          log('Successfully retrieved user notifications from database');
          if (data.Items) {
            resolve(data.Items[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  updateGame(gameId: string, lastQuarter: string, lastPossession: string, lastModified: string) {
    log(`Updating game ${gameId} with quarter ${lastQuarter} and posession ${lastPossession}`);
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.GAME_TABLE,
        Key: {
          game_id: gameId,
        },
        UpdateExpression: 'set lastQuarter = :lastQuarter, lastPossession = :lastPossession, lastModified = :lastModified',
        ExpressionAttributeValues: {
          ':lastQuarter': lastQuarter,
          ':lastPossession': lastPossession,
          ':lastModified': lastModified,
        },
      };

      this.docClient.update(params, (err) => {
        if (err) {
          log(chalk.red('Unable to update game information'));
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
