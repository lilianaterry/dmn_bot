"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessengerApi = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require("request");

var request = _interopRequireWildcard(_request);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessengerApi = exports.MessengerApi = function () {
  function MessengerApi() {
    _classCallCheck(this, MessengerApi);

    if (!process.env.MESSENGER_KEY) {
      throw new Error('MESSENGER_KEY environment variable not set.');
    }

    this.GRAPH_API_URL = "https://graph.facebook.com/v2.6/me/messages?access_token=" + process.env.MESSENGER_KEY;
  }

  _createClass(MessengerApi, [{
    key: "sendTextMessage",
    value: function sendTextMessage(psid, message) {
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
      }, function (error, response, body) {
        if (error) {
          console.error(error);
        } else {
          console.log('Message sent successfully');
        }
      });
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!MessengerApi.instance) {
        MessengerApi.instance = new MessengerApi();
      }
      return MessengerApi.instance;
    }
  }]);

  return MessengerApi;
}();