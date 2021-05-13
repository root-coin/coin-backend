var db = require('../common/db');
const moment = require('moment');
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
    const createData2 = {
      dataType: { S: 'userPoint' },
      id: { S: user.user_id },
      point: { N: '1000000' },
    };
    db.create(createData, dbResultCallback);
    db.create(createData2, (err, result) => {
      console.log(err, result);
    });
  }

  static update(user, resultCallback) {
    this.create(user, resultCallback);
  }

  static read(user, resultCallback) {
    console.log('User.read: ', user);
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

  static buy(userId, coinData, needPoint, resultCallback) {
    const key = {
      dataType: { S: 'userPoint' },
      id: { S: userId },
    };
    db.read(key, (err, data) => {
      if (err) {
        resultCallback(err, null);
        return;
      }
      console.log(data);
      const resultPoint = data.point.N - needPoint;
      if (resultPoint < 0) {
        resultCallback(null, { status: 400, msg: 'oring' });
        return;
      }
      const createData = {
        dataType: { S: 'userPoint' },
        id: { S: userId },
        point: { N: String(resultPoint) },
      };
      db.create(createData, (err, result) => {
        if (err) {
          resultCallback(err, null);
          return;
        }
        const createData = {
          dataType: { S: 'userTrade' },
          id: { S: moment().format() },
          coinId: { S: coinData.id },
          quantity: { N: String(coinData.quantity) },
          price: { N: String(coinData.price) },
          point: { N: String(needPoint) },
          userId: { S: userId },
        };
        db.create(createData, (err, result) => {
          if (err) {
            resultCallback(err, null);
            return;
          }
          const createData = {
            dataType: { S: 'userCoin' },
            id: { S: moment().format() },
            coinId: { S: coinData.id },
            quantity: { N: String(coinData.quantity) },
            userId: { S: userId },
          };
          db.create(createData, (err, result) => {
            if (err) {
              resultCallback(err, null);
              return;
            }
            resultCallback(null, result);
          });
        });
      });
    });
  }
}

module.exports = User;
