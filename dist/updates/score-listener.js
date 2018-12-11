"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkForUpdates;

var _moment = _interopRequireDefault(require("moment"));

var _debug = _interopRequireDefault(require("debug"));

var _chalk = _interopRequireDefault(require("chalk"));

var _ = _interopRequireWildcard(require("lodash"));

var TeamPlayer = _interopRequireWildcard(require("../gateways/teamplayer"));

var _databaseApi = _interopRequireDefault(require("../database-api"));

var _teamplayer2 = require("../models/teamplayer");

var _scoreParser = require("./score-parser");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _debug.default)('scorelistener');

function logGame(gameId, message, ...args) {
  log(_chalk.default`{cyan GAME ${gameId}:} ${message}`, ...args);
}

function compareUpdate(storedData, updateData, db) {
  logGame(storedData.GameID, 'Comparing update data to database values.'); // log('%O', updateData);

  if (updateData.data.gameData.GameStatsDateTimeModified === storedData.GameStatsDateTimeModified) {
    logGame(storedData.GameID, 'No update has occured for game.');
  } else {
    logGame(storedData.GameID, 'Updated data has been found.');
    const lastPlay = updateData.getLastScoringPlay();

    if (lastPlay) {
      // Check to see if the score has updated since the data changed.
      let scoreChanged;

      if (storedData.home_score !== lastPlay.possession.HomeScoreCurr || storedData.away_score !== lastPlay.possession.AwayScoreCurr) {
        // Score has changed, check to see if we should wait for PAT
        const lastRecord = lastPlay.possession.Records[_.last(_.keys(lastPlay.possession.Records))];

        if ((parseInt(lastPlay.possession.HomeScoreCurr, 10) - parseInt(lastPlay.possession.HomeScorePrev, 10) === 6 || parseInt(lastPlay.possession.HomeScoreCurr, 10) - parseInt(lastPlay.possession.HomeScorePrev, 10) === 6) && !lastRecord.SummaryDescription.includes('PAT')) {
          logGame(storedData.GameID, `The score of the game has changed. Previously ${storedData.home_score}-${storedData.away_score}. Now ${lastPlay.possession.HomeScoreCurr}-${lastPlay.possession.AwayScoreCurr}. Waiting to send notifications for the PAT.`);
          scoreChanged = false;
        } else {
          logGame(storedData.GameID, `The score of the game has changed. Previously ${storedData.home_score}-${storedData.away_score}. Now ${lastPlay.possession.HomeScoreCurr}-${lastPlay.possession.AwayScoreCurr}`);
          scoreChanged = true;
        }
      } else {
        scoreChanged = false;
        logGame(storedData.GameID, 'The game has been updated but the score has not changed.');
      }

      db.updateGame(updateData.data.gameData.GameID, lastPlay.possession.HomeScoreCurr, lastPlay.possession.AwayScoreCurr, updateData.data.gameData.GameStatsDateTimeModified).then(() => {
        logGame(storedData.GameID, 'Game update has been saved in database.');

        if (scoreChanged) {
          logGame(storedData.GameID, 'Sending score updates to subscribed users.');
          (0, _scoreParser.sendScoreUpdate)({
            id: storedData.GameHomeTeamID,
            name: storedData.homeTeamName,
            score: lastPlay.possession.HomeScoreCurr
          }, {
            id: storedData.GameAwayTeamID,
            name: storedData.awayTeamName,
            score: lastPlay.possession.AwayScoreCurr
          }, lastPlay.quarter, lastPlay.possession);
        }
      });
    } else {
      logGame(storedData.GameID, 'No last play found.');
    }
  }
}

function checkForUpdates() {
  log('Checking for score updates now');
  TeamPlayer.getInProgressGames((0, _moment.default)()).then(games => {
    log('%d %s currently in progress: %o', games.length, games.length === 1 ? 'game' : 'games', games);
    games.forEach(game => {
      logGame(game, 'Checking if game exists in database.');
      const db = new _databaseApi.default();
      db.getGame(game).then(dbResponse => {
        if (_.isEmpty(dbResponse)) {
          logGame(game, 'The game was not found, fetching full game data.');
          TeamPlayer.getGameData(game).then(gameData => {
            logGame(game, 'Retrieved game data from teamplayer, adding to database.');
            db.addGame(gameData).then(() => {
              (0, _scoreParser.sendPregameMessages)(gameData);
            }); // Remove when all teams are present.

            logGame(game, 'Checking to see if home team is in database.');
            db.getTeamById(gameData.home.team.TeamID).catch(() => {
              logGame(game, 'Home team was not in database, fetching from teamplayer');
              db.addTeam(gameData.home.team.TeamID, gameData.home.team.TeamName);
            });
            logGame(game, 'Checking to see if away team is in database.');
            db.getTeamById(gameData.away.team.TeamID).catch(() => {
              logGame(game, 'Away team was not in database, fetching from teamplayer');
              db.addTeam(gameData.away.team.TeamID, gameData.away.team.TeamName);
            });
          }).catch(err => {
            log(_chalk.default.red('There was an error retrieving the game data.'));
            log(_chalk.default.red(err));
          });
        } else {
          logGame(game, 'The game was found, getting score update.');
          TeamPlayer.getScoreUpdates(game).then(updateData => {
            logGame(game, 'Retrieved update from teamplayer.');
            compareUpdate(dbResponse, updateData, db);
          });
        }
      }).catch(() => {
        logGame(game, _chalk.default.red('There was an error getting the game, skipping.'));
      });
    });
  }).catch(err => {
    log('Something went wrong with the teamplayer call');
    log(err);
  });
}