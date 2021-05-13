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
              userId: data.user_id,
              userPassword: data.user_password,
              userNickname: data.user_nickname,
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
  console.log(user);
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
        user.user_password = derivedKey.toString('hex');
        user.salt = salt;
        console.log(user);
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

exports.checkId = (req, res, next) => {
  const user = new User(req.body);
  User.read(user, (err, result) => {
    if (err) {
      res.status(500).send({ err });
      return;
    }
    if (result) {
      res.status(409).send({ err: 'not uniform' });
    } else {
      next();
    }
  });
};
