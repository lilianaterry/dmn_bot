/* Sends update messages to subscribers */

import debug from 'debug';
import * as _ from 'lodash';
import { GameData, Possession } from '../models/teamplayer';
import Database from '../database-api';
import MessengerApi from '../replies/messenger-api';
import { ScorecardGenerator } from '../gen-images';

const log = debug('score-parser');

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

  homeUsers.forEach((user) => {
    sendMessageContent(messenger, user.user_id, gameData.home.team.TeamName);
  });

  awayUsers.forEach((user) => {
    sendMessageContent(messenger, user.user_id, gameData.away.team.TeamName);
  });
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
  possession: Possession,
) {
  const db = new Database();
  const messenger = MessengerApi.getInstance();
  const gen = new ScorecardGenerator();

  const lastPlay = possession.Records[_.last(_.keys(possession.Records))];

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
        lastPlay.TimeLeft ? lastPlay.TimeLeft.split(' ')[0] : '',
        quarter,
        possession.TeamName === home.name ? 'home' : 'away',
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

  homeUsers.forEach((user) => {
    let promise;
    if (attachmentId) {
      promise = MessengerApi.getInstance().sendImageAttachmentWithId(user.user_id, attachmentId);
    } else {
      promise = Promise.resolve();
    }

    promise.then(() => {
      messenger.sendTextMessage(
        user.user_id,
        `${lastPlay.SummaryDescription}\n\n${home.name}: ${home.score}\n${away.name}: ${away.score}`,
      );
    });
  });

  awayUsers.forEach((user) => {
    let promise;
    if (attachmentId) {
      promise = MessengerApi.getInstance().sendImageAttachmentWithId(user.user_id, attachmentId);
    } else {
      promise = Promise.resolve();
    }

    promise.then(() => {
      messenger.sendTextMessage(
        user.user_id,
        `${lastPlay.SummaryDescription}\n\n${away.name}: ${away.score}\n${home.name}: ${home.score}`,
      );
    });
  });
}
