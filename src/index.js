import * as _ from 'lodash';
import * as fs from 'fs';
import MessengerApi from './messenger-api';
import * as Commands from './commands';
import ImageGenerator from './gen-images';

// Imports dependencies and set up http server
const express = require('express');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 8000, () => console.log('Listening for requests from Messenger'));

//Creates the endpoint for our webhook
app.post('/webhook', (req: any, res: any) => {
  console.log('Received webhook POST request');
	
	return res.json({
		"source": "pressbotbox.com",
		"payload": {
			"facebook": {
    		"text": "Hello, welcome to Pressbot!"
  		}
		}
	});
  // Returns a '200 OK' response to all requests
  res.status(200).send('EVENT_RECEIVED');
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
