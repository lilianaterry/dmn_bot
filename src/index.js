/* eslint-disable prefer-destructuring */
import * as IntentHandler from './intent-handlers';

// Imports dependencies and set up http server
const express = require('express');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 8000, () => console.log('Listening for requests from Messenger'));

// Creates the endpoint for our webhook
app.post('/webhook', (req: any, res: any) => {
  console.log('Received webhook POST request');
  //console.log(JSON.stringify(req.body, null, 2));

  const body = req.body;
  const queryResult = body.queryResult;
  const sessionId = body.session;
  const intent = queryResult.intent.displayName;

  switch (intent) {
    case IntentHandler.Intents.Welcome:
      console.log('Inside welcome intent');
      IntentHandler.handleWelcome(req.body);
			return null;

    case IntentHandler.Intents.UserProvidesTeamName:
      console.log('Inside user provides team intent');
      return res.json(IntentHandler.handleUserProvidesTeamName(queryResult, sessionId));

    case IntentHandler.Intents.UserProvidesAnotherName:
      console.log('Inside user provides another name intent');
      return res.json(IntentHandler.handleUserProvidesAnotherName(queryResult, sessionId));

    case IntentHandler.Intents.InvalidTeamProvided:
      console.log('Inside invalid team intent');
      return res.json(IntentHandler.handleInvalidTeam(queryResult, sessionId));

    default:
      return null;
  }
});

app.get('/heartbeat', (req: any, res: any) => {
  res.send('Server heartbeat success');
});
