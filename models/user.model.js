var db = require('../common/db');

class User {
  constructor(user) {
    this.user_id = user.userId || '';
    this.user_password = user.userPassword || '';
    this.user_nickname = user.userNickname || '';
  }

  static create(user, resultCallback) {
    const dbResultCallback = (err, data) => {
      if (err) {
        console.log('Error at db.create\n', err);
        resultCallback(err, data);
      } else {
        console.log('Success\n', data);
        resultCallback(null, 'good');
      }
    };
    console.log(user);
    const createData = {
      dataType: { S: 'user' },
      id: { S: user.user_id },
      password: { S: user.user_password },
      nickname: { S: user.user_nickname },
      salt: { S: user.salt },
    };
    db.create(createData, dbResultCallback);
  }

  static update(user, resultCallback) {
    this.create(user, resultCallback);
  }

  static read(user, resultCallback) {
    console.log("User.read: ", user);
    let res;
    const dbResultCallback = (err, data) => {
      if (err) {
        console.log('Error at db.read\n', err);
        resultCallback(err, data);
      } else {
        console.log('Success\n', data);
        if (data) {
          res = {
            user_id: data.id.S,
            user_password: data.password.S,
            user_nickname: data.nickname.S,
            salt: data.salt.S,
          };
        } else {
          res = null;
        }
        resultCallback(null, res);
      }
    };
    const readData = {
      dataType: { S: 'user' },
      id: { S: user.user_id },
    };
    db.read(readData, dbResultCallback);
  }

  static delete(user, resultCallback) {
    console.log(user);
    const dbResultCallback = (err, data) => {
      if (err) {
        console.log('Error at db.delete\n', err);
        resultCallback(err, data);
      } else {
        console.log('Success\n', data);
        resultCallback(null, data);
      }
    };
    var deleteData = {
      dataType: { S: 'user' },
      id: user.user_id,
    };
    db.delete(deleteData, dbResultCallback);
  }
}

module.exports = User;
