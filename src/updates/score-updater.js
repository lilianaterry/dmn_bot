/* Sends update messages to subscribers */

import debug from 'debug';
import chalk from 'chalk';
import { GameData } from '../models/teamplayer';
import Database from '../database-api';
import MessengerApi from '../replies/messenger-api';
import { ScorecardGenerator } from '../gen-images';

const log = debug('score-updater');

function sendMessageContent(
  messenger: MessengerApi,
  user: string,
  teamName: string,
) {
  messenger.sendTextMessage(user, `${teamName} is about to take the field! Here's the matchup:`).then(() => {
    messenger.sendTextMessage(user, `Right now, you're signed up to receive the following updates:
<updates>
If you want to change the notifications you receive now or during the game, press "Change Notifications"`); // TODO: change this to quick replies
  });
}

export async function sendPregameMessages(gameData: GameData) {
  const db = new Database();
  const messenger = MessengerApi.getInstance();

  log('Getting subscriptions for home team');
  const homeUsers = await db.getSubscriptionsByTeam(gameData.home.team.TeamID);
  log('Getting subscriptions for away team');
  const awayUsers = await db.getSubscriptionsByTeam(gameData.away.team.TeamID);
  log(`Got subscriptions. Total users: ${homeUsers.length + awayUsers.length}`);

  [{ user_id: '2190307544333596' }].forEach((user) => {
    sendMessageContent(messenger, user.user_id, gameData.home.team.TeamName);
  });

  // awayUsers.forEach((user) => {
  //   sendMessageContent(messenger, user.user_id, gameData.away.team.TeamName);
  // });
}

interface SimpleTeam {
  id: string;
  name: string;
  score: number;
}

export async function sendScoreUpdate(
  home: SimpleTeam,
  away: SimpleTeam,
  quarter: string,
  timeRemaining: string,
  possession: 'home'|'away',
  description: string,
) {
  const db = new Database();
  const messenger = MessengerApi.getInstance();
  const gen = new ScorecardGenerator();

  let attachmentId = null;
  try {
    const homeTeamFull = await db.getTeamById(home.id);
    const awayTeamFull = await db.getTeamById(away.id);

    if (homeTeamFull.team_image && awayTeamFull.team_image) {
      const imagePath = await gen.generate(
        false,
        home.name,
        away.name,
        `${home.score}`,
        `${away.score}`,
        homeTeamFull.team_image,
        awayTeamFull.team_image,
        timeRemaining,
        quarter,
        possession,
      );
      attachmentId = await MessengerApi.getInstance().uploadImageAttachment(imagePath);
      gen.cleanup();
    }
  } catch (err) {
    log(err);
  }

  log('Getting subscriptions for home team');
  const homeUsers = await db.getSubscriptionsByTeam(home.id);
  log('Getting subscriptions for away team');
  const awayUsers = await db.getSubscriptionsByTeam(away.id);
  log(`Got subscriptions. Total users: ${homeUsers.length + awayUsers.length}`);

  const messagePromises = [];

  [{ user_id: '2190307544333596' }].forEach((user) => {
    let promise;
    if (attachmentId) {
      promise = MessengerApi.getInstance().sendImageAttachmentWithId(user.user_id, attachmentId)
        .catch((err) => {
          log(chalk.red('There was an error sending the image to a subscriber.'));
          log(err);
        });
    } else {
      promise = Promise.resolve();
    }

    const messagePromise = promise.then(() => messenger.sendTextMessage(
      user.user_id,
      `${description}\n\n${home.name}: ${home.score}\n${away.name}: ${away.score}`,
    ).catch((err) => {
      log(chalk.red('There was an error sending the message to a subscriber.'));
      log(err);
    }));

    messagePromises.push(messagePromise);
  });

  // awayUsers.forEach((user) => {
  //   let promise;
  //   if (attachmentId) {
  //     promise = MessengerApi.getInstance().sendImageAttachmentWithId(user.user_id, attachmentId)
  //       .catch((err) => {
  //         log(chalk.red('There was an error sending the image to subscribers.'));
  //         log(err);
  //       });
  //   } else {
  //     promise = Promise.resolve();
  //   }

  //   const messagePromise = promise.then(() => messenger.sendTextMessage(
  //     user.user_id,
  //     `${description}\n\n${away.name}: ${away.score}\n${home.name}: ${home.score}`,
  //   ).catch((err) => {
  //     log(chalk.red('There was an error sending the message to a subscriber.'));
  //     log(err);
  //   }));

  //   messagePromises.push(messagePromise);
  // });

  await Promise.all(messagePromises);
}
