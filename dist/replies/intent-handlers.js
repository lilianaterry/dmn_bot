"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifySchool = verifySchool;
exports.handleWelcomeBegin = handleWelcomeBegin;
exports.handleUserProvidesTeamName = handleUserProvidesTeamName;
exports.handleUserProvidesAnotherName = handleUserProvidesAnotherName;
exports.handleInvalidTeam = handleInvalidTeam;
exports.handleUserSelectsPreferences = handleUserSelectsPreferences;
exports.handleWelcomeEnd = handleWelcomeEnd;
exports.handleAddTeam = handleAddTeam;
exports.handleUnsubscribeTeamRequest = handleUnsubscribeTeamRequest;
exports.handleUnsubscribeTeamName = handleUnsubscribeTeamName;
exports.handleChangeGlobalNotifications = handleChangeGlobalNotifications;
exports.handleChangeTeamNotification = handleChangeTeamNotification;
exports.handleChangeTeamNotificationSelection = handleChangeTeamNotificationSelection;
exports.Intents = void 0;

var _ = _interopRequireWildcard(require("lodash"));

var _debug = _interopRequireDefault(require("debug"));

var _databaseApi = _interopRequireDefault(require("../database-api"));

var _strings = require("../strings");

var _dialogflowApi = _interopRequireDefault(require("./dialogflow-api"));

var _context = _interopRequireDefault(require("../context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const log = (0, _debug.default)('intent-handlers');
const Intents = {
  WelcomeBegin: 'Welcome - Begin',
  UserProvidesTeamName: 'Welcome - TeamName',
  UserProvidesAnotherName: 'Welcome - TeamName - Loop',
  UserSelectsPreferences: 'Welcome - Preferences - yes',
  WelcomeEnd: 'Welcome - End',
  InvalidTeamProvided: 'Welcome - TeamName - Invalid',
  AddTeamFirst: 'AddTeam - ReceiveTeamName',
  AddTeamSecond: 'AddTeam - ReceiveTeamName - yes - ReceiveTeamName',
  UnsubscribeTeamRequest: 'UnsubscribeTeam',
  UnsubscribeTeamName: 'UnsubscribeTeam - ProvideTeamName',
  AddNotificationsOptions: 'ChangeNotifications - AddNotifications',
  AddNotificationsSelection: 'ChangeNotifications - AddNotifications - SelectRange - End',
  ChangeTeamNotif: 'GlobalChangeNotifications - Single',
  ChangeTeamNotifSelection: 'GlobalChangeNotifications - Single - End',
  ChangeGlobalNotif: 'GlobalChangeNotifications - All - End'
};
exports.Intents = Intents;

async function verifySchool(userId, sessionId, teamName, nextContext, validTeamReply) {
  const database = new _databaseApi.default();
  return new Promise((resolve, reject) => {
    database.getTeamByName(teamName).then(teamResponse => {
      const context = new _context.default(sessionId, []);
      let outputContexts;
      let responseItems = [];

      if (teamResponse == null) {
        // team not found
        context.addContext('invalid-team', 1, {
          next: nextContext,
          validReply: validTeamReply
        });
        context.addContext(nextContext, 0, {});
        responseItems = [_dialogflowApi.default.getTextResponseJSON(_strings.messages.teamName_error)];
        outputContexts = context.toJSON();
      } else {
        // team found, add subscription
        database.addNewSubscription(userId, teamResponse.team_id);

        if (nextContext) {
          context.addContext(nextContext, 1, {});
        }

        validTeamReply.unshift(_dialogflowApi.default.getTextResponseJSON(`Go ${teamResponse.display_name}!`));
        responseItems = validTeamReply;
        outputContexts = context.toJSON();
      }

      resolve({
        fulfillmentMessages: responseItems,
        outputContexts
      });
    });
  });
}

async function handleWelcomeBegin(userId) {
  const database = new _databaseApi.default();
  database.addNewUser(userId);
}

async function handleUserProvidesTeamName(userId, queryResult, session) {
  const context = _.find(queryResult.outputContexts, o => !o.name.includes('generic'));

  const nextContext = context ? _.last(context.name.split('/')) : null;
  const validTeamReply = queryResult.fulfillmentText;
  const fulfillmentMessages = [];
  fulfillmentMessages.push(_dialogflowApi.default.getQuickReplyResponseJSON(validTeamReply, ['Skip', 'Sanger', 'Carter', 'Denton', 'Greenhill']));
  return await verifySchool(userId, session, queryResult.parameters.schoolname, nextContext, fulfillmentMessages);
}

async function handleUserProvidesAnotherName(userId, queryResult, session) {
  const context = _.find(queryResult.outputContexts, o => !o.name.includes('generic'));

  const nextContext = context ? _.last(context.name.split('/')) : null;
  const userSelectedSkip = context ? context.parameters.skip : null;
  const validTeamReply = queryResult.fulfillmentText;
  const fulfillmentMessages = [_dialogflowApi.default.getQuickReplyResponseJSON(validTeamReply, ['Skip'])];
  return await verifySchool(userId, session, queryResult.parameters.schoolname, 'awaiting-another-name', fulfillmentMessages);
}

async function handleInvalidTeam(userId, queryResult, session) {
  const context = _.find(queryResult.outputContexts, o => o.name.includes('invalid-team'));

  const nextContext = context ? context.parameters.next : null;
  const validTeamReply = context ? context.parameters.validReply : null;
  return await verifySchool(userId, session, queryResult.parameters.schoolname, nextContext, validTeamReply);
}

function handleUserSelectsPreferences(userId, queryResult) {
  const typePreference = queryResult.parameters.typePreference;

  if (typePreference) {
    const database = new _databaseApi.default();
    database.setPrefForAllTeams(userId, typePreference, false);
  }
}

function handleWelcomeEnd(userId, queryResult) {
  const freqPreference = queryResult.parameters.freqPreference;

  if (freqPreference) {
    const database = new _databaseApi.default();
    database.setPrefForAllTeams(userId, freqPreference, true);
  }
}

async function handleAddTeam(userId, queryResult, session) {
  const context = _.find(queryResult.outputContexts, o => !o.name.includes('generic'));

  const nextContext = context ? _.last(context.name.split('/')) : null;
  const fulfillmentMessages = queryResult.fulfillmentMessages;
  return await verifySchool(userId, session, queryResult.parameters.teamName, nextContext, fulfillmentMessages);
}

async function handleUnsubscribeTeamRequest(userId, queryResult) {
  const database = new _databaseApi.default();
  const teams = await database.getSubscriptionsByUser(userId);
  const fulfillment = [];

  for (const team of teams) {
    const teamData = await database.getTeamById(team.team_id);
    const buttons = [{
      text: "Unsubscribe",
      postback: team.team_id
    }];
    fulfillment.push(_dialogflowApi.default.getCardResponseJSON(teamData.display_name, null, teamData.team_image, buttons));
  }

  return {
    fulfillmentMessages: fulfillment
  };
}

async function handleUnsubscribeTeamName(userId, queryResult) {
  const teamId = queryResult.queryText;
  const database = new _databaseApi.default();
  database.removeSubscription(userId, teamId);
}

function handleChangeGlobalNotifications(userId, queryResult) {
  const postback = queryResult.queryText.split(':');
  const notificationType = postback[0];
  const notificationSetting = postback[1] == 'true';
  const database = new _databaseApi.default();
  database.setPrefForAllTeams(userId, notificationType, notificationSetting);
  const startResponse = "Great! PressBot will start sending you notifications for ";
  const stopResponse = "PressBot will stop sending you notifications for ";
  let reply = notificationSetting ? startResponse : stopResponse;
  reply = reply + _.lowerCase(notificationType) + ".";
  return {
    fulfillmentMessages: [_dialogflowApi.default.getTextResponseJSON(reply)]
  };
}

async function handleChangeTeamNotification(userId, queryResult) {
  const database = new _databaseApi.default();
  const teams = await database.getSubscriptionsByUser(userId);
  const fulfillment = [];

  for (const team of teams) {
    const teamData = await database.getTeamById(team.team_id);
    const everyScoreText = team.everyScore ? "Stop Every Score" : "Start Every Score";
    const everyQTRText = team.everyQTR ? "Stop Every QTR" : "Start Every QTR";
    const kickoffText = team.kickoff ? "Stop Kickoff Alerts" : "Start Kickoff Alerts";
    const buttons = [{
      text: everyScoreText,
      postback: `${team.team_id}:everyScore:${!team.everyScore}`
    }, {
      text: everyQTRText,
      postback: `${team.team_id}:everyQTR:${!team.everyQTR}`
    }, {
      text: kickoffText,
      postback: `${team.team_id}:kickoff:${!team.kickoff}`
    }];
    fulfillment.push(_dialogflowApi.default.getCardResponseJSON(teamData.display_name, null, teamData.team_image, buttons));
  }

  ;
  return {
    fulfillmentMessages: fulfillment
  };
}

async function handleChangeTeamNotificationSelection(userId, queryResult) {
  const postback = queryResult.queryText.split(":");
  const teamId = postback[0];
  const notificationType = postback[1];
  const notificationSetting = postback[2] == 'true';
  const database = new _databaseApi.default();
  const teamData = await database.getTeamById(teamId);
  const subData = await database.getSingleTeamSubscription(userId, teamId);
  log(`Passed: ${subData.subscription_id} + ${userId} + ${teamId} + ${notificationType} + ${notificationSetting}`);
  database.setPreference(subData.subscription_id, userId, teamId, notificationType, notificationSetting);
  const startResponse = `Great! PressBot will start sending you notifications for`;
  const stopResponse = `PressBot will stop sending you notifications for`;
  let reply = notificationSetting ? startResponse : stopResponse;
  reply = `${reply} ${_.lowerCase(notificationType)} for ${teamData.display_name}.`;
  return {
    fulfillmentMessages: [_dialogflowApi.default.getTextResponseJSON(reply)]
  };
}