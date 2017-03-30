const Request = require("../libs/stueyKent/messengerBot/request");
const Recipient = require("../libs/stueyKent/messengerBot/recipient");


const MessageFactory = require("../services/messageFactory");
const MessengerBotRequestService = require("../services/requestService");
const MessengerBotGetUserDetailsService = require("../services/userDetailsService");

class DynamicMessengerBotController {
  constructor(data) {
    this._data = data;
    this._userData = {};
  }

  MessageReceived(messaging) {
    let recipient = new Recipient(messaging.sender.id);

    let message = messaging.message;
    let postback = messaging.postback;

    if (message) {
      if (message.text) {
        this.handleText(recipient, message.text);
      }

      if (message.attachments) {
        this.handleAttachments(recipient, message.attachments);
      }
    }

    if (postback) {
      this.handlePostback(recipient, postback);
    }
  }

  handleText(recipient, text) {
    console.log('message:', text);
    let messages = [];
    let userDetails = this._userData[recipient.recipientId];

    for (let input of this._data.textInputs) {
      if (text === input.text) {
        messages = input.replies.map((reply) => {
          return MessageFactory.getMessage(reply, userDetails);
        });
        break;
      }
    }

    if (messages.length > 0) {
      this.makeRequest(recipient, messages);
    }
  }

  handleAttachments(recipient, attachments) {
    console.log('attachments:', attachments);
  }

  handlePostback(recipient, postback) {
    console.log('postback:', postback);

    MessengerBotGetUserDetailsService.getUserDetails(this._userData, recipient.recipientId)
      .then((data, userDetails) => {
        this._userData = data;
        let messages = [];

        for (let input of this._data.postbacks) {
          if (postback.payload === input.payload) {
            messages = input.replies.map((reply) => {
              return MessageFactory.getMessage(reply, userDetails);
            });
            break;
          }
        }

        if (messages.length > 0) {
          this.makeRequest(recipient, messages);
        }
      });
  }

  makeRequest(recipient, messages) {
    let requests = [];
    for (let i = 0; i < messages.length; i++) {
      requests.push(new Request(recipient, messages[i]));
    }

    const promiseSerial = funcs =>
      funcs.reduce((promise, func) =>
          promise.then(result => func().then(Array.prototype.concat.bind(result))),
        Promise.resolve([]));

    const funcs = requests.map(request => () => MessengerBotRequestService.makeRequest(request.object));

    promiseSerial(funcs)
      .then(()=>{
        //console.log(this._userData)
      })
      .catch(console.error)
  }
}

module.exports = DynamicMessengerBotController;