"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DialogflowApi {
  constructor(response) {
    _defineProperty(this, "response", void 0);

    this.response = response;
  } // TODO: check how many buttons are allowed!!


  static generateButtonJSON(buttons) {
    if (buttons.length <= 0 || buttons.length > 3) {
      throw new Error('Must have 1 to 3 responses');
    }

    buttons = Array.from(buttons);
    return buttons.map(button => ({
      text: button.text,
      postback: button.postback
    }));
  }

  static getTextResponseJSON(message) {
    return {
      text: {
        text: [message]
      },
      platform: 'FACEBOOK'
    };
  }

  static getImageUrlResponseJSON(imageUri) {
    return {
      image: {
        imageUri
      },
      platform: 'FACEBOOK'
    };
  }

  static getCardResponseJSON(title, subtitle, imageUri, buttons) {
    return {
      card: {
        title,
        subtitle,
        imageUri,
        buttons: this.generateButtonJSON(buttons)
      },
      platform: 'FACEBOOK'
    };
  }

  static getQuickReplyResponseJSON(title, quickReplies) {
    return {
      quickReplies: {
        title,
        quickReplies
      },
      platform: 'FACEBOOK'
    };
  }

}

exports.default = DialogflowApi;