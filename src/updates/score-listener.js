/* Compares updated data with data stored in database to
    determine whether an update notificaiton should be sent
    to users */

import moment from 'moment';
import debug from 'debug';
import chalk from 'chalk';
import * as _ from 'lodash';
import * as TeamPlayer from '../gateways/teamplayer';
import Database from '../database-api';
import { ScoreUpdate, GameData, Record } from '../models/teamplayer';
import { sendPregameMessages, sendScoreUpdate } from './score-updater';

const log = debug('scorelistener');

function logGame(gameId, message, ...args) {
  log(chalk`{cyan GAME ${gameId}:} ${message}`, ...args);
}

async function compareUpdate(storedData, updateData: ScoreUpdate, db: Database) {
  logGame(storedData.GameID, 'Comparing update data to database values.');

  if (updateData.data.gameData.GameStatsDateTimeModified
  === storedData.lastModified) {
    logGame(storedData.GameID, 'Last modified time for game has not changed.');
  } else {
    logGame(storedData.GameID, 'Last modified time for game has changed, checking for updates.');

    // Testing new way
    let { lastPossession, lastQuarter } = storedData;
    logGame(storedData.GameID, `Last possession: ${lastQuarter}, possession ${lastPossession}`);

    for (const poss of updateData.getPossessionsAfter(lastQuarter, lastPossession)) {
      // You could look at each record here if you want the ability to send more detailed updates
      // We only care about scoring plays and end of quarters, so we only need to look at the last
      // record in the list.
      const lastRec = poss.possession.Records[_.last(_.keys(poss.possession.Records))];

      // Sometimes teamplayer will say the score has changed when it actually hasn't.
      const scoreChanged = poss.possession.ScoreChange
      && (parseInt(poss.possession.HomeScorePrev, 10) < parseInt(poss.possession.HomeScoreCurr, 10)
      || parseInt(poss.possession.AwayScorePrev, 10) < parseInt(poss.possession.AwayScoreCurr, 10));

      if (scoreChanged || lastRec.SummaryType === 'End of Quarter') {
        const timeRemaining = lastRec.TimeLeft ? lastRec.TimeLeft.split(' ')[0] : '';
        logGame(storedData.GameID, `Triggering score update. ${poss.possession.HomeScoreCurr}-${poss.possession.AwayScoreCurr}`);
        await sendScoreUpdate({
          id: storedData.GameHomeTeamID,
          name: storedData.homeTeamName,
          score: poss.possession.HomeScoreCurr,
        }, {
          id: storedData.GameAwayTeamID,
          name: storedData.awayTeamName,
          score: poss.possession.AwayScoreCurr,
        },
        poss.quarter,
        timeRemaining,
        poss.possession.TeamName === storedData.homeTeamName ? 'home' : 'away',
        lastRec.SummaryDescription);

        lastQuarter = poss.quarter;
        lastPossession = poss.possessionNumber;
      }
    }

    if (lastQuarter !== storedData.lastQuarter || lastPossession !== storedData.lastPossession) {
      logGame(storedData.GameID, 'Saving updates to the database.');
      db.updateGame(
        updateData.data.gameData.GameID,
        lastQuarter,
        lastPossession,
        updateData.data.gameData.GameStatsDateTimeModified,
      ).then(() => {
        logGame(storedData.GameID, 'Game update has been saved in database.');
      });
    } else {
      logGame(storedData.GameID, 'No updates have occurred in the game.');
    }

    // const lastPlay = updateData.getLastScoringPlay();
    // if (lastPlay) {
    //   // Check to see if the score has updated since the data changed.
    //   let scoreChanged;
    //   if (storedData.home_score !== lastPlay.possession.HomeScoreCurr
    //     || storedData.away_score !== lastPlay.possession.AwayScoreCurr) {
    //     // Score has changed, check to see if we should wait for PAT
    //     const lastRecord = lastPlay.possession.Records[_.last(_.keys(lastPlay.possession.Records))];
    //     if (
    //       (parseInt(lastPlay.possession.HomeScoreCurr, 10)
    //       - parseInt(lastPlay.possession.HomeScorePrev, 10) === 6
    //       || parseInt(lastPlay.possession.HomeScoreCurr, 10)
    //       - parseInt(lastPlay.possession.HomeScorePrev, 10) === 6)
    //       && !lastRecord.SummaryDescription.includes('PAT')
    //     ) {
    //       logGame(storedData.GameID, `The score of the game has changed. Previously ${storedData.home_score}-${storedData.away_score}. Now ${lastPlay.possession.HomeScoreCurr}-${lastPlay.possession.AwayScoreCurr}. Waiting to send notifications for the PAT.`);
    //       scoreChanged = false;
    //     } else {
    //       logGame(storedData.GameID, `The score of the game has changed. Previously ${storedData.home_score}-${storedData.away_score}. Now ${lastPlay.possession.HomeScoreCurr}-${lastPlay.possession.AwayScoreCurr}`);
    //       scoreChanged = true;
    //     }
    //   } else {
    //     scoreChanged = false;
    //     logGame(storedData.GameID, 'The game has been updated but the score has not changed.');
    //   }
    //   db.updateGame(
    //     updateData.data.gameData.GameID,
    //     lastPlay.possession.HomeScoreCurr,
    //     lastPlay.possession.AwayScoreCurr,
    //     updateData.data.gameData.GameStatsDateTimeModified,
    //   ).then(() => {
    //     logGame(storedData.GameID, 'Game update has been saved in database.');
    //     if (scoreChanged) {
    //       logGame(storedData.GameID, 'Sending score updates to subscribed users.');
    //       sendScoreUpdate({
    //         id: storedData.GameHomeTeamID,
    //         name: storedData.homeTeamName,
    //         score: lastPlay.possession.HomeScoreCurr,
    //       }, {
    //         id: storedData.GameAwayTeamID,
    //         name: storedData.awayTeamName,
    //         score: lastPlay.possession.AwayScoreCurr,
    //       },
    //       lastPlay.quarter,
    //       lastPlay.possession);
    //     }
    //   });
    // } else {
    // logGame(storedData.GameID, 'No last play found.');
    // }
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
