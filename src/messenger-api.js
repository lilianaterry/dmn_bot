import * as request from "request";

export class MessengerApi {
  static instance: MessengerApi;
  
  GRAPH_API_URL: string;

  constructor() {
    if (!process.env.MESSENGER_KEY) {
      throw new Error('MESSENGER_KEY environment variable not set.')
    } 
    
    this.GRAPH_API_URL = `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.MESSENGER_KEY}`
  }

  static getInstance() {
    if (!MessengerApi.instance) {
      MessengerApi.instance = new MessengerApi();
    }
    return MessengerApi.instance;
  }

  sendTextMessage(psid: string, message: string) {
    request.post(this.GRAPH_API_URL, {
      json: true,
      body: {
        "messaging_type": "MESSAGE_TAG",
        "tag": "NON_PROMOTIONAL_SUBSCRIPTION",
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
      console.log(response)
      console.log(body)
    })
  }
}
