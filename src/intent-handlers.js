import Database from './table-operations';
import { messages } from './strings';

const Intents = {
  WelcomeIntent: 'Welcome',
  AddTeamSubscriptionIntent: 'Add Team Subscription',
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

export function verifySchool(sessionId, schoolName) {
  const validContext = 'team-is-valid';
  const invalidContext = 'team-not-valid';
  let returnContext;

  if (schoolName === 'Klein Oak') {
    returnContext = validContext;
  } else {
    returnContext = invalidContext;
  }

  return {
    outputContexts: [
      {
        name: `projects/pressbot-80cf8/agent/sessions/${sessionId}/contexts/${returnContext}`,
        lifespanCount: 5,
        parameters: {
          param: 'none',
        },
      },
    ],
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
