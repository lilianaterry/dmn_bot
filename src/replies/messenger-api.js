/* Communication needed to connect directly to Messenger
    without Dialogflow as intermediary */

import * as request from 'request-promise';
import * as fs from 'fs';
import { flattenJSON } from 'lomath';
import debug from 'debug';
import chalk from 'chalk';

const log = debug('messenger-api');

export default class MessengerApi {
  static instance: MessengerApi;

  MESSAGES_API: string;

  ATTACHMENTS_API: string;

  constructor() {
    if (!process.env.MESSENGER_KEY) {
      throw new Error('MESSENGER_KEY environment variable not set.');
    }

    this.MESSAGES_API = `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.MESSENGER_KEY}`;
    this.ATTACHMENTS_API = `https://graph.facebook.com/v2.6/me/message_attachments?access_token=${process.env.MESSENGER_KEY}`;
  }

  static getInstance() {
    if (!MessengerApi.instance) {
      MessengerApi.instance = new MessengerApi();
    }
    return MessengerApi.instance;
  }

  sendTextMessage(psid: string, message: string) {
    return request.post(this.MESSAGES_API, {
      json: true,
      body: {
        messaging_type: 'MESSAGE_TAG',
        tag: 'NON_PROMOTIONAL_SUBSCRIPTION',
        recipient: {
          id: psid,
        },
        message: {
          text: message,
        },
      },
    }).then(() => {
      log('Message sent successfully');
      // log(JSON.stringify(body, null, 4));
    }).catch((error) => {
      log(chalk.red(error));
    });
  }

  sendImageAttachmentWithUrl(psid: string, imageUrl: string) {
    return request.post(this.MESSAGES_API, {
      json: {
        recipient: {
          id: psid,
        },
        message: {
          attachment: {
            type: 'image',
            payload: {
              url: imageUrl,
              is_reusable: true,
            },
          },
        },
      },
    }).then((body) => {
      log('Message sent successfully');
      return body;
      // log(JSON.stringify(body, null, 4));
    }).catch((error) => {
      log(chalk.red(error));
    });
  }

  sendImageAttachmentWithId(psid: string, imageId: string): Promise<any> {
    return request.post(this.MESSAGES_API, {
      json: {
        recipient: {
          id: psid,
        },
        message: {
          attachment: {
            type: 'image',
            payload: {
              attachment_id: imageId,
            },
          },
        },
      },
    }).then((body) => {
      log('Message sent successfully');
      return body;
      // log(JSON.stringify(body, null, 4));
    }).catch((error) => {
      log(chalk.red(error));
    });
  }

  uploadImageAttachmentWithUrl(imageUrl: string): Promise<any> {
    return request.post(this.ATTACHMENTS_API, {
      json: {
        message: {
          attachment: {
            type: 'image',
            payload: {
              url: imageUrl,
              is_reusable: true,
            },
          },
        },
      },
    }).then((body) => {
      log('Image uploaded successfully');
      // log(JSON.stringify(body, null, 4));
      return body.attachment_id;
    }).catch((error) => {
      log(chalk.red(error));
    });
  }

  uploadImageAttachment(filepath: string): Promise<string> {
    const formData = {
      message: JSON.stringify({
        attachment: {
          type: 'image',
          payload: {
            is_reusable: true,
          },
        },
      }),
      filedata: fs.createReadStream(filepath),
    };

    return request.post(this.ATTACHMENTS_API, {
      formData: flattenJSON(formData),
    }).then((body) => {
      log('Image uploaded successfully');
      // log(JSON.stringify(body, null, 4));
      return JSON.parse(body).attachment_id;
    }).catch((error) => {
      log(chalk.red(error));
      throw error;
    });
  }

  sendButtonTemplate(psid: string, text: string, responses: any[]): Promise<any> {
    return request.post(this.MESSAGES_API, {
      json: {
        recipient: {
          id: psid,
        },
        message: {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'button',
              text: 'What do you want to do next?',
              buttons: MessengerApi.generateButtons(responses),
            },
          },
        },
      },
    });
  }

  static generateButtons(responses: {titleText: string, payload: string}[]): any[] {
    if (responses.length <= 0 || responses.length > 3) {
      throw new Error('Must have 1 to 3 responses');
    }

    return responses.map(response => ({
      type: 'postback',
      title: response.titleText,
      payload: response.payload,
    }));
  }
}
