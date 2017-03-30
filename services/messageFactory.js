const Mustache = require('mustache');

const Message = require("../libs/stueyKent/messengerBot/message");
const QuickReply = require("../libs/stueyKent/messengerBot/quickReply");
const MediaAttachment = require("../libs/stueyKent/messengerBot/mediaAttachment");
const Element = require("../libs/stueyKent/messengerBot/element");
const UrlButton = require("../libs/stueyKent/messengerBot/buttons/urlButton");

const ButtonFactory = require("./buttonFactory");
const ButtonTemplate = require("../libs/stueyKent/messengerBot/templates/buttonTemplate");
const GenericTemplate = require("../libs/stueyKent/messengerBot/templates/genericTemplate");
const ListTemplate = require("../libs/stueyKent/messengerBot/templates/listTemplate");

class MessageFactory {
  static getMessage(reply, userDetails){
    switch (reply.type) {
      case "TEXT":
        return new Message(Mustache.render(reply.text, userDetails), null, null, "");

      case "QUICK_REPLY":
         let quickReplies = reply.quickReplies.map((quickReply)=> {
          return new QuickReply(QuickReply.contetTypes.text, Mustache.render(quickReply.text, userDetails), "")
        });
        return new Message(reply.text, null, quickReplies, "");

      case "ATTACHMENT":
        let attachment = new MediaAttachment(reply.attachmentType, reply.url);
        return new Message(null, attachment, null, "");

      case "BUTTON_TEMPLATE":
        let buttons = reply.buttons.map((button)=> {
          return ButtonFactory.getButton(button, userDetails)
        });

        return new Message(null, new ButtonTemplate(Mustache.render(reply.text, userDetails), buttons), null, "");

      case "GENERIC_TEMPLATE":
        let genericElements = reply.elements.map((element)=> {
          let buttons = null;
          if(element.buttons.length > 0) {
            buttons = element.buttons.map((button) => {
              return ButtonFactory.getButton(button, userDetails)
            });
          }
          return new Element(Mustache.render(element.title, userDetails), Mustache.render(element.subtitle, userDetails), element.imageUrl, new UrlButton(null, element.action.url, UrlButton.webViewHeightRatios[element.action.size]), buttons);
        });

        return new Message(null, new GenericTemplate(genericElements), null, "");

      case "LIST_TEMPLATE":
        let listElements = reply.elements.map((element)=> {
          let buttons = null;
          if(element.buttons.length > 0) {
            buttons = element.buttons.map((button) => {
              return ButtonFactory.getButton(button, userDetails)
            });
          }
          return new Element(Mustache.render(element.title, userDetails), Mustache.render(element.subtitle, userDetails), element.imageUrl, new UrlButton(null, element.action.url, UrlButton.webViewHeightRatios[element.action.size]), buttons);
        });
        let listTemplate = new ListTemplate(ListTemplate.topElementStyles[reply.topElementStyle], listElements, ButtonFactory.getButton(reply.button, userDetails));
        return new Message(null, listTemplate, null, "");
    }
  }
}
module.exports = MessageFactory;