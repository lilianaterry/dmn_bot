import debug from 'debug';
import { GameData } from '../models/teamplayer';
import Database from '../database-api';
import MessengerApi from '../replies/messenger-api';

const log = debug('score-parser');

export async function sendPregameMessages(gameData: GameData) {
  const db = new Database();
  const messenger = MessengerApi.getInstance();

  const attachmentId = await messenger.uploadImageAttachment(`${__dirname}/../../images/LakeHighland.png`);

  log('Getting subscriptions for home team');
  const homeUsers = await db.getSubscriptionsByTeam(gameData.home.team.TeamID);
  log('Getting subscriptions for away team');
  const awayUsers = await db.getSubscriptionsByTeam(gameData.away.team.TeamID);
  log(`Got subscriptions. Total users: ${homeUsers + awayUsers}`);

  homeUsers.forEach((user) => {
    messenger.sendTextMessage(user, `
      ${gameData.home.team.TeamName} is about to take the field! Here's the matchup:
    `).then(() => {
      messenger.sendImageAttachmentWithId(user, attachmentId).then(() => {
        messenger.sendTextMessage(user, `Right now, you're signed up to receive the following updates:
<updates>
If you want to change the notifications you receive now or during the game, press "Change Notifications"`); // TODO: change this to quick replies
      });
    });
  });
}
