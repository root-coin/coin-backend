var db = require("../common/db");

class User {
  constructor(user) {
    this.user_id = user.userId || '';
    this.user_password = user.userPassword || '';
    this.user_nickname = user.userNickname || '';
  }

  static create(user, resultCallback) {
    const dbResultCallback = (err, data) =>{
      if(err){
        console.log("Error at db.create\n", err);
      }
      else{
        console.log("Success\n", data);
      }
    }
    console.log(user);
    var createData = {
      'dataType': {S: 'user'},
      'id': {S: user.user_id},
      'password': {S: user.user_password},
      'nickname': {S: user.user_nickname},
      'salt': {S: user.salt}
    }
    db.create(createData, dbResultCallback);
    resultCallback(null, 'good');
  }

  static update(user, resultCallback) {
    this.create(user, resultCallback);
  }

  static read(user, resultCallback) {
    console.log(user);
    var res;
    const dbResultCallback = (err, data) =>{
      if(err){
        console.log("Error at db.read\n", err);
      }
      else{
        console.log("Success\n", data);
        res = {
          "user_id": data.id.S,
          "user_password": data.password.S,
          "user_nickname": data.nickname.S,
          "salt": data.salt.S
        }
      }
    }
    var readData = {
      'dataType': {S: 'user'},
      'id': user.user_id
    };
    db.read(readData, dbResultCallback);
    resultCallback(null, res);
  }

  static delete(user, resultCallback) {
    console.log(user);
    const dbResultCallback = (err, data) =>{
      if(err){
        console.log("Error at db.delete\n", err);
      }
      else{
        console.log("Success\n", data);
      }
    }
    var deleteData = {
      'dataType': {S: 'user'},
      'id': user.user_id
    };
    db.delete(deleteData, dbResultCallback);
    resultCallback(null, res);
  }
}

module.exports = User;
