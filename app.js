const path = require('path');

//not needed imports
//const ApiRouter = require("./libs/stueyKent/expressServer/apiRouter");
//const StaticRouter = require("./libs/stueyKent/expressServer/staticRouter");

//imports
const MessengerBotMenuService = require("./services/messengerBotMenuService");
const PostbackButton = require("./libs/stueyKent/messengerBot/buttons/postbackButton");


const Middleware = require("./libs/stueyKent/expressServer/middleware");
const WebhookRouter = require("./libs/stueyKent/expressServer/webhookRouter");
const Server = require("./libs/stueyKent/expressServer/server");

const MessengerBotController = require('./controllers/messengerBotController');


//not needed routers
//let apiRouter = new ApiRouter(middleware, [controller]);
//let staticRouter = new StaticRouter(path.join(__dirname, 'public'), middleware);

MessengerBotMenuService.setMenu([new PostbackButton("help", "MENU_HELP")]);

let controller = new MessengerBotController();

let middleware = new Middleware();
let webhookRouter = new WebhookRouter(middleware, controller);
let server = new Server([webhookRouter]);
server.init();


