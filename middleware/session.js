



const sessionMiddleware = (req, res, next) => {
    console.log(req.session);
    next();
  }




  module.exports = {sessionMiddleware}