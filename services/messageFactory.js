const Message = require("../libs/stueyKent/messengerBot/message");
const QuickReply = require("../libs/stueyKent/messengerBot/quickReply");
const MediaAttachment = require("../libs/stueyKent/messengerBot/mediaAttachment");
const Element = require("../libs/stueyKent/messengerBot/element");
const CallButton = require("../libs/stueyKent/messengerBot/buttons/callButton");
const UrlButton = require("../libs/stueyKent/messengerBot/buttons/urlButton");
const PostbackButton = require("../libs/stueyKent/messengerBot/buttons/postbackButton");
const ShareButton = require("../libs/stueyKent/messengerBot/buttons/shareButton");

const ButtonTemplate = require("../libs/stueyKent/messengerBot/templates/buttonTemplate");
const GenericTemplate = require("../libs/stueyKent/messengerBot/templates/genericTemplate");
const ListTemplate = require("../libs/stueyKent/messengerBot/templates/listTemplate");

class MessageFactory {
  static getMessage(reply){
    switch (reply.type) {
      case "TEXT":
        return new Message(reply.text, null, null, "");

      case "QUICK_REPLY":
         let quickReplies = reply.quick_replies.map((quickReply)=> {
          return new QuickReply(QuickReply.contetTypes.text, quickReply.text, "")
        });

        return new Message("Pick a colour:", null, quickReplies, "");
    }
  }
}
module.exports = MessageFactory;