
export default class DialogflowApi {
  constructor(response: any) {
    this.response = response;
  }

  // TODO: check how many buttons are allowed!!
  static generateButtonJSON(buttons: {text: string, postback: string}[]): any[] {
    if (buttons.length <= 0 || buttons.length > 3) {
      throw new Error('Must have 1 to 3 responses');
    }

    return buttons.map(button => ({
      text: button.text,
      postback: button.postback,
    }));
  }

  static getTextResponseJSON(message: string) {
    return {
      fulfillmentMessages: [
        {
          text: {
            text: [message],
          },
          platform: 'FACEBOOK',
        },
      ],
    };
  }

  static getImageUrlResponseJSON(imageUri: string) {
    return {
      fulfillmentMessages: [
        {
          image: {
            imageUri,
          },
          platform: 'FACEBOOK',
        },
      ],
    };
  }

  static getCardResponseJSON(title: string, subtitle: string, imageUri: string, buttons: any[]) {
    return {
      fulfillmentMessages: [
        {
          card: {
            title,
            subtitle,
            imageUri,
            buttons: this.generateButtonJSON(buttons),
          },
          platform: 'FACEBOOK',
        },
      ],
    };
  }

  static getQuickReplyResponseJSON(title: string, quickReplies: string[]) {
    return {
      fulfillmentMessages: [
        {
          quickReplies: {
            title,
            quickReplies,
          },
          platform: 'FACEBOOK',
        },
      ],
    };
  }
}
