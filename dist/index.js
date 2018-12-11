"use strict";

var _cron = require("cron");

var _debug = _interopRequireDefault(require("debug"));

var IntentHandler = _interopRequireWildcard(require("./replies/intent-handlers"));

var _scoreListener = _interopRequireDefault(require("./updates/score-listener"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _debug.default)('index'); // Imports dependencies and set up http server

const express = require('express');

const bodyParser = require('body-parser');

const app = express().use(bodyParser.json()); // creates express http server
// Sets server port and logs message on success

app.listen(process.env.PORT || 8000, () => log('Listening for webhook requests')); // Check for score updates every minute

const scoreListener = new _cron.CronJob('* * * * *', _scoreListener.default);
log('Starting job to check for score updates');
scoreListener.start(); // Creates the endpoint for our webhook

app.post('/webhook', (req, res) => {
  log('Received webhook POST request'); // log(JSON.stringify(req.body, null, 2));

  const {
    body
  } = req;
  const {
    queryResult
  } = body;
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
      IntentHandler.handleUserProvidesTeamName(userId, queryResult, sessionId).then(fulfillmentResponse => {
        log(JSON.stringify(fulfillmentResponse));
        res.json(fulfillmentResponse);
      }).catch(err => {
        log(err);
      });
      break;

    case IntentHandler.Intents.UserProvidesAnotherName:
      log('Inside user provides another name intent');
      IntentHandler.handleUserProvidesAnotherName(userId, queryResult, sessionId).then(fulfillmentResponse => {
        res.json(fulfillmentResponse);
      }).catch(err => {
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
      IntentHandler.handleInvalidTeam(userId, queryResult, sessionId).then(fulfillmentResponse => {
        log(JSON.stringify(fulfillmentResponse));
        res.json(fulfillmentResponse);
      }).catch(err => {
        log('There was an error in InvalidTeamProvided');
        log(err);
      });
      break;

    case IntentHandler.Intents.AddTeamFirst: // fall through to same handler as second intent

    case IntentHandler.Intents.AddTeamSecond:
      log('Inside Add Team');
      IntentHandler.handleAddTeam(userId, queryResult, sessionId).then(fulfillmentResponse => {
        res.json(fulfillmentResponse);
      }).catch(err => {
        log('There was an error in AddTeam');
        log(err);
      });
      break;

    case IntentHandler.Intents.UnsubscribeTeamRequest:
      IntentHandler.handleUnsubscribeTeamRequest(userId, queryResult).then(fulfillmentResponse => {
        res.json(fulfillmentResponse);
      }).catch(err => {
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
      IntentHandler.handleChangeTeamNotification(userId, queryResult).then(fulfillmentResponse => {
        res.json(fulfillmentResponse);
      }).catch(err => {
        log('There was an error in ChangeTeamNotif');
        log(err);
      });
      break;

    case IntentHandler.Intents.ChangeTeamNotifSelection:
      log('Inside ChangeTeamNotifSelection');
      IntentHandler.handleChangeTeamNotificationSelection(userId, queryResult).then(fulfillmentResponse => {
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
app.get('/heartbeat', (req, res) => {
  res.send('Server heartbeat success');
});