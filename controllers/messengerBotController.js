const Recipient = require("../libs/stueyKent/messengerBot/recipient");
const Message = require("../libs/stueyKent/messengerBot/message");
const QuickReply = require("../libs/stueyKent/messengerBot/quickReply");
const MediaAttachment = require("../libs/stueyKent/messengerBot/mediaAttachment");
const Element = require("../libs/stueyKent/messengerBot/element");
const Request = require("../libs/stueyKent/messengerBot/request");
const CallButton = require("../libs/stueyKent/messengerBot/buttons/callButton");
const UrlButton = require("../libs/stueyKent/messengerBot/buttons/urlButton");
const PostbackButton = require("../libs/stueyKent/messengerBot/buttons/postbackButton");
const ShareButton = require("../libs/stueyKent/messengerBot/buttons/shareButton");

const ButtonTemplate = require("../libs/stueyKent/messengerBot/templates/buttonTemplate");
const GenericTemplate = require("../libs/stueyKent/messengerBot/templates/genericTemplate");
const ListTemplate = require("../libs/stueyKent/messengerBot/templates/listTemplate");

const MessengerBotRequestService = require("../services/messengerBotRequestService");
const MessengerBotGetUserDetailsService = require("../services/messengerBotGetUserDetailsService");

class MessengerBotController {
  constructor() {
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

    if (text === "Hi") {
      messages.push(new Message("Hej, Hola, Kon'nichiwa", null, null, ""));
      /*let attachment = new MediaAttachment("image", "http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg")
      messages.push(new Message(null, attachment, null, ""));
      messages.push(new Message("Test 1", null, null, ""));
      messages.push(new Message("Test 2", null, null, ""));*/
    }

    if (text === "Quick replies") {
      let quickReplies = [new QuickReply(QuickReply.contetTypes.text, "Red", "ColourChosen"),
        new QuickReply(QuickReply.contetTypes.text, "Green", "ColourChosen"),
        new QuickReply(QuickReply.contetTypes.text, "Blue", "ColourChosen")];

      messages.push(new Message("Pick a colour:", null, quickReplies, ""));
    }

    if (text === "Attachment") {
      let attachment = new MediaAttachment("image", "http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg")
      messages.push(new Message(null, attachment, null, ""));
    }

    if (text === "Buttons") {
      let buttons = [new UrlButton("Url Button", "http://www.google.com", UrlButton.webViewHeightRatios.compact),
        new CallButton("Call Button", "+447791065397"),
       new PostbackButton("Postback Button", "DEVELOPER_DEFINED_PAYLOAD")];

      let buttonTemplate = new ButtonTemplate("Hello World", buttons)
      messages.push(new Message(null, buttonTemplate, null, ""));
    }

    if(text === "Element") {
      let elements = [new Element("Title goes here", "subtitle, subtitle, subtitle...", "http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg", new UrlButton(null, "http://www.google.com"), null)];

      let genericTemplate = new GenericTemplate(elements);
      messages.push(new Message(null, genericTemplate, null, ""));
    }

    if(text === "Elements") {
      let elements = [
        new Element("Title number 1", "subtitle, subtitle, subtitle...", "http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg", new UrlButton(null, "http://www.google.com"), null),
        new Element("Title number 2", "subtitle, subtitle, subtitle...", "http://www.petscorner.co.uk/petopedia/wp-content/uploads/header-kittens.jpg", new UrlButton(null, "http://www.facebook.com"), null),
        new Element("Title number 3", "subtitle, subtitle, subtitle...", "http://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-30-57b30ad41bc90__605.jpg", new UrlButton(null, "http://www.twitter.com"), [new ShareButton()])
      ];

      let genericTemplate = new GenericTemplate(elements);
      messages.push(new Message(null, genericTemplate, null, ""));
    }

    if(text === "List") {
      let elements = [
        new Element("Title number 1", "subtitle, subtitle, subtitle...", "http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg", new UrlButton(null, "http://www.google.com"), [new ShareButton()]),
        new Element("Title number 2", "subtitle, subtitle, subtitle...", "http://www.petscorner.co.uk/petopedia/wp-content/uploads/header-kittens.jpg", new UrlButton(null, "http://www.facebook.com"), null),
        new Element("Title number 3", "subtitle, subtitle, subtitle...", "http://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-30-57b30ad41bc90__605.jpg", new UrlButton(null, "http://www.twitter.com"), null)
      ];

      let listTemplate = new ListTemplate(ListTemplate.topElementStyles.large, elements, new PostbackButton("Postback Button", "DEVELOPER_DEFINED_PAYLOAD"));
      messages.push(new Message(null, listTemplate, null, ""));
    }


    if (messages .length > 0) {
      this.makeRequest(recipient, messages);
    }
  }

  handleAttachments(recipient, attachments) {
    console.log('attachments:', attachments);
  }

  handlePostback(recipient, postback) {
    console.log('postback:', postback);

    let messages = [];

    if(postback.payload === 'Get Started Buttton Pressed') {
      MessengerBotGetUserDetailsService.getUserDetails(recipient.recipientId).then((response) => {
        messages.push(new Message("Hi " + response.first_name, null, null, ""));
        this.makeRequest(recipient, messages);
      });
    }

    if (messages.length > 0) {
      this.makeRequest(recipient, messages);
    }
  }

  makeRequest(recipient, messages){
    let requests = [];
    for (let i = 0; i < messages.length; i++) {
      requests.push(new Request(recipient, messages[i]));
    }

    const promiseSerial = funcs =>
      funcs.reduce((promise, func) =>
          promise.then(result => func().then(Array.prototype.concat.bind(result))),
        Promise.resolve([]));

    const funcs = requests.map(request => () => MessengerBotRequestService.makeRequest(request.object))

    promiseSerial(funcs)
      .then(console.log)
      .catch(console.error)
  }
}

module.exports = MessengerBotController;