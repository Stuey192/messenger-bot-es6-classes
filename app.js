const path = require('path');

//not needed imports
//const ApiRouter = require("./libs/stueyKent/expressServer/apiRouter");
//const StaticRouter = require("./libs/stueyKent/expressServer/staticRouter");

//imports
const Middleware = require("./libs/stueyKent/expressServer/middleware");
const WebhookRouter = require("./libs/stueyKent/expressServer/webhookRouter");
const Server = require("./libs/stueyKent/expressServer/server");

const MessengerBotController = require('./libs/stueyKent/controllers/messengerBotController');


//not needed routers
//let apiRouter = new ApiRouter(middleware, [controller]);
//let staticRouter = new StaticRouter(path.join(__dirname, 'public'), middleware);

let controller = new MessengerBotController();

let middleware = new Middleware();
let webhookRouter = new WebhookRouter(middleware, controller);
let server = new Server([webhookRouter]);
server.init();


