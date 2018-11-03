import { Intents, welcomeUser, handleInvalidTeam } from './intent-handlers';

// Imports dependencies and set up http server
const express = require('express');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 8000, () => console.log('Listening for requests from Messenger'));

// Creates the endpoint for our webhook
app.post('/webhook', (req: any, res: any) => {
  console.log('Received webhook POST request');
  console.log(JSON.stringify(req.body, null, 2));

  const intent = req.body.queryResult.intent.displayName;
  // const facebookPayload = req.body.originalDetectIntentRequest.payload;
  const sessionId = req.body.session;

  switch (intent) {
    case Intents.WelcomeIntent:
      console.log('Inside welcome intent');
      return res.json(welcomeUser(sessionId));
    case Intents.InvalidTeamProvided:
      console.log('Inside invalid team intent');
      return res.json(handleInvalidTeam(req.body.queryResult));
    default:
      return res.json({ source: 'pressbot.com' });
  }
});

app.get('/heartbeat', (req: any, res: any) => {
  res.send('Server heartbeat success');
});
