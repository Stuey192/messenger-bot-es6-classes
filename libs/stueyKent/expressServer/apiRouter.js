const express = require('express');
const path = require('path');

class ApiRouter  {
  constructor(middleware, controllers) {
    this._controllers = controllers;
    this._middleware = middleware;
    this._route = '/api';
    this._router = express.Router();
    this._router.use(this._middleware.call);

    this._router.route('/').post(this.endPointNotFound);
    this._router.route('/:controller').post(this.endPointNotFound);
    this._router.route('/:controller/:function/*').post(this.endPointNotFound);
    this._router.route('/:controller/:function').post(this.all.bind(this));

    this._router.route('/').get(this.endPointNotFound);
    this._router.route('/:controller').get(this.endPointNotFound);
    this._router.route('/:controller/:function/*').get(this.endPointNotFound);
    this._router.route('/:controller/:function').get(this.all.bind(this));
  }

  endPointNotFound(req, res) {
    res.status(404).json({"message": "end point not found"})
  }

  all(req, res) {

    let requestedController = req.params.controller.toLowerCase();
    let requestedFunction = req.params.function;

    for (let i = 0; i < this._controllers.length; i++) {
      let controller = this._controllers[i];
      let controllerName = controller.constructor.name.toLowerCase();

      if(controllerName === requestedController){
        let fn = controller[requestedFunction];
        if(typeof fn === "function"){
          let response = fn(req.query);
          res.json(response);
          return;
        } else {
          break;
        }
      }
    }

    res.status(404).json({"message": "end point not found"});
  }

  route() {
    return this._route;
  }

  router(){
    return this._router;
  }
}

module.exports = ApiRouter;