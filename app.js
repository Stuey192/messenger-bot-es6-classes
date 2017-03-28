//imports
const path = require('path');

const Recipient = require("./libs/stueyKent/messengerBot/recipient");
const QuickReply = require("./libs/stueyKent/messengerBot/quickReply");
const Message = require("./libs/stueyKent/messengerBot/message");
const Request = require("./libs/stueyKent/messengerBot/request");
const CallButton = require("./libs/stueyKent/messengerBot/buttons/callButton");
const UrlButton = require("./libs/stueyKent/messengerBot/buttons/urlButton");
const PostbackButton = require("./libs/stueyKent/messengerBot/buttons/postbackButton");
const ShareButton = require("./libs/stueyKent/messengerBot/buttons/shareButton");
const MediaAttachment = require("./libs/stueyKent/messengerBot/mediaAttachment");
const ButtonTemplate = require("./libs/stueyKent/messengerBot/templates/buttonTemplate");
const Element = require("./libs/stueyKent/messengerBot/element");

const Middleware = require("./libs/stueyKent/expressServer/middleware");
const ApiRouter = require("./libs/stueyKent/expressServer/apiRouter");
const StaticRouter = require("./libs/stueyKent/expressServer/staticRouter");
const Server = require("./libs/stueyKent/expressServer/server");

const MessengerBotController = require('./libs/stueyKent/controllers/messengerBotController');


let controller = new MessengerBotController();

let middleware = new Middleware();
let apiRouter = new ApiRouter(middleware, [controller]);
let staticRouter = new StaticRouter(path.join(__dirname, 'public'), middleware);
let server = new Server([apiRouter, staticRouter]);
server.init();


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

//console.log(element.object)
