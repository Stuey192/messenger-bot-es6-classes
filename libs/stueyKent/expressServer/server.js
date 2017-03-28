const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

class Server  {
  constructor(routers) {
    this._port = process.env.PORT || 8080;
    this._routers = routers;

    this._app = express();
    this._app.use(bodyParser.urlencoded({extended: true}));
    this._app.use(bodyParser.json());
    this._app.use(express.static(path.join(__dirname, 'public')))
  }

  init(){
    for (let i = 0; i < this._routers.length; i++) {
      let router = this._routers[i];
      this._app.use(router.route(), router.router());
    }

    this._app.listen(this._port);

    console.log('Science happening on port', this._port)
  }
}

module.exports = Server;



