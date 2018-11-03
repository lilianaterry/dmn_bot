import * as _ from 'lodash';
import Database from './table-operations';
import { messages } from './strings';

export const Intents = {
  WelcomeIntent: 'Welcome',
  UserProvidesTeamName: 'UserProvidesTeamName',
  UserProvidesRivalName: 'UserProvidesRivalName',
  InvalidTeamProvided: 'InvalidTeamProvided',
};

const Events = {
  AddTeamSubscriptionEvent: 'ADD-TEAM-SUBSCRIPTION',
};

export { Events };

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

export function verifySchool(sessionId:string, schoolName:string, nextContext:string|null) {
  const contexts = [];
  let text;
  if (schoolName === 'Klein Oak') {
    if (nextContext) {
		  contexts.push(generateContext(nextContext, 1, sessionId, {}));
    }
    text = 'yay';
  } else {
    contexts.push(generateContext('invalid-team', 1, sessionId, { next: nextContext }));
    text = 'nay';
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

export function handleInvalidTeam(queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => !(o.name.includes('invalid-team') || o.name.includes('generic')));
  const name = context ? _.last(context.name.split('/')) : null;
  return verifySchool(session, queryResult.parameters.schoolname, name);
}

export function handleUserProvidesTeamName(queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => !(o.name.includes('generic')));
  const name = context ? _.last(context.name.split('/')) : null;
  console.log(JSON.stringify(context, null, 2));
  console.log(name);
  return verifySchool(session, queryResult.parameters.schoolname, name);
}

export function handleUserProvidesRivalName(queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => !(o.name.includes('generic')));
  const name = context ? _.last(context.name.split('/')) : null;
  return verifySchool(session, queryResult.parameters.schoolname, name);
}

export function addTeamSubscription() {

}

export function welcomeUser(userId: number) {
  return {
    source: 'pressbotbox.com',
    payload: {
      facebook: {
        text: messages.welcome_message,
      },
      followupEventInput: {
        name: Events.AddTeamSubscriptionEvent,
        languageCode: 'en-US',
      },
    },
  };
}
