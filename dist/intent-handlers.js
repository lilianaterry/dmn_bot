"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifySchool = verifySchool;
exports.handleInvalidTeam = handleInvalidTeam;
exports.handleUserProvidesTeamName = handleUserProvidesTeamName;
exports.handleUserProvidesRivalName = handleUserProvidesRivalName;
exports.addTeamSubscription = addTeamSubscription;
exports.welcomeUser = welcomeUser;
exports.Events = exports.Intents = void 0;

var _ = _interopRequireWildcard(require("lodash"));

var _tableOperations = _interopRequireDefault(require("./table-operations"));

var _strings = require("./strings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const Intents = {
  WelcomeIntent: 'Welcome',
  UserProvidesTeamName: 'UserProvidesTeamName',
  UserProvidesRivalName: 'UserProvidesRivalName',
  InvalidTeamProvided: 'InvalidTeamProvided'
};
exports.Intents = Intents;
const Events = {
  AddTeamSubscriptionEvent: 'ADD-TEAM-SUBSCRIPTION'
};
exports.Events = Events;

function generateResult(text) {
  return {
    source: 'pressbotbox.com',
    payload: {
      facebook: {
        text
      }
    }
  };
}

function generateContext(name, lifespan, session, parameters) {
  return {
    name: `${session}/contexts/${name}`,
    lifespanCount: lifespan,
    parameters
  };
}

function verifySchool(sessionId, schoolName, nextContext) {
  const contexts = [];
  let text;

  if (schoolName === 'Klein Oak') {
    if (nextContext) {
      contexts.push(generateContext(nextContext, 1, sessionId, {}));
    }

    text = 'yay';
  } else {
    contexts.push(generateContext('invalid-team', 1, sessionId, {
      next: nextContext
    }));
    contexts.push(generateContext(nextContext, 0, sessionId, {}));
    text = 'nay';
  }

  return {
    source: 'pressbotbox.com',
    outputContexts: contexts,
    payload: {
      facebook: {
        text
      }
    }
  };
}

function handleInvalidTeam(queryResult, session) {
  const context = _.find(queryResult.outputContexts, o => o.name.includes('invalid-team'));

  const name = context ? context.parameters.next : null;
  return verifySchool(session, queryResult.parameters.schoolname, name);
}

function handleUserProvidesTeamName(queryResult, session) {
  const context = _.find(queryResult.outputContexts, o => !o.name.includes('generic'));

  const name = context ? _.last(context.name.split('/')) : null;
  console.log(JSON.stringify(context, null, 2));
  console.log(name);
  return verifySchool(session, queryResult.parameters.schoolname, name);
}

function handleUserProvidesRivalName(queryResult, session) {
  const context = _.find(queryResult.outputContexts, o => !o.name.includes('generic'));

  const name = context ? _.last(context.name.split('/')) : null;
  return verifySchool(session, queryResult.parameters.schoolname, name);
}

function addTeamSubscription() {}

function welcomeUser(userId) {
  return {
    source: 'pressbotbox.com',
    payload: {
      facebook: {
        text: _strings.messages.welcome_message
      },
      followupEventInput: {
        name: Events.AddTeamSubscriptionEvent,
        languageCode: 'en-US'
      }
    }
  };
}