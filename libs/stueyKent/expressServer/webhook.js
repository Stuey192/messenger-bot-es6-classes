const express = require('express');

class Webhook  {
  constructor() {
    this._router = express.Router();
    //routes
    this._router.route('/*').post(this.all)
  }

  all(req, res) {
    res.json({"message":"webhook"});
  }

  get router(){
    return this._router;
  }
}

module.exports = Webhook;
