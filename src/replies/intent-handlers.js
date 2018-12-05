import * as _ from 'lodash';
import debug from 'debug';
import Database from '../database-api';
import { messages } from '../strings';
import MessengerApi from './messenger-api';
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

export async function handleUnsubscribeTeamRequest() {

}

export async function handleUnsubscribeTeamName(userId: string, queryResult: any, session: string) {

}

export async function handleNotificationsOptions(userId: string, queryResult: any) {
  // get teams by user 
  const teamId = '4498';
  const database = new Database();
  const result = await database.getSingleTeamSubscription(userId, teamId);

  log(JSON.stringify(result.kickoff));

  const notifications = [];
  if (!result.everyScore)
    notifications.push('every score');
  if (!result.everyTD)
    notifications.push('every TD');
  if (!result.everyQTR)
    notifications.push('every QTR');
  if (!result.kickoff)
    notifications.push('kickoff');

  let fulfillment;
  if (_.isEmpty(notifications)) {
    fulfillment = [DialogflowApi.getTextResponseJSON(strings.addNotificationsFail_message)];
  } else {
    fulfillment = [DialogflowApi.getQuickReplyResponseJSON(queryResult.fulfillmentText, notifications)];
  }

  return { fulfillmentMessages: fulfillment };
}

export async function handleAddNotificationsSelection(userId: string, queryResult: any) {
  const context = _.find(queryResult.outputContexts, o => !(o.name.includes('generic')));
  const notification = context.parameters.freqNotification != '' ? context.parameters.freqNotification : context.parameters.typeNotification;

  log(notification);

  // get teams by user 
  const teamId = '5414';
  const database = new Database();
  await database.setPreference(userId, teamId, notification, true);
  log('do we get here')
  
  return await handleNotificationsOptions(userId, queryResult);
}
