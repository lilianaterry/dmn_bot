import * as _ from 'lodash';
import Database from '../database-api';
import { messages } from '../strings';
import MessengerApi from './messenger-api';
import DialogflowApi from './dialogflow-api';
import SessionContext from '../context';
import debug from 'debug';

const log = debug('intent-handlers');

export const Intents = {
  Welcome: 'Welcome',
  UserProvidesTeamName: 'UserProvidesTeamName',
  UserProvidesRivalName: 'UserProvidesRivalName',
  UserProvidesAnotherName: 'UserProvidesAnotherName',
  InvalidTeamProvided: 'InvalidTeamProvided',
  TestIntent: 'Test',
};

export async function verifySchool(sessionId: string, teamName: string,
  nextContext: string|null, validTeamReply: any): Promise<any> {
  log(`Verifying school name: ${teamName}`);
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
        // team found
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

export function handleWelcome(req: any) {
  const database = new Database();
  const userId = req.originalDetectIntentRequest.payload.data.sender.id;
  const userParams = database.getUserParams(userId);

  database.docClient.get(userParams, (err, data) => {
    if (err) console.log(err);
    else {
      // user not found
      if (_.isEmpty(data)) {
        database.addNewUser(userId);
      }	else {
        console.log('found user!');
      }
    }
  });
}

export function handleInvalidTeam(queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => o.name.includes('invalid-team'));
  const nextContext = context ? context.parameters.next : null;
  const validTeamReply = context ? context.parameters.validReply : null;
  return verifySchool(session, queryResult.parameters.schoolname, nextContext, validTeamReply);
}

export async function handleUserProvidesTeamName(queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => !(o.name.includes('generic')));
  const nextContext = context ? _.last(context.name.split('/')) : null;
  const validTeamReply = queryResult.fulfillmentText;
  const fulfillmentMessages = [];
  fulfillmentMessages.push(DialogflowApi.getCardResponseJSON(validTeamReply,
    null,
    null,
    [{ text: messages.skipButton_message, postback: null }]));
  fulfillmentMessages.push(DialogflowApi.getQuickReplyResponseJSON(null,
    ['Sanger', 'Carter', 'Denton', 'Greenhill']));
  return await verifySchool(session, queryResult.parameters.schoolname, nextContext, fulfillmentMessages);
}

export async function handleUserProvidesAnotherName(queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => !(o.name.includes('generic')));
  const nextContext = context ? _.last(context.name.split('/')) : null;
  const userSelectedSkip = context ? context.parameters.skip : null;

  if (!userSelectedSkip) {
    const validTeamReply = queryResult.fulfillmentText;
    const fulfillmentMessages = [DialogflowApi.getCardResponseJSON(validTeamReply, null, null,
      [{ text: messages.skipButton_message, postback: null }])];
    return await verifySchool(session, queryResult.parameters.schoolname, 'awaiting-another-name', fulfillmentMessages);
  }
}
