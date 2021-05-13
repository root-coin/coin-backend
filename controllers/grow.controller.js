const Grow = require('../models/grow.model');

exports.saveStatus = (req, res) => {
  const grow = new Grow(req.body);
  grow.user = res.locals.userId;
  const resultCallback = (err, data) => {
    if(err){
      console.log("Error at saveStatus: ", err);
      res.status(500).send({
        result: "Internal Error"
      });
      return;
    }
    else{
      res.status(200).send({
        result: data
      });
      return;
    }
  }
  Grow.create(grow, resultCallback);
}

exports.loadStatus = (req, res) => {
  const grow = new Grow(req.body);
  grow.user = res.locals.userId;
  const resultCallback = (err, data) => {
    if(err){
      console.log("Error at loadStatus: ", err);
      res.status(500).send({
          result: "Internal Error"
      });
      return;
    }else{
      res.status(200).send({
        result: "success",
        Item: data
      });
      return;
    }
  }
  Grow.read(grow, resultCallback);
}