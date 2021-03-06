/* Made with ♥ by Connor and Liliana */
/* Webhook and TeamPlayer polling to listen for incoming events. */

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
const scoreListener = new CronJob('* * * * *', checkForUpdates);
log('Starting job to check for score updates');
scoreListener.start();

// Creates the endpoint for our webhook
app.post('/webhook', (req: any, res: any) => {
  log('Received webhook POST request');
  // log(JSON.stringify(req.body, null, 2));

  const { body } = req;
  const { queryResult } = body;
  const sessionId = body.session;
  const userId = body.originalDetectIntentRequest.payload.data.sender.id;
  const intent = queryResult.intent.displayName;

  switch (intent) {
    case IntentHandler.Intents.WelcomeBegin:
      log('Inside welcome intent');
      IntentHandler.handleWelcomeBegin(userId);
      res.json({});
      break;

    case IntentHandler.Intents.UserProvidesTeamName:
      log('Inside user provides team intent');
      IntentHandler.handleUserProvidesTeamName(userId, queryResult, sessionId)
        .then((fulfillmentResponse) => {
          log(JSON.stringify(fulfillmentResponse));
          res.json(fulfillmentResponse);
        }).catch((err) => {
          log(err);
        });
      break;

    case IntentHandler.Intents.UserProvidesAnotherName:
      log('Inside user provides another name intent');
      IntentHandler.handleUserProvidesAnotherName(userId, queryResult, sessionId)
        .then((fulfillmentResponse) => {
          res.json(fulfillmentResponse);
        })
        .catch((err) => {
          log('There was an error in UserProvidesAnotherName');
          log(err);
        });
      break;

    case IntentHandler.Intents.UserSelectsPreferences:
      log('Inside user selects preferences');
      IntentHandler.handleUserSelectsPreferences(userId, queryResult);
      res.json({});
      break;

    case IntentHandler.Intents.WelcomeEnd:
      log('Inside welcome end');
      IntentHandler.handleWelcomeEnd(userId, queryResult);
      res.json({});
      break;

    case IntentHandler.Intents.InvalidTeamProvided:
      log('Inside invalid team intent');

      IntentHandler.handleInvalidTeam(userId, queryResult, sessionId)
        .then((fulfillmentResponse) => {
          log(JSON.stringify(fulfillmentResponse));
          res.json(fulfillmentResponse);
        }).catch((err) => {
          log('There was an error in InvalidTeamProvided');
          log(err);
        });
      break;

    case IntentHandler.Intents.AddTeamFirst:
      // fall through to same handler as second intent

    case IntentHandler.Intents.AddTeamSecond:
      log('Inside Add Team');
      IntentHandler.handleAddTeam(userId, queryResult, sessionId).then((fulfillmentResponse) => {
        res.json(fulfillmentResponse);
      })
        .catch((err) => {
          log('There was an error in AddTeam');
          log(err);
        });
      break;

    case IntentHandler.Intents.UnsubscribeTeamRequest:
      IntentHandler.handleUnsubscribeTeamRequest(userId, queryResult)
        .then((fulfillmentResponse) => {
          res.json(fulfillmentResponse);
        })
        .catch((err) => {
          log('There was an error in UnsubscribeTeamRequest');
          log(err);
        });
      break;

    case IntentHandler.Intents.UnsubscribeTeamName:
      log('Inside UnsubscribeTeamName');
      IntentHandler.handleUnsubscribeTeamName(userId, queryResult);
      res.json({});
      break;

    case IntentHandler.Intents.ChangeTeamNotif:
      log('Inside ChangeTeamNotif');
      IntentHandler.handleChangeTeamNotification(userId, queryResult)
        .then((fulfillmentResponse) => {
          res.json(fulfillmentResponse);
        })
        .catch((err) => {
          log('There was an error in ChangeTeamNotif');
          log(err);
        });
      break;

    case IntentHandler.Intents.ChangeTeamNotifSelection:
      log('Inside ChangeTeamNotifSelection');
      IntentHandler.handleChangeTeamNotificationSelection(userId, queryResult)
        .then((fulfillmentResponse) => {
          res.json(fulfillmentResponse);
        });
      break;

    case IntentHandler.Intents.ChangeGlobalNotif:
      log('Inside ChangeGlobalNotif');
      res.json(IntentHandler.handleChangeGlobalNotifications(userId, queryResult));
      break;

    default:
      log('Hit webhook, but fell into default case');
      res.json({});
      break;
  }
});

app.get('/heartbeat', (req: any, res: any) => {
  res.send('Server heartbeat success');
});
