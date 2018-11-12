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
  UserProvidesOtherName: 'UserProvidesOtherName',
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

// function generateContext(name: string, lifespan: number, session: string, parameters: {}) {
//   return {
//     name: `${session}/contexts/${name}`,
//     lifespanCount: lifespan,
//     parameters,
//   };
// }

export function verifySchool(sessionId: string, schoolName: string,
  nextContext: string|null, validTeamReply: any) {
  const validTeams = ['Klein Oak', 'Klein Collins'];

  const context = new SessionContext(sessionId, []);

  let outputContexts;
  if (_.find(validTeams, team => team === schoolName)) {
    if (nextContext) {
      context.addContext(nextContext, 1, {});
    }
    outputContexts = context.toJSON();
  } else {
    context.addContext('invalid-team', 1, { next: nextContext });
    context.addContext(nextContext, 0, {});
    outputContexts = context.toJSON();
  }

  return {
    fullfillmentMessages: validTeamReply,
    outputContexts,
  };
}

// export function changeOutputContext(sessionId: string, nextContext: string, outputMessage: string) {
//   const contexts = [];
//   contexts.push(generateContext(nextContext, 1, sessionId, {}));
//   return {
//     source: 'pressbotbox.com',
//     outputContexts: contexts,
//   };
// }

export function handleInvalidTeam(queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => o.name.includes('invalid-team'));
  const nextContext = context ? context.parameters.next : null;
  return verifySchool(session, queryResult.parameters.schoolname, nextContext);
}

export function handleUserProvidesTeamName(queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => !(o.name.includes('generic')));
  const nextContext = context ? _.last(context.name.split('/')) : null;
  const validTeamReply = queryResult.fulfillmentText;
  const fulfillmentMessages = [];
  const cardJSON = DialogflowApi.getCardResponseJSON(validTeamReply, 
                                                      null, 
                                                      null, 
                                                      {text: messages.skipButton_message, postback: null});
  const quickReplyJSON = DialogflowApi.getQuickReplyResponseJSON(messages.suggestedRivals_message, 
                                                                  ["Klein Collins", "Klein Oak"]);
  fulfillmentMessages.add(cardJSON, quickReplyJSON);
  return verifySchool(session, queryResult.parameters.schoolname, nextContext, fulfillmentMessages);
}

export function handleUserProvidesRivalName(queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => !(o.name.includes('generic')));
  const nextContext = context ? _.last(context.name.split('/')) : null;
  const validTeamReply = queryResult.fulfillmentText;
  return verifySchool(session, queryResult.parameters.schoolname, nextContext, validTeamReply);
}

export function handleUserProvidesOtherName(queryResult: any, session: string) {
  const 

}

export function addTeamSubscription() {

}
