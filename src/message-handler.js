import MessengerApi from './messenger-api';
import * as Commands from './commands';
import ScorecardGenerator from './gen-images';

export default function handleMessage(
  message: {message: any, sender: {id: string}, recipient: {id: string}},
) {
  const userId = message.sender.id;
  const messageCommand = message.message.text.toLowerCase();

  // Decides which command to run from user request
  switch (messageCommand) {
    case 'start':
      Commands.startConversation(userId);
      break;
    default:
      console.log('Sorry that command was not found');
  }

  MessengerApi.getInstance().sendTextMessage(message.sender.id, 'Message received');
  console.log('Uploading image');
  const scorecard = new ScorecardGenerator();
  const filepath = scorecard.generate(
    false,
    'Team A',
    'Team B',
    '20',
    '25',
    `${__dirname}/BurgesHS_Logo.png`,
    `${__dirname}/LakeHighland.png`,
    '03:00',
    '4th',
    'home',
  );

  MessengerApi.getInstance().sendImageAttachmentWithUrl(message.sender.id, 'https://s3.amazonaws.com/pressbot-images/final-scores/e86b0d71-429e-4ffe-b367-6591adb8dc7f.png').catch((error) => {
    console.error(error);
  });

  // MessengerApi.getInstance().uploadImageAttachment(filepath)
  //   .then((attachmentId) => {
  //     MessengerApi.getInstance()
  //       .sendImageAttachmentWithId(message.sender.id, attachmentId)
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   });

//   MessengerApi.getInstance().sendButtonTemplate(message.sender.id, 'Test button thing', [{
//     titleText: 'Hello!',
//     payload: 'hello',
//   }, {
//     titleText: 'Another button!',
//     payload: 'another',
//   }]);
}
