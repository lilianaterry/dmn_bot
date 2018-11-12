import * as _ from 'lodash';
import Database from './table-operations';
import { messages } from './strings';
import MessengerApi from './messenger-api';
import DialogflowApi from './dialogflow-api';
import SessionContext from './context';

export const Intents = {
  WelcomeIntent: 'Welcome',
  UserProvidesTeamName: 'UserProvidesTeamName',
  UserProvidesRivalName: 'UserProvidesRivalName',
  UserProvidesAnotherName: 'UserProvidesAnotherName',
  InvalidTeamProvided: 'InvalidTeamProvided',
  TestIntent: 'Test',
};

// export function handleTestIntent(session: string, contexts: any[], text: string) {
//   const context = new SessionContext(session, contexts);
//   context.clearContexts();
//   context.addContext(text, 1, null);
//   console.log(`******CONTEXT: ${context.toJSON()}`);
//   return context.toJSON();
// }

export function verifySchool(sessionId: string, schoolName: string,
  nextContext: string|null, validTeamReply: any) {
  const validTeams = ['Klein Oak', 'Klein Collins'];

  const context = new SessionContext(sessionId, []);

  let outputContexts;
	let responseItems = [];
  if (_.find(validTeams, team => team === schoolName)) {
    if (nextContext) {
      context.addContext(nextContext, 1, {});
    }
		responseItems = validTeamReply;
    outputContexts = context.toJSON();
  } else {
    context.addContext('invalid-team', 1, { next: nextContext, validReply: validTeamReply });
    context.addContext(nextContext, 0, {});
		responseItems = [DialogflowApi.getTextResponseJSON(messages.teamName_error)];
    outputContexts = context.toJSON();
  }

  return {
		fulfillmentMessages: responseItems,  	
		outputContexts,
	};
}

export function handleInvalidTeam(queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => o.name.includes('invalid-team'));
  const nextContext = context ? context.parameters.next : null;
	const validTeamReply = context ? context.parameters.validReply : null;
  return verifySchool(session, queryResult.parameters.schoolname, nextContext, validTeamReply);
}

export function handleUserProvidesTeamName(queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => !(o.name.includes('generic')));
  const nextContext = context ? _.last(context.name.split('/')) : null;
  const validTeamReply = queryResult.fulfillmentText;
  const fulfillmentMessages = [];
 	fulfillmentMessages.push(DialogflowApi.getCardResponseJSON(validTeamReply, 
                                                      null, 
                                                      null, 
                                                      [{text: messages.skipButton_message, postback: null}]));
  fulfillmentMessages.push(DialogflowApi.getQuickReplyResponseJSON(messages.suggestedRivals_message, 
                                                                  ["Klein Collins", "Klein Oak"]));
  return verifySchool(session, queryResult.parameters.schoolname, nextContext, fulfillmentMessages);
}

export function handleUserProvidesAnotherName(queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => !(o.name.includes('generic')));
  const nextContext = context ? _.last(context.name.split('/')) : null;
	const userSelectedSkip = context ? context.parameters.skip : null;
	
	if (!userSelectedSkip) {
		const validTeamReply = queryResult.fulfillmentText;
		const fulfillmentMessages = [DialogflowApi.getCardResponseJSON(validTeamReply, null, null, [{text: messages.skipButton_message, postback: null}])];
  	return verifySchool(session, queryResult.parameters.schoolname, 'awaiting-another-name', fulfillmentMessages);
	}
}

