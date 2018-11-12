/* eslint-disable prefer-destructuring */
import {
  Intents, handleInvalidTeam, handleUserProvidesRivalName, handleUserProvidesTeamName,
  handleUserProvidesAnotherName,
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

  const body = req.body;
  const queryResult = body.queryResult;
  const sessionId = body.session;
  const intent = queryResult.intent.displayName;

  switch (intent) {
    // case Intents.TestIntent:
    //   console.log('Inside test intent');
    //   const result = handleTestIntent(sessionId, outputContext, req.body.queryResult.queryText);
    //   console.log(JSON.stringify(result, null, 2));
    //   return res.json(result);

    case Intents.WelcomeIntent:
      console.log('Inside welcome intent');
      return null;

    case Intents.UserProvidesTeamName:
      console.log('Inside user provides team intent');
      const result = handleUserProvidesTeamName(queryResult, sessionId);
			console.log(JSON.stringify(result));
			return res.json(result);

    case Intents.UserProvidesAnotherName:
      console.log('Inside user provides another name intent');
      return res.json(handleUserProvidesAnotherName(queryResult, sessionId));

    case Intents.InvalidTeamProvided:
      console.log('Inside invalid team intent');
      return res.json(handleInvalidTeam(queryResult, sessionId));

    default:
      return res.json({ source: 'pressbot.com' });
  }
});

app.get('/heartbeat', (req: any, res: any) => {
  res.send('Server heartbeat success');
});
