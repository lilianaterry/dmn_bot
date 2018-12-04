import moment from 'moment';
import debug from 'debug';
import chalk from 'chalk';
import * as _ from 'lodash';
import * as TeamPlayer from '../gateways/teamplayer';
import Database from '../database-api';
import { ScoreUpdate, GameData } from '../models/teamplayer';
import { sendPregameMessages, sendScoreUpdate } from './score-parser';

const log = debug('scorelistener');

function logGame(gameId, message, ...args) {
  log(chalk`{cyan GAME ${gameId}:} ${message}`, ...args);
}

function compareUpdate(storedData, updateData: ScoreUpdate, db: Database) {
  logGame(storedData.GameID, 'Comparing update data to database values.');
  // log('%O', updateData);
  if (updateData.data.gameData.GameStatsDateTimeModified
  === storedData.GameStatsDateTimeModified) {
    logGame(storedData.GameID, 'No update has occured for game.');
  } else {
    logGame(storedData.GameID, 'Updated data has been found.');
    const lastPlay = updateData.getLastPlay();
    if (lastPlay) {
      // Check to see if the score has updated since the data changed.
      let scoreChanged;
      if (storedData.home_score !== lastPlay.HomeScorePrev
        || storedData.away_score !== lastPlay.AwayScorePrev) {
        // Score has changed
        scoreChanged = true;
        logGame(storedData.GameID, `The score of the game has changed. Previously ${storedData.home_score}-${storedData.away_score}. Now ${lastPlay.HomeScorePrev}-${lastPlay.AwayScorePrev}`);
      } else {
        scoreChanged = false;
        logGame(storedData.GameID, 'The game has been updated but the score has not changed.');
      }
      db.updateGame(
        updateData.data.gameData.GameID,
        lastPlay.HomeScorePrev,
        lastPlay.AwayScorePrev,
        updateData.data.gameData.GameStatsDateTimeModified,
      ).then(() => {
        logGame(storedData.GameID, 'Game update has been saved in database.');
        if (scoreChanged) {
          logGame(storedData.GameID, 'Sending score updates to subscribed users.');
          sendScoreUpdate({
            id: storedData.GameHomeTeamID,
            name: storedData.homeTeamName,
            score: lastPlay.HomeScorePrev,
          }, {
            id: storedData.GameAwayTeamID,
            name: storedData.awayTeamName,
            score: lastPlay.AwayScorePrev,
          });
        }
      });
    } else {
      logGame(storedData.GameID, 'No last play found.');
    }
  }
}

export default function checkForUpdates() {
  log('Checking for score updates now');

  TeamPlayer.getInProgressGames(moment()).then((games) => {
    log('%d %s currently in progress: %o', games.length, games.length === 1 ? 'game' : 'games', games);

    games.forEach((game) => {
      logGame(game, 'Checking if game exists in database.');
      const db = new Database();

      db.getGame(game).then((dbResponse) => {
        if (_.isEmpty(dbResponse)) {
          logGame(game, 'The game was not found, fetching full game data.');
          TeamPlayer.getGameData(game).then((gameData: GameData) => {
            logGame(game, 'Retrieved game data from teamplayer, adding to database.');
            db.addGame(gameData).then(() => {
              sendPregameMessages(gameData);
            });


            // Remove when all teams are present.
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
          }).catch((err) => {
            log(chalk.red('There was an error retrieving the game data.'));
            log(chalk.red(err));
          });
        } else {
          logGame(game, 'The game was found, getting score update.');
          TeamPlayer.getScoreUpdates(game).then((updateData) => {
            logGame(game, 'Retrieved update from teamplayer.');
            compareUpdate(dbResponse, updateData, db);
          });
        }
      }).catch(() => {
        logGame(game, chalk.red('There was an error getting the game, skipping.'));
      });
    });
  }).catch((err) => {
    log('Something went wrong with the teamplayer call');
    log(err);
  });
}
