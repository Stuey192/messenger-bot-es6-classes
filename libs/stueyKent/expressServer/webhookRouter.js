const express = require('express');
const path = require('path');

class ApiRouter  {
  constructor(middleware, controller) {
    this._controller = controller;
    this._middleware = middleware;
    this._route = '/webhook';
    this._router = express.Router();
    this._router.use(this._middleware.call);

    this._router.route('/').get(this.handleHandshake.bind(this));
    this._router.route('/').post(this.handleEntries.bind(this));
  }

  handleHandshake(req, res) {
    if (req.query['hub.verify_token'] === process.env.verify_token) {
      res.send(req.query['hub.challenge']);
    } else {
      res.send('Invalid verify token');
    }
  }

  handleEntries(req, res) {
    let entries = req.body.entry;

    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i];
      for (let j = 0; j < entry.messaging.length; j++) {
        let messaging = entry.messaging[j];
        this._controller.MessageReceived(messaging);
      }
    }
    res.sendStatus(200);
  }

  route() {
    return this._route;
  }

  router(){
    return this._router;
  }
}

module.exports = ApiRouter;