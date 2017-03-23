const express = require('express');
let ApiMiddleware = require("./middleware/apiMiddleware");

class Api  {
  constructor() {
    this.middleware = new ApiMiddleware();
    this._router = express.Router();

    //middleware
    this._router.use(this.middleware.call);

    //routes
    this._router.route('/test').post(this.test)
  }

  test(req, res) {
    res.json({"message":"test"});
  }

  get router(){
    return this._router;
  }
}

module.exports = Api;