"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var AWS = _interopRequireWildcard(require("aws-sdk"));

var _debug = _interopRequireDefault(require("debug"));

var _chalk = _interopRequireDefault(require("chalk"));

var _ = _interopRequireWildcard(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _teamplayer = require("./models/teamplayer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const log = (0, _debug.default)('database');

class Database {
  constructor() {
    _defineProperty(this, "docClient", void 0);

    AWS.config.update({
      region: 'us-east-1'
    });
    this.docClient = new AWS.DynamoDB.DocumentClient();
  }
  /**
   * Add new user id to master table of all subscribers
   * @param {string} userId
   */


  addNewUser(userId) {
    const getUserParams = {
      TableName: Database.USER_TABLE,
      Key: {
        user_id: userId
      }
    };
    this.docClient.get(getUserParams, (err, data) => {
      if (err) {
        log(_chalk.default.red('An error occurred in addNewUser'));
        log(err);
      } else if (_.isEmpty(data)) {
        // user not found
        const addUserParams = {
          TableName: Database.USER_TABLE,
          Item: {
            user_id: userId
          }
        };
        this.docClient.put(addUserParams, putErr => {
          if (putErr) {
            log(_chalk.default.red('Unable to add new user. Error JSON:', JSON.stringify(err, null, 2)));
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


  addNewSubscription(userId, teamId) {
    const params = {
      TableName: Database.SUBSCRIPTION_TABLE,
      Item: {
        subscription_id: (0, _v.default)(),
        team_id: teamId,
        user_id: userId,
        kickoff: true,
        everyScore: false,
        everyTD: false,
        everyQTR: false
      }
    };
    this.docClient.put(params, err => {
      if (err) {
        log(_chalk.default.red('Unable to add subscription. Error JSON:', JSON.stringify(err, null, 2)));
      }
    });
  }

  setPrefForAllTeams(userId, prefName, prefVal) {
    this.getSubscriptionsByUser(userId).then(teams => {
      teams.forEach(team => {
        this.setPreference(team.subscription_id, userId, team.team_id, prefName, prefVal);
      });
    }).catch(err => {
      log(_chalk.default.red('An error occured in setTypePrefForAllTeams'));
      log(err);
    });
  }

  setPreference(subscriptionId, userId, teamId, prefName, prefVal) {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.SUBSCRIPTION_TABLE,
        Key: {
          subscription_id: subscriptionId
        },
        UpdateExpression: 'set #type_pref = :prefVal',
        ConditionExpression: 'team_id = :teamId AND user_id = :userId',
        ExpressionAttributeNames: {
          '#type_pref': prefName
        },
        ExpressionAttributeValues: {
          ':userId': userId,
          ':teamId': teamId,
          ':prefVal': prefVal
        }
      };
      this.docClient.update(params, (err, data) => {
        if (err) {
          log(_chalk.default.red('Unable to add type preference. Error JSON:', JSON.stringify(err, null, 2)));
          reject();
        } else {
          log(`Data from update team preference:${JSON.stringify(data)}`);
          resolve();
        }
      });
    });
  }

  getSubscriptionsByUser(userId) {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.SUBSCRIPTION_TABLE,
        FilterExpression: 'user_id = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      };
      this.docClient.scan(params, (err, data) => {
        if (err) {
          log(_chalk.default.red('There was an error retrieving the user\'s teams from the database.'));
          log(err);
          reject(err);
        } else {
          log(`Successfully retrieved user ${userId}\'steams from database`);

          if (data.Items) {
            resolve(data.Items);
          } else {
            resolve([]);
          }
        }
      });
    });
  }

  getSingleTeamSubscription(userId, teamId) {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.SUBSCRIPTION_TABLE,
        FilterExpression: 'team_id = :teamId AND user_id = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
          ':teamId': teamId
        }
      };
      this.docClient.scan(params, (err, data) => {
        if (err) {
          log(_chalk.default.red('There was an error retrieving the singular subscription from the database.'));
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

  removeSubscription(userId, teamId) {
    const scanParams = {
      TableName: Database.SUBSCRIPTION_TABLE,
      FilterExpression: 'team_id = :teamId AND user_id = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
        ':teamId': teamId
      }
    };
    this.docClient.scan(scanParams, (err, data) => {
      if (err) {
        log("Unable to find item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        log("Found item succeeded:", JSON.stringify(data, null, 2));
        const deleteParams = {
          TableName: Database.SUBSCRIPTION_TABLE,
          Key: {
            subscription_id: data.Items[0].subscription_id
          }
        };
        this.docClient.delete(deleteParams, function (err, deletedData) {
          if (err) {
            log(`Failed to delete team ${data.Items[0].team_id}`);
          } else {
            log(`Successfully deleted team ${data.Items[0].team_id}`);
          }
        });
      }
    });
  }

  getTeamByName(teamName) {
    const lowerCaseName = teamName.toLowerCase();
    log(`Getting team ${teamName} from dynamo`);
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.TEAM_TABLE,
        FilterExpression: 'team_name = :teamName',
        ExpressionAttributeValues: {
          ':teamName': lowerCaseName
        }
      };
      this.docClient.scan(params, (err, data) => {
        if (err) {
          log(_chalk.default.red('There was an error retrieving the team from the database.'));
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

  getTeamById(teamId) {
    log(`Getting team id ${teamId} from dynamo`);
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.TEAM_TABLE,
        Key: {
          team_id: teamId
        }
      };
      this.docClient.get(params, (err, data) => {
        if (err) {
          log(_chalk.default.red(`There was an error retrieving team ${teamId} from the database.`));
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

  addTeam(teamId, teamName) {
    log(`Adding team ${teamName} to database.`);
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.TEAM_TABLE,
        Item: {
          team_id: teamId,
          team_name: teamName.toLowerCase(),
          display_name: teamName
        }
      };
      this.docClient.put(params, err => {
        if (err) {
          log(_chalk.default.red('There was an error adding the team to the database.'));
          log(err);
          reject(err);
        } else {
          log('Successfully added team to database.');
          resolve();
        }
      });
    });
  }

  getSubscriptionsByTeam(teamId) {
    log(`Getting subscriptions for team: ${teamId}`);
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.SUBSCRIPTION_TABLE,
        FilterExpression: 'team_id = :teamId',
        ExpressionAttributeValues: {
          ':teamId': teamId
        }
      };
      this.docClient.scan(params, (err, data) => {
        if (err) {
          log(_chalk.default.red('There was an error retrieving the team\'s subscriptions from the database.'));
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

  getGame(gameId) {
    log(`Getting game ${gameId} from dynamo.`);
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.GAME_TABLE,
        Key: {
          game_id: gameId
        }
      };
      this.docClient.get(params, (err, data) => {
        if (err) {
          log(_chalk.default.red('There was an error retrieving the game from the database.'));
          log(err);
          reject(err);
        } else {
          log('Successfully retrieved game from database.'); // log('%O', data);

          if (data.Item) {
            resolve(data.Item);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  addGame(game) {
    log(`Adding game ${game.gameInfo.GameID} to database.`);
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.GAME_TABLE,
        Item: {
          game_id: game.gameInfo.GameID,
          expires_at: (0, _moment.default)().add(1, 'w').unix(),
          home_score: 0,
          away_score: 0,
          ..._.pickBy(game.gameInfo, v => !_.isEmpty(v))
        }
      };
      this.docClient.put(params, (err, data) => {
        if (err) {
          log(_chalk.default.red('There was an error putting the game in the database.'));
          log(err);
          reject(err);
        } else {
          log('Successfully added game to database.');
          resolve(data);
        }
      });
    });
  }

  getUserNotifications(userId, teamId) {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.SUBSCRIPTION_TABLE,
        FilterExpression: 'team_id = :teamId AND user_id = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
          ':teamId': teamId
        }
      };
      this.docClient.scan(params, (err, data) => {
        if (err) {
          log(_chalk.default.red('There was an error retrieving the user\'s preferences from the database.'));
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

  updateGame(gameId, homeScore, awayScore, timeModified) {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: Database.GAME_TABLE,
        Key: {
          game_id: gameId
        },
        UpdateExpression: 'set home_score = :homeScore, away_score = :awayScore, GameStatsDateTimeModified = :updateTime',
        ExpressionAttributeValues: {
          ':homeScore': homeScore,
          ':awayScore': awayScore,
          ':updateTime': timeModified
        }
      };
      this.docClient.update(params, err => {
        if (err) {
          log(_chalk.default.red('Unable to update game information'));
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

}

exports.default = Database;

_defineProperty(Database, "USER_TABLE", 'dmn_users');

_defineProperty(Database, "GAME_TABLE", 'dmn_games');

_defineProperty(Database, "TEAM_TABLE", 'dmn_teams');

_defineProperty(Database, "SUBSCRIPTION_TABLE", 'dmn_subscriptions');