const Recipient = require("../messengerBot/recipient");
const Message = require("../messengerBot/message");
const QuickReply = require("../messengerBot/quickReply");
const MediaAttachment = require("../messengerBot/mediaAttachment");
const Element = require("../messengerBot/element");
const Request = require("../messengerBot/request");
const CallButton = require("../messengerBot/buttons/callButton");
const UrlButton = require("../messengerBot/buttons/urlButton");
const PostbackButton = require("../messengerBot/buttons/postbackButton");
const ShareButton = require("../messengerBot/buttons/shareButton");

const ButtonTemplate = require("../messengerBot/templates/buttonTemplate");
const GenericTemplate = require("../messengerBot/templates/genericTemplate");
const ListTemplate = require("../messengerBot/templates/listTemplate");

const MessengerBotRequestService = require("../services/messengerBotRequestService");

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
    let message;

    if (text === "Hi") {
      message = new Message("Hej, Hola, Kon'nichiwa", null, null, "");
    }

    if (text === "Quick replies") {
      let quickReplies = [new QuickReply(QuickReply.contetTypes.text, "Red", "ColourChosen"),
        new QuickReply(QuickReply.contetTypes.text, "Green", "ColourChosen"),
        new QuickReply(QuickReply.contetTypes.text, "Blue", "ColourChosen")];

      message = new Message("Pick a colour:", null, quickReplies, "");
    }

    if (text === "Attachment") {
      let attachment = new MediaAttachment("image", "http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg")
      message = new Message(null, attachment, null, "");
    }

    if (text === "Buttons") {
      let buttons = [new UrlButton("Url Button", "http://www.google.com", UrlButton.webViewHeightRatios.compact),
        new CallButton("Call Button", "+447791065397"),
       new PostbackButton("Postback Button", "DEVELOPER_DEFINED_PAYLOAD")];

      let buttonTemplate = new ButtonTemplate("Hello World", buttons)
      message = new Message(null, buttonTemplate, null, "");
    }

    if(text === "Element") {
      let elements = [new Element("Title goes here", "subtitle, subtitle, subtitle...", "http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg", new UrlButton(null, "http://www.google.com"), null)];

      let genericTemplate = new GenericTemplate(elements);
      message = new Message(null, genericTemplate, null, "");
    }

    if(text === "Elements") {
      let elements = [
        new Element("Title number 1", "subtitle, subtitle, subtitle...", "http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg", new UrlButton(null, "http://www.google.com"), null),
        new Element("Title number 2", "subtitle, subtitle, subtitle...", "http://www.petscorner.co.uk/petopedia/wp-content/uploads/header-kittens.jpg", new UrlButton(null, "http://www.facebook.com"), null),
        new Element("Title number 3", "subtitle, subtitle, subtitle...", "http://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-30-57b30ad41bc90__605.jpg", new UrlButton(null, "http://www.twitter.com"), [new ShareButton()])
      ];

      let genericTemplate = new GenericTemplate(elements);
      message = new Message(null, genericTemplate, null, "");
    }

    if(text === "List") {
      let elements = [
        new Element("Title number 1", "subtitle, subtitle, subtitle...", "http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg", new UrlButton(null, "http://www.google.com"), [new ShareButton()]),
        new Element("Title number 2", "subtitle, subtitle, subtitle...", "http://www.petscorner.co.uk/petopedia/wp-content/uploads/header-kittens.jpg", new UrlButton(null, "http://www.facebook.com"), null),
        new Element("Title number 3", "subtitle, subtitle, subtitle...", "http://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-30-57b30ad41bc90__605.jpg", new UrlButton(null, "http://www.twitter.com"), null)
      ];

      let listTemplate = new ListTemplate(ListTemplate.topElementStyles.large, elements, new PostbackButton("Postback Button", "DEVELOPER_DEFINED_PAYLOAD"));
      message = new Message(null, listTemplate, null, "");
    }


    if (message) {
      let request = new Request(recipient, message);
      MessengerBotRequestService.makeRequest(request.object);
    }
  }

  handleAttachments(recipient, attachments) {
    console.log('attachments:', attachments);
  }

  handlePostback(recipient, postback) {
    console.log('postback:', postback);
  }
}

module.exports = MessengerBotController;