const db = require('../common/db');

class Grow {
  constructor(grow){
    this.user = grow.user || '';
    this.level = grow.level || '';
    this.humidity = grow.humidity || '';
    this.hungry = grow.hungry || '';
  }

  static create(grow, resultCallback){
    const dbResultCallback = (err, data) => {
      if(err){
        console.log('Error at Grow.create\n', err);
          resultCallback(err, data);
        }
      else{
        console.log("Success\n", data);
        resultCallback(null, 'Save Complete');
      }
    };
    console.log(grow);
    const createGrow = {
      dataType: {S: 'grow'},
      id: {S: grow.user},
      level: {N: String(grow.level)},
      humidity: {N: String(grow.humidity)},
      hungry: {N: String(grow.hungry)}
    };
    console.log(createGrow);
    db.create(createGrow, dbResultCallback);
  }

  static read(grow, resultCallback){
    let res;
    const dbResultCallback = (err, data) => {
      if (err) {
        console.log('Error at db.read\n', err);
        resultCallback(err, data);
      } else {
        console.log('Success\n', data);
        if (data) {
          res = {
            level: Number(data.level.N),
            humidity: Number(data.humidity.N),
            hungry: Number(data.hungry.N)
          };
        } else {
          res = null;
        }
        resultCallback(null, res);
      }
    };
    console.log(grow);
    const readData = {
        dataType: {S: 'grow'},
        id: {S: grow.user }
    };
    db.read(readData, dbResultCallback);
  }
}

module.exports = Grow;