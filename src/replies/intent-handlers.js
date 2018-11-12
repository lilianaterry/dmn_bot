import * as _ from 'lodash';
import Database from './database-api';
import { messages } from '../strings';
import MessengerApi from './messenger-api';
import DialogflowApi from './dialogflow-api';
import SessionContext from '../context';

export const Intents = {
  Welcome: 'Welcome',
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

export async function verifySchool(sessionId: string, teamName: string,
  nextContext: string|null, validTeamReply: any) {
  const database = new Database('dmn_teams');
  const teamParams = database.getTeamParams(teamName);

  console.log(`teamName: ${teamName}`);
  console.log(`***TEAM PARAMS: ${JSON.stringify(teamParams)}`);

  const getItems = async () => {
    const { Items } = await database.docClient.scan(teamParams, (err, data) => {
      console.log(`******INSIDE DATA: ${JSON.stringify(data)}`);
    }).promise();

    const item = Items[0];
    console.log(`*********ITEM: ${JSON.stringify(item)}`);

    return {
      item,
    };
  };

  console.log(`*********GET ITEMS: ${JSON.stringify(getItems())}`);


  // database.docClient.scan(teamParams, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   }
  // 	else {
  //     const context = new SessionContext(sessionId, []);

  //     let outputContexts;
  //     let responseItems = [];
  //     count += 1;
  //     word = "hello world";
  //     console.log('********* COUNT: ' + count);

  //     // team not found
  //     if (data.Count == 0) {
  //       context.addContext('invalid-team', 1, { next: nextContext, validReply: validTeamReply });
  //       context.addContext(nextContext, 0, {});
  //       responseItems = [DialogflowApi.getTextResponseJSON(messages.teamName_error)];
  //       outputContexts = context.toJSON();
  //     // team found
  //     } else {
  //       if (nextContext) {
  //         context.addContext(nextContext, 1, {});
  //       }
  //       responseItems = validTeamReply;
  //       outputContexts = context.toJSON();
  //     }

  //     return {
  //       fulfillmentMessages: responseItems,
  //       outputContexts,
  //     };
  //   }
  // });
}

export function handleWelcome(req: any) {
  const database = new Database('dmn_users');
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

export function handleUserProvidesTeamName(queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => !(o.name.includes('generic')));
  const nextContext = context ? _.last(context.name.split('/')) : null;
  const validTeamReply = queryResult.fulfillmentText;
  const fulfillmentMessages = [];
  fulfillmentMessages.push(DialogflowApi.getCardResponseJSON(validTeamReply,
    null,
    null,
    [{ text: messages.skipButton_message, postback: null }]));
  fulfillmentMessages.push(DialogflowApi.getQuickReplyResponseJSON(messages.suggestedRivals_message,
    ['Klein Collins', 'Klein Oak']));
  return verifySchool(session, queryResult.parameters.schoolname, nextContext, fulfillmentMessages);
}

export function handleUserProvidesAnotherName(queryResult: any, session: string) {
  const context = _.find(queryResult.outputContexts, o => !(o.name.includes('generic')));
  const nextContext = context ? _.last(context.name.split('/')) : null;
  const userSelectedSkip = context ? context.parameters.skip : null;

  if (!userSelectedSkip) {
    const validTeamReply = queryResult.fulfillmentText;
    const fulfillmentMessages = [DialogflowApi.getCardResponseJSON(validTeamReply, null, null,
      [{ text: messages.skipButton_message, postback: null }])];
    return verifySchool(session, queryResult.parameters.schoolname, 'awaiting-another-name', fulfillmentMessages);
  }
}
