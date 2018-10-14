import * as request from "request";

export class MessengerApi {

  constructor() {
    if (!process.env.MESSENGER_KEY) {
      throw new Error('MESSENGER_KEY environment variable not set.');
    }

    this.GRAPH_API_URL = `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.MESSENGER_KEY}`;
  }

  static getInstance() {
    if (!MessengerApi.instance) {
      MessengerApi.instance = new MessengerApi();
    }
    return MessengerApi.instance;
  }

  sendTextMessage(psid, message) {
    request.post(this.GRAPH_API_URL, {
      json: true,
      body: {
        "messaging_type": "<MESSAGING_TYPE>",
        "recipient": {
          "id": psid
        },
        "message": {
          "text": message
        }
      }
    }, (error, response, body) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Message sent successfully');
      }
    });
  }
}