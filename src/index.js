import MessengerApi from './messenger-api';
import * as Commands from './commands';

// Imports dependencies and set up http server
const express = require('express');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 8000, () => console.log('Listening for requests from Messenger'));

// Creates the endpoint for our webhook
app.post('/webhook', (req: any, res: any) => {
  console.log('Received webhook POST request');

  const { body } = req;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach((entry) => {
      // Gets the message. entry messaging is an array, but
      // will only ever contain one message, so we get index 0
      const webhookEvent = entry.messaging[0];

      console.log(JSON.stringify(webhookEvent, null, 2));

      // Ignore extraneous messages sent with nlp analysis for now
      if (webhookEvent && !webhookEvent.message.nlp) {
        const userId = webhookEvent.sender.id;
        const messageCommand = webhookEvent.message.text.toLowerCase();

        // Decides which command to run from user request
        switch (messageCommand) {
          case 'start':
            Commands.startConversation(userId);
            break;
          default:
            console.log('Sorry that command was not found');
        }
      }
      MessengerApi.getInstance().sendTextMessage(webhookEvent.sender.id, 'Message received');
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

// Adds support for GET requests to our webhook
app.get('/webhook', (req: any, res: any) => {
  console.log('Received webhook GET request');
  // Your verify token. Should be a random string.
  const VERIFY_TOKEN = 'zV3zVSZoCm';

  // Parse the query params
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

app.get('/heartbeat', (req: any, res: any) => {
  res.send('Server heartbeat success');
});
