var db = require("../common/db");

class User {
  constructor(user) {
    this.user_id = user.userId || '';
    this.user_password = user.userPassword || '';
    this.user_nickname = user.userNickname || '';
  }

  static create(user, resultCallback) {
    console.log(user);
    var createData = {
      'dataType': {S: 'user'},
      'id': {S: user.user_id},
      'password': {S: user.user_password},
      'nickname': {S: user.user_nickname},
      'salt': {S: user.salt}
    }
    var res = db.create(createData);
    if(res == 1){
      console.log("Error at User.create\n");
    }
    resultCallback(null, 'good');
  }

  static update(user, resultCallback) {
    this.create(user, resultCallback);
  }

  static read(user, resultCallback) {
    console.log(user);
    var readData = {
      'dataType': {S: 'user'},
      'id': user.user_id
    };
    var res = db.read(readData);
    if(res == 1){
      console.log("Error at User.read()");
    }
    resultCallback(null, res);
  }

  static delete(user, resultCallback) {
    console.log(user)
  }
}

module.exports = User;
