/* Handles all logic needed to complete Dialogflow fulfillment */

import * as _ from 'lodash';
import debug from 'debug';
import Database from '../database-api';
import { messages } from '../strings';
import DialogflowApi from './dialogflow-api';
import SessionContext from '../context';

const log = debug('intent-handlers');

export const Intents = {
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
  ChangeGlobalNotif: 'GlobalChangeNotifications - All - End',
};

export async function verifySchool(userId: string, sessionId: string, teamName: string,
  nextContext: string|null, validTeamReply: any): Promise<any> {
  const database = new Database();

  return new Promise((resolve, reject) => {
    database.getTeamByName(teamName).then((teamResponse) => {
      const context = new SessionContext(sessionId, []);
      let outputContexts;
      let responseItems = [];

      if (teamResponse == null) {
        // team not found
        context.addContext('invalid-team', 1, { next: nextContext, validReply: validTeamReply });
        context.addContext(nextContext, 0, {});
        responseItems = [DialogflowApi.getTextResponseJSON(messages.teamName_error)];
        outputContexts = context.toJSON();
      } else {
        // team found, add subscription
        database.addNewSubscription(userId, teamResponse.team_id);
        if (nextContext) {
          context.addContext(nextContext, 1, {});
        }
        validTeamReply.unshift(DialogflowApi.getTextResponseJSON(`Go ${teamResponse.display_name}!`));
        responseItems = validTeamReply;
        outputContexts = context.toJSON();
      }

      resolve({
        fulfillmentMessages: responseItems,
        outputContexts,
      });
    });
  });
}

export async function handleWelcomeBegin(userId: string) {
  const database = new Database();
  database.addNewUser(userId);
}

export async function handleUserProvidesTeamName(userId: string, queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => !(o.name.includes('generic')));
  const nextContext = context ? _.last(context.name.split('/')) : null;

  const validTeamReply = queryResult.fulfillmentText;
  const fulfillmentMessages = [];
  fulfillmentMessages.push(DialogflowApi.getQuickReplyResponseJSON(validTeamReply,
    ['Skip', 'Sanger', 'Carter', 'Denton', 'Greenhill']));
  return await verifySchool(userId, session, queryResult.parameters.schoolname, nextContext, fulfillmentMessages);
}

export async function handleUserProvidesAnotherName(userId: string, queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => !(o.name.includes('generic')));
  const nextContext = context ? _.last(context.name.split('/')) : null;
  const userSelectedSkip = context ? context.parameters.skip : null;

  const validTeamReply = queryResult.fulfillmentText;
  const fulfillmentMessages = [DialogflowApi.getQuickReplyResponseJSON(validTeamReply, ['Skip'])];
  return await verifySchool(userId, session, queryResult.parameters.schoolname, 'awaiting-another-name', fulfillmentMessages);
}

export async function handleInvalidTeam(userId: string, queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => o.name.includes('invalid-team'));
  const nextContext = context ? context.parameters.next : null;
  const validTeamReply = context ? context.parameters.validReply : null;

  return await verifySchool(userId, session, queryResult.parameters.schoolname, nextContext, validTeamReply);
}

export function handleUserSelectsPreferences(userId: string, queryResult: any) {
  const typePreference = queryResult.parameters.typePreference;

  if (typePreference) {
    const database = new Database();
    database.setPrefForAllTeams(userId, typePreference, false);
  }
}

export function handleWelcomeEnd(userId: string, queryResult: any) {
  const freqPreference = queryResult.parameters.freqPreference;
  if (freqPreference) {
    const database = new Database();
    database.setPrefForAllTeams(userId, freqPreference, true);
  }
}

export async function handleAddTeam(userId: string, queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => !(o.name.includes('generic')));
  const nextContext = context ? _.last(context.name.split('/')) : null;
  const fulfillmentMessages = queryResult.fulfillmentMessages;

  return await verifySchool(userId, session, queryResult.parameters.teamName, nextContext, fulfillmentMessages);
}

export async function handleUnsubscribeTeamRequest(userId: string, queryResult: any) {
  const database = new Database();
  const teams = await database.getSubscriptionsByUser(userId);

  const fulfillment = [];
  for (const team of teams) {
    const teamData = await database.getTeamById(team.team_id);
    const buttons = [
      {
        text: 'Unsubscribe',
        postback: team.team_id,
      },
    ];
    fulfillment.push(DialogflowApi.getCardResponseJSON(teamData.display_name, null, teamData.team_image, buttons));
  }

  return { fulfillmentMessages: fulfillment };
}

export async function handleUnsubscribeTeamName(userId: string, queryResult: any) {
  const teamId = queryResult.queryText;
  const database = new Database();

  database.removeSubscription(userId, teamId);
}

export function handleChangeGlobalNotifications(userId: string, queryResult: any) {
  const postback = queryResult.queryText.split(':');
  const notificationType = postback[0];
  const notificationSetting = postback[1] == 'true';

  const database = new Database();
  database.setPrefForAllTeams(userId, notificationType, notificationSetting);

  const startResponse = 'Great! PressBot will start sending you notifications for ';
  const stopResponse = 'PressBot will stop sending you notifications for ';
  let reply = notificationSetting ? startResponse : stopResponse;
  reply = `${reply + _.lowerCase(notificationType)}.`;

  return { fulfillmentMessages: [DialogflowApi.getTextResponseJSON(reply)] };
}

export async function handleChangeTeamNotification(userId: string, queryResult: string) {
  const database = new Database();
  const teams = await database.getSubscriptionsByUser(userId);

  const fulfillment = [];
  for (const team of teams) {
    const teamData = await database.getTeamById(team.team_id);

    const everyScoreText = team.everyScore ? 'Stop Every Score' : 'Start Every Score';
    const everyQTRText = team.everyQTR ? 'Stop Every QTR' : 'Start Every QTR';
    const kickoffText = team.kickoff ? 'Stop Kickoff Alerts' : 'Start Kickoff Alerts';

    const buttons = [
      {
        text: everyScoreText,
        postback: `${team.team_id}:everyScore:${!team.everyScore}`,
      },
      {
        text: everyQTRText,
        postback: `${team.team_id}:everyQTR:${!team.everyQTR}`,
      },
      {
        text: kickoffText,
        postback: `${team.team_id}:kickoff:${!team.kickoff}`,
      },
    ];
    fulfillment.push(DialogflowApi.getCardResponseJSON(teamData.display_name, null, teamData.team_image, buttons));
  }

  return { fulfillmentMessages: fulfillment };
}

export async function handleChangeTeamNotificationSelection(userId: string, queryResult: any) {
  const postback = queryResult.queryText.split(':');
  const teamId = postback[0];
  const notificationType = postback[1];
  const notificationSetting = postback[2] == 'true';

  const database = new Database();
  const teamData = await database.getTeamById(teamId);
  const subData = await database.getSingleTeamSubscription(userId, teamId);
  log(`Passed: ${subData.subscription_id} + ${userId} + ${teamId} + ${notificationType} + ${notificationSetting}`);
  database.setPreference(subData.subscription_id, userId, teamId, notificationType, notificationSetting);

  const startResponse = 'Great! PressBot will start sending you notifications for';
  const stopResponse = 'PressBot will stop sending you notifications for';
  let reply = notificationSetting ? startResponse : stopResponse;
  reply = `${reply} ${_.lowerCase(notificationType)} for ${teamData.display_name}.`;

  return { fulfillmentMessages: [DialogflowApi.getTextResponseJSON(reply)] };
}
