import * as _ from 'lodash';
import Database from '../database-api';
import { messages } from '../strings';
import MessengerApi from './messenger-api';
import DialogflowApi from './dialogflow-api';
import SessionContext from '../context';
import debug from 'debug';

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

export function handleWelcomeBegin(userId: string) {
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
  return await verifySchool(session, queryResult.parameters.schoolname, nextContext, validTeamReply);
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