"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var request = _interopRequireWildcard(require("request-promise"));

var fs = _interopRequireWildcard(require("fs"));

var _lomath = require("lomath");

var _debug = _interopRequireDefault(require("debug"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const log = (0, _debug.default)('messenger-api');

class MessengerApi {
  constructor() {
    _defineProperty(this, "MESSAGES_API", void 0);

    _defineProperty(this, "ATTACHMENTS_API", void 0);

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

  sendTextMessage(psid, message) {
    return request.post(this.MESSAGES_API, {
      json: true,
      body: {
        messaging_type: 'MESSAGE_TAG',
        tag: 'NON_PROMOTIONAL_SUBSCRIPTION',
        recipient: {
          id: psid
        },
        message: {
          text: message
        }
      }
    }).then(() => {
      log('Message sent successfully'); // log(JSON.stringify(body, null, 4));
    }).catch(error => {
      log(_chalk.default.red(error));
    });
  }

  sendImageAttachmentWithUrl(psid, imageUrl) {
    return request.post(this.MESSAGES_API, {
      json: {
        recipient: {
          id: psid
        },
        message: {
          attachment: {
            type: 'image',
            payload: {
              url: imageUrl,
              is_reusable: true
            }
          }
        }
      }
    }).then(body => {
      log('Message sent successfully');
      return body; // log(JSON.stringify(body, null, 4));
    }).catch(error => {
      log(_chalk.default.red(error));
    });
  }

  sendImageAttachmentWithId(psid, imageId) {
    return request.post(this.MESSAGES_API, {
      json: {
        recipient: {
          id: psid
        },
        message: {
          attachment: {
            type: 'image',
            payload: {
              attachment_id: imageId
            }
          }
        }
      }
    }).then(body => {
      log('Message sent successfully');
      return body; // log(JSON.stringify(body, null, 4));
    }).catch(error => {
      log(_chalk.default.red(error));
    });
  }

  uploadImageAttachmentWithUrl(imageUrl) {
    return request.post(this.ATTACHMENTS_API, {
      json: {
        message: {
          attachment: {
            type: 'image',
            payload: {
              url: imageUrl,
              is_reusable: true
            }
          }
        }
      }
    }).then(body => {
      log('Image uploaded successfully'); // log(JSON.stringify(body, null, 4));

      return body.attachment_id;
    }).catch(error => {
      log(_chalk.default.red(error));
    });
  }

  uploadImageAttachment(filepath) {
    const formData = {
      message: JSON.stringify({
        attachment: {
          type: 'image',
          payload: {
            is_reusable: true
          }
        }
      }),
      filedata: fs.createReadStream(filepath)
    };
    return request.post(this.ATTACHMENTS_API, {
      formData: (0, _lomath.flattenJSON)(formData)
    }).then(body => {
      log('Image uploaded successfully'); // log(JSON.stringify(body, null, 4));

      return JSON.parse(body).attachment_id;
    }).catch(error => {
      log(_chalk.default.red(error));
      throw error;
    });
  }

  sendButtonTemplate(psid, text, responses) {
    return request.post(this.MESSAGES_API, {
      json: {
        recipient: {
          id: psid
        },
        message: {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'button',
              text: 'What do you want to do next?',
              buttons: MessengerApi.generateButtons(responses)
            }
          }
        }
      }
    });
  }

  static generateButtons(responses) {
    if (responses.length <= 0 || responses.length > 3) {
      throw new Error('Must have 1 to 3 responses');
    }

    return responses.map(response => ({
      type: 'postback',
      title: response.titleText,
      payload: response.payload
    }));
  }

}

exports.default = MessengerApi;

_defineProperty(MessengerApi, "instance", void 0);