
class Middleware  {
  constructor() {}

  call(req, res, next){
    //console.log('Something is happening.');
    next();
  }
}

module.exports = Middleware;