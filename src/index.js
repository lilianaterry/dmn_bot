import {
  Intents, handleInvalidTeam, handleUserProvidesRivalName, handleUserProvidesTeamName,
  handleUserProvidesOtherName, handleTestIntent,
} from './intent-handlers';

// Imports dependencies and set up http server
const express = require('express');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 8000, () => console.log('Listening for requests from Messenger'));

// Creates the endpoint for our webhook
app.post('/webhook', (req: any, res: any) => {
  console.log('Received webhook POST request');
  // console.log(JSON.stringify(req.body, null, 2));

  const intent = req.body.queryResult.intent.displayName;
  const facebookPayload = req.body.originalDetectIntentRequest.payload;
  const sessionId = req.body.session;

  switch (intent) {
    case Intents.TestIntent:
      console.log('Inside test intent');
      const result = handleTestIntent();
      console.log(JSON.stringify(result, null, 2));
      return result;

    case Intents.WelcomeIntent:
      console.log('Inside welcome intent');
      return null;

    case Intents.UserProvidesRivalName:
      console.log('Inside user provides rival intent');
      return res.json(handleUserProvidesRivalName(req.body.queryResult, sessionId));

    case Intents.UserProvidesTeamName:
      console.log('Inside user provides team intent');
      return res.json(handleUserProvidesTeamName(req.body.queryResult, sessionId));

    case Intents.UserProvidesOtherName:
      console.log('Inside user provides other name intent');
      return res.json(handleUserProvidesOtherName(req.body.queryResult, sessionId));

    case Intents.InvalidTeamProvided:
      console.log('Inside invalid team intent');
      return res.json(handleInvalidTeam(req.body.queryResult, sessionId));

    default:
      return res.json({ source: 'pressbot.com' });
  }
});

app.get('/heartbeat', (req: any, res: any) => {
  res.send('Server heartbeat success');
});
