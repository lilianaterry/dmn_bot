import * as Intents from './intent-handlers';

// Imports dependencies and set up http server
const express = require('express');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 8000, () => console.log('Listening for requests from Messenger'));

// Creates the endpoint for our webhook
app.post('/webhook', (req: any, res: any) => {
  console.log('Received webhook POST request');

  const intent = req.body.queryResult.intent.displayName;
  // const facebookPayload = req.body.originalDetectIntentRequest.payload;
  const sessionId = req.body.session;

  switch (intent) {
    case 'Welcome Intent':
      return res.json(Intents.enrollUser(sessionId));

    default:
      return res.json({ source: 'pressbot.com' });
  }
});

app.get('/heartbeat', (req: any, res: any) => {
  res.send('Server heartbeat success');
});
