import * as _ from 'lodash';
import Database from './table-operations';
import { messages } from './strings';

export const Intents = {
  WelcomeIntent: 'Welcome',
  UserProvidesTeamName: 'UserProvidesTeamName',
  UserProvidesRivalName: 'UserProvidesRivalName',
  UserProvidesOtherName: 'UserProvidesOtherName',
  InvalidTeamProvided: 'InvalidTeamProvided',
};

function generateResult(text) {
  return {
    source: 'pressbotbox.com',
    payload: {
      facebook: {
        text,
      },
    },
  };
}

function generateContext(name: string, lifespan: number, session: string, parameters: {}) {
  return {
    name: `${session}/contexts/${name}`,
    lifespanCount: lifespan,
    parameters,
  };
}

export function verifySchool(sessionId:string, schoolName:string,
  nextContext:string|null, validTeamReply:string) {
  const validTeams = ['Klein Oak', 'Klein Collins'];
  const contexts = [];
  let text;
  if (_.find(validTeams, team => team === schoolName)) {
    if (nextContext) {
      contexts.push(generateContext(nextContext, 1, sessionId, {}));
    }
    text = validTeamReply;
  } else {
    contexts.push(generateContext('invalid-team', 1, sessionId, { next: nextContext }));
    contexts.push(generateContext(nextContext, 0, sessionId, {}));
    text = messages.teamName_error;
  }

  return {
    source: 'pressbotbox.com',
    outputContexts: contexts,
    payload: {
      facebook: {
        text,
      },
    },
  };
}

export function changeOutputContext(sessionId: string, currContext: string,
  nextContext: string, outputMessage: string) {
  const contexts = [];
  contexts.push(generateContext(currContext, 0, sessionId, {}));
  contexts.push(generateContext(nextContext, 1, sessionId, {}));
  return {
    source: 'pressbotbox.com',
    outputContext: contexts,
    payload: {
      facebook: {
        outputMessage,
      },
    },
  };
}

export function handleInvalidTeam(queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => o.name.includes('invalid-team'));
  const nextContext = context ? context.parameters.next : null;
  return verifySchool(session, queryResult.parameters.schoolname, nextContext);
}

export function handleUserProvidesTeamName(queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => !(o.name.includes('generic')));
  const nextContext = context ? _.last(context.name.split('/')) : null;
  const validTeamReply = queryResult.fulfillmentText;
  return verifySchool(session, queryResult.parameters.schoolname, nextContext, validTeamReply);
}

export function handleUserProvidesRivalName(queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => !(o.name.includes('generic')));
  const nextContext = context ? _.last(context.name.split('/')) : null;
  const validTeamReply = queryResult.fulfillmentText;
  return verifySchool(session, queryResult.parameters.schoolname, nextContext, validTeamReply);
}

export function handleUserProvidesOtherName(queryResult: any, session: string) {
  const userText = queryResult.queryText;
  const context = _.find(queryResult.outputContexts, o => !(o.name.includes('generic')));
  const currContext = queryResult.intent.name;
  const nextContext = context ? _.last(context.name.split('/')) : null;
  const validTeamReply = queryResult.fulfillmentText;

  // time to ask for preferences
  if (userText === 'Skip') {
    return changeOutputContext(session, currContext, nextContext,
      messages.featurePreference_message);
  }
  return verifySchool(session, queryResult.parameters.schoolname, currContext, validTeamReply);
}

export function addTeamSubscription() {

}
