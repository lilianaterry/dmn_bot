"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendPregameMessages = sendPregameMessages;
exports.sendScoreUpdate = sendScoreUpdate;

var _debug = _interopRequireDefault(require("debug"));

var _ = _interopRequireWildcard(require("lodash"));

var _teamplayer = require("../models/teamplayer");

var _databaseApi = _interopRequireDefault(require("../database-api"));

var _messengerApi = _interopRequireDefault(require("../replies/messenger-api"));

var _genImages = require("../gen-images");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _debug.default)('score-parser');

function sendMessageContent(messenger, user, teamName, attachmentId) {
  messenger.sendTextMessage(user, `${teamName} is about to take the field! Here's the matchup:`).then(() => {
    // messenger.sendImageAttachmentWithId(user, attachmentId).then(() => {
    messenger.sendTextMessage(user, `Right now, you're signed up to receive the following updates:
<updates>
If you want to change the notifications you receive now or during the game, press "Change Notifications"`); // TODO: change this to quick replies
    // });
  });
}

async function sendPregameMessages(gameData) {
  const db = new _databaseApi.default();

  const messenger = _messengerApi.default.getInstance();

  log('Getting subscriptions for home team');
  const homeUsers = await db.getSubscriptionsByTeam(gameData.home.team.TeamID);
  log('Getting subscriptions for away team');
  const awayUsers = await db.getSubscriptionsByTeam(gameData.away.team.TeamID);
  log(`Got subscriptions. Total users: ${homeUsers.length + awayUsers.length}`);
  homeUsers.forEach(user => {
    sendMessageContent(messenger, user.user_id, gameData.home.team.TeamName);
  });
  awayUsers.forEach(user => {
    sendMessageContent(messenger, user.user_id, gameData.away.team.TeamName);
  });
}

async function sendScoreUpdate(home, away, quarter, possession) {
  const db = new _databaseApi.default();

  const messenger = _messengerApi.default.getInstance();

  const gen = new _genImages.ScorecardGenerator();

  const lastPlay = possession.Records[_.last(_.keys(possession.Records))];

  let attachmentId = null;

  try {
    const homeTeamFull = await db.getTeamById(home.id);
    const awayTeamFull = await db.getTeamById(away.id);

    if (homeTeamFull.team_image && awayTeamFull.team_image) {
      const imagePath = await gen.generate(false, home.name, away.name, `${home.score}`, `${away.score}`, homeTeamFull.team_image, awayTeamFull.team_image, lastPlay.TimeLeft ? lastPlay.TimeLeft.split(' ')[0] : '', quarter, possession.TeamName === home.name ? 'home' : 'away');
      attachmentId = await _messengerApi.default.getInstance().uploadImageAttachment(imagePath);
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
  homeUsers.forEach(user => {
    let promise;

    if (attachmentId) {
      promise = _messengerApi.default.getInstance().sendImageAttachmentWithId(user.user_id, attachmentId);
    } else {
      promise = Promise.resolve();
    }

    promise.then(() => {
      messenger.sendTextMessage(user.user_id, `${lastPlay.SummaryDescription}\n\n${home.name}: ${home.score}\n${away.name}: ${away.score}`);
    });
  });
  awayUsers.forEach(user => {
    let promise;

    if (attachmentId) {
      promise = _messengerApi.default.getInstance().sendImageAttachmentWithId(user.user_id, attachmentId);
    } else {
      promise = Promise.resolve();
    }

    promise.then(() => {
      messenger.sendTextMessage(user.user_id, `${lastPlay.SummaryDescription}\n\n${away.name}: ${away.score}\n${home.name}: ${home.score}`);
    });
  });
}