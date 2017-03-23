const express = require('express');
const bodyParser = require('body-parser');

let Api = require('./api');
let Webhook = require('./webhook');

class Server  {
  constructor() {
    this._port = process.env.PORT || 8080;
    this._api = new Api();
    this._webhook = new Webhook();
    this._app = express();
    this._app.use(bodyParser.urlencoded({extended: true}));
    this._app.use(bodyParser.json());
  }

  init(){
    this._app.use('/api', this._api.router);
    this._app.use('/webhook', this._webhook.router);
    this._app.listen(this._port);
    console.log('Science happening on port', this._port)
  }
}

module.exports = Server;