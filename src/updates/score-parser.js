import debug from 'debug';
import { GameData } from '../models/teamplayer';
import Database from '../database-api';
import MessengerApi from '../replies/messenger-api';
import { ScorecardGenerator } from '../gen-images';

const log = debug('score-parser');

function sendMessageContent(
  messenger: MessengerApi,
  user: string,
  teamName: string,
  attachmentId: string,
) {
  messenger.sendTextMessage(user, `
  ${teamName} is about to take the field! Here's the matchup:
`).then(() => {
    messenger.sendImageAttachmentWithId(user, attachmentId).then(() => {
      messenger.sendTextMessage(user, `Right now, you're signed up to receive the following updates:
<updates>
If you want to change the notifications you receive now or during the game, press "Change Notifications"`); // TODO: change this to quick replies
    });
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
    sendMessageContent(messenger, user.user_id, gameData.home.team.TeamName, 'attachmentId');
  });

  awayUsers.forEach((user) => {
    sendMessageContent(messenger, user.user_id, gameData.away.team.TeamName, 'attachmentId');
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
  timeLeft: string,
  teamPossession: 'home'|'away',
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
        timeLeft,
        quarter,
        teamPossession,
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
    messenger.sendTextMessage(user.user_id,
      `Score update! 
${home.name}: ${home.score}
${away.name}: ${away.score}`).then(() => {
      if (attachmentId) {
        MessengerApi.getInstance().sendImageAttachmentWithId(user.user_id, attachmentId);
      }
    });
  });

  awayUsers.forEach((user) => {
    messenger.sendTextMessage(user.user_id,
      `Score update!
${away.name}: ${away.score}
${home.name}: ${home.score}`).then(() => {
      if (attachmentId) {
        MessengerApi.getInstance().sendImageAttachmentWithId(user.user_id, attachmentId);
      }
    });
  });
}
