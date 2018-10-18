import * as request from 'request-promise';
import * as fs from 'fs';
import { flattenJSON } from 'lomath';

export default class MessengerApi {
  static instance: MessengerApi;

  constructor() {
    if (!process.env.MESSENGER_KEY) {
      console.log(`process env: ${process.env}`);
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
      console.log('Message sent successfully');
      // console.log(JSON.stringify(body, null, 4));
    }).catch((error) => {
      console.error(error);
    });
  }

  sendImageAttachmentWithUrl(psid: string, message: string, imageUrl: string) {
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
      console.log('Message sent successfully');
      return body;
      // console.log(JSON.stringify(body, null, 4));
    }).catch((error) => {
      console.error(error);
    });
  }

  sendImageAttachmentWithId(psid: string, imageId: string) {
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
      console.log('Message sent successfully');
      return body;
      // console.log(JSON.stringify(body, null, 4));
    }).catch((error) => {
      console.error(error);
    });
  }

  uploadImageAttachmentWithUrl(imageUrl: string) {
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
      console.log('Image uploaded successfully');
      // console.log(JSON.stringify(body, null, 4));
      return body.attachment_id;
    }).catch((error) => {
      console.error(error);
    });
  }

  uploadImageAttachment(filepath) {
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
      console.log('Image uploaded successfully');
      // console.log(JSON.stringify(body, null, 4));
      return JSON.parse(body).attachment_id;
    }).catch((error) => {
      console.error(error);
      throw error;
    });
  }
}
