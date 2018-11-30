import moment from 'moment';
import debug from 'debug';
import chalk from 'chalk';
import * as _ from 'lodash';
import * as TeamPlayer from '../gateways/teamplayer';
import Database from '../database-api';
import { ScoreUpdate, GameData } from '../models/teamplayer';
import { sendPregameMessages } from './score-parser';

const log = debug('scorelistener');

function logGame(gameId, message, ...args) {
  log(chalk`{cyan GAME ${gameId}:} ${message}`, ...args);
}

function compareUpdate(storedData, updateData: ScoreUpdate) {
  logGame(storedData.GameID, 'Comparing update data to database values.');
  // log('%O', updateData);
  if (updateData.data.gameData.GameStatsDateTimeModified
  === storedData.GameStatsDateTimeModified) {
    logGame(storedData.GameID, 'No update has occured for game.');
  } else {
    logGame(storedData.GameID, 'Updated data has been found.');
    const lastPlay = updateData.getLastPlay();
    if (lastPlay) {
      logGame(storedData.GameID, `Current score - ${updateData.data.home.name}: ${lastPlay.HomeScorePrev}, ${updateData.data.away.name}: ${lastPlay.AwayScorePrev}.`);
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
          }).catch((err) => {
            log(chalk.red('There was an error retrieving the game data.'));
            log(chalk.red(err));
          });
        } else {
          logGame(game, 'The game was found, getting score update.');
          TeamPlayer.getScoreUpdates(game).then((updateData) => {
            logGame(game, 'Retrieved update from teamplayer.');
            compareUpdate(dbResponse, updateData);
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
