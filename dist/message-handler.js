"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleMessage;

var _messengerApi = _interopRequireDefault(require("./messenger-api"));

var Commands = _interopRequireWildcard(require("./commands"));

var _genImages = _interopRequireDefault(require("./gen-images"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleMessage(message) {
  const userId = message.sender.id;
  const messageCommand = message.message.text.toLowerCase(); // Decides which command to run from user request

  switch (messageCommand) {
    case 'start':
      Commands.startConversation(userId);
      break;

    default:
      console.log('Sorry that command was not found');
  }

  _messengerApi.default.getInstance().sendTextMessage(message.sender.id, 'Message received');

  console.log('Uploading image');
  const scorecard = new _genImages.default();
  const filepath = scorecard.generate(false, 'Team A', 'Team B', '20', '25', `${__dirname}/BurgesHS_Logo.png`, `${__dirname}/LakeHighland.png`, '03:00', '4th', 'home');

  _messengerApi.default.getInstance().sendImageAttachmentWithUrl(message.sender.id, 'https://s3.amazonaws.com/pressbot-images/final-scores/e86b0d71-429e-4ffe-b367-6591adb8dc7f.png').catch(error => {
    console.error(error);
  }); // MessengerApi.getInstance().uploadImageAttachment(filepath)
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