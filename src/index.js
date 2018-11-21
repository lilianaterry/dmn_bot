import { CronJob } from 'cron';
import debug from 'debug';
import * as IntentHandler from './replies/intent-handlers';
import checkForUpdates from './updates/score-listener';

const log = debug('index');

// Imports dependencies and set up http server
const express = require('express');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 8000, () => log('Listening for webhook requests'));

// Check for score updates every minute
// const scoreListener = new CronJob('* * * * *', checkForUpdates);
// log('Starting job to check for score updates');
// scoreListener.start();

// Creates the endpoint for our webhook
app.post('/webhook', (req: any, res: any) => {
  log('Received webhook POST request');
  log(JSON.stringify(req.body, null, 2));

  const { body } = req;
  const { queryResult } = body;
  const sessionId = body.session;
  const userId = body.originalDetectIntentRequest.payload.data.sender.id;
  const intent = queryResult.intent.displayName;

  switch (intent) {
    case IntentHandler.Intents.Welcome:
      log('Inside welcome intent');
      IntentHandler.handleWelcome(userId);
      return null;

    case IntentHandler.Intents.UserProvidesTeamName:
      log('Inside user provides team intent');
      IntentHandler.handleUserProvidesTeamName(userId, queryResult, sessionId).then((fulfillmentResponse) => {
        res.json(fulfillmentResponse);
      })
      .catch((err) => {
        log(`There was an error in UserProvidesTeamName`);
        log(err);
      });
      break;

    case IntentHandler.Intents.UserProvidesAnotherName:
      console.log('Inside user provides another name intent');
      IntentHandler.handleUserProvidesAnotherName(userId, queryResult, sessionId).then((fulfillmentResponse) => {
        res.json(fulfillmentResponse);
      })
      .catch((err) => {
        log(`There was an error in UserProvidesAnotherName`);
        log(err);
      });
      break;

    case IntentHandler.Intents.InvalidTeamProvided:
      console.log('Inside invalid team intent');
      return res.json(IntentHandler.handleInvalidTeam(userId, queryResult, sessionId));

    default:
      break;
  }
});

app.get('/heartbeat', (req: any, res: any) => {
  res.send('Server heartbeat success');
});
