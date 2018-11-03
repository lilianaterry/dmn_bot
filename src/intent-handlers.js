import * as _ from 'lodash';
import Database from './table-operations';
import { messages } from './strings';

const Intents = {
  WelcomeIntent: 'Welcome',
  AddTeamSubscriptionIntent: 'Add Team Subscription',
  InvalidTeamProvided: 'InvalidTeamProvided',
};

const Events = {
  AddTeamSubscriptionEvent: 'ADD-TEAM-SUBSCRIPTION',
};

export { Intents, Events };

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

function generateContext(name: string, lifespan: number, session: string) {
  return {
    name: `projects/pressbot-80cf8/agent/sessions/${session}/contexts/${name}`,
    lifespanCount: lifespan,
    parameters: {},
  };
}

export function handleInvalidTeam(queryResult: any) {
  return _.find(queryResult.outputContext, o => !(o.name.contains('invalid-team') || o.name.contains('generic')));
}

export function verifySchool(sessionId, schoolName, maintainContext) {
  const contexts = [maintainContext];

  if (schoolName !== 'Klein Oak') {
    contexts.push(generateContext('invalid-team', 1, sessionId));
  }

  return {
    outputContexts: contexts,
  };
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
