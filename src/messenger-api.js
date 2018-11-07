import * as request from 'request-promise';
import * as fs from 'fs';
import { flattenJSON } from 'lomath';

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
    const json = MessengerApi.generateTextMessageJSON(psid, message);
    return request.post(this.MESSAGES_API, json).then(() => {
      console.log('Message sent successfully');
      // console.log(JSON.stringify(body, null, 4));
    }).catch((error) => {
      console.error(error);
    });
  }

  sendImageAttachmentWithUrl(psid: string, imageUrl: string) {
    const json = MessengerApi.generateImageWithUrlJSON(psid, imageUrl);

    return request.post(this.MESSAGES_API, json)
      .then((body) => {
        console.log('Message sent successfully');
        return body;
      // console.log(JSON.stringify(body, null, 4));
      }).catch((error) => {
        console.error(error);
      });
  }

  sendImageAttachmentWithId(psid: string, imageId: string) {
    const json = MessengerApi.generateImageWithIdJSON(psid, imageId);

    return request.post(this.MESSAGES_API, json)
      .then((body) => {
        console.log('Message sent successfully');
        return body;
      // console.log(JSON.stringify(body, null, 4));
      }).catch((error) => {
        console.error(error);
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
      console.log('Image uploaded successfully');
      // console.log(JSON.stringify(body, null, 4));
      return body.attachment_id;
    }).catch((error) => {
      console.error(error);
    });
  }

  uploadImageAttachment(filepath: string): Promise<any> {
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

  // TODO
  // sendQuickReply(psid: string, quickReplies: any[]): Promise<any> {
  //   const jsonData = '';
  // }

  sendButtonTemplate(psid: string, text: string, responses: any[]): Promise<any> {
    const json = MessengerApi.generateButtonTemplateJSON(psid, text, responses);

    return request.post(this.MESSAGES_API, json).then(() => {
      console.log('Button template sent successfully');
      // console.log(JSON.stringify(body, null, 4));
    }).catch((error) => {
      console.error(error);
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

  static generateQuickReplies(quickReplies: {title: string,
                                              payload: string,
                                              image_url: string}[]): any[] {
    if (quickReplies.length <= 0 || quickReplies.length > 11) {
      throw new Error('Must have 1 to 11 quick replies');
    }

    return quickReplies.map(quickReply => (
      {
        content_type: 'text',
        title: quickReply.title,
        payload: quickReply.payload,
        image_url: quickReply.image_url,
      }
    ));
  }

  static generateDialogFlowResponse(messengerPayload: string) {
    return {
      messages: {
        type: 4,
        platform: 'facebook',
        payload: messengerPayload,
      },
    };
  }

  static generateTextMessageJSON(psid: string, message: string) {
    return {
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
    };
  }

  static generateImageWithUrlJSON(psid: string, imageUrl: string) {
    return {
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
    };
  }

  static generateImageWithIdJSON(psid: string, imageId: string) {
    return {
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
    };
  }

  static generateQuickReplyJSON(psid: string, message: string, quickReplies: any[]) {
    return {
      recipient: {
        id: psid,
      },
      message: {
        text: message,
        quick_replies: MessengerApi.generateQuickReplies(quickReplies),
      },
    };
  }

  static generateButtonTemplateJSON(psid: string, text: string, responses: any[]) {
    return {
      json: {
        recipient: {
          id: psid,
        },
        message: {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'button',
              text,
              buttons: MessengerApi.generateButtons(responses),
            },
          },
        },
      },
    };
  }
}
