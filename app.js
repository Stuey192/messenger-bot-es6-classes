//imports
let Recipient = require("./libs/stueyKent/messengerBot/recipient");
let QuickReply = require("./libs/stueyKent/messengerBot/quickReply");
let Message = require("./libs/stueyKent/messengerBot/message");
let Request = require("./libs/stueyKent/messengerBot/request");
let CallButton = require("./libs/stueyKent/messengerBot/buttons/callButton");
let UrlButton = require("./libs/stueyKent/messengerBot/buttons/urlButton");
let PostbackButton = require("./libs/stueyKent/messengerBot/buttons/postbackButton");
let ShareButton = require("./libs/stueyKent/messengerBot/buttons/shareButton");
let MediaAttachment = require("./libs/stueyKent/messengerBot/mediaAttachment");
let ButtonTemplate = require("./libs/stueyKent/messengerBot/templates/buttonTemplate");
let Element = require("./libs/stueyKent/messengerBot/element");


let recipient = new Recipient('123456');

let quickReplies = [new QuickReply(QuickReply.contetTypes.text, "Red", "ColourChosen"),
                    new QuickReply(QuickReply.contetTypes.text, "Green", "ColourChosen"),
                    new QuickReply(QuickReply.contetTypes.text, "Blue", "ColourChosen")];

let message = new Message("Pick a colour:", null, quickReplies, "messageEcho");

let request = new Request(recipient, message);

//mediaAttachment
let attachment = new MediaAttachment("image", "http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg")

//Button types
let buttons = [new UrlButton("Url Button", "http://www.google.com", UrlButton.webViewHeightRatios.compact),
              new CallButton("Call Button", "+447791065397"),
              new PostbackButton("Postback Button", "DEVELOPER_DEFINED_PAYLOAD"),
              new ShareButton()];

//buttonTemplate
let buttonTemplate = new ButtonTemplate("Hello World", buttons)


let element = new Element("Title goes here", "subtitle, subtitle, subtitle...", "http://cdn3-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg", new UrlButton(null, "http://www.google.com"), buttons)


let elements = [];

console.log(element.object)
