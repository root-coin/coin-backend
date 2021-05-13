const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const KEY = process.env.TOKEN_KEY;

exports.createToken = async (req, res) => {
  const user = new User(req.body);

  const resultCallback = (err, data) =>
    crypto.pbkdf2(
      req.body.userPassword,
      data.salt,
      100000,
      64,
      'sha512',
      (cryptoErr, derivedKey) => {
        if (cryptoErr) {
          throw cryptoErr;
        }
        if (derivedKey.toString('hex') === data.user_password) {
          const token = jwt.sign(
            {
              userId: userInfo.userId,
              userName: userInfo.userName,
              phoneNo: userInfo.phoneNo,
              orgCode: userInfo.orgCode,
              userType: userInfo.userType,
            },
            KEY,
            {
              expiresIn: process.env.TOKEN_EXPIRE,
            }
          );
          res.cookie('loginTK', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'None',
          });
          res.status(200).send({ result: 'sucess' });
        } else {
          res.status(400).send({ result: 'fail' });
        }
      }
    );

  User.read(user, resultCallback);
};

exports.logout = (req, res) => {
  res.cookie('loginTK', '', {
    httpOnly: true,
    secure: false,
    sameSite: 'None',
  });

  res.status(200).send({ msg: 'Logged out' });
};

exports.new = (req, res, next) => {
  const user = new User(req.body);

  crypto.randomBytes(64, (randomErr, buf) => {
    if (randomErr) {
      throw randomErr;
    }
    const salt = buf.toString('hex');
    crypto.pbkdf2(
      user.user_password,
      salt,
      100000,
      64,
      'sha512',
      (encryptErr, derivedKey) => {
        if (encryptErr) {
          throw encryptErr;
        }
        user.userPassword = derivedKey.toString('hex');
        user.salt = salt;
        User.create(user, (err, result) => {
          if (err) {
            res.status(500).send({ err });
            return;
          }
          res.status(200).send({ result });
        });
      }
    );
  });
};
