const jwt = require('jsonwebtoken');

const KEY = process.env.TOKEN_KEY;

exports.verifyToken = (req, res, next) => {
  try {
    const { loginTK } = req.cookies;
    console.log(req.cookies);
    if (!loginTK) {
      res.status(401).json({ error: 'Token information is not provided.' });
      return;
    }

    const decoded = jwt.verify(loginTK, KEY);

    if (decoded) {
      res.locals.userId = decoded.userId;
      res.locals.userPassword = decoded.userPassword;
      res.locals.userNickname = decoded.userNickname;
      next();
    } else {
      res.status(401).json({ error: 'Token expired.' });
    }
  } catch (err) {
    res.status(401).json({ error: err });
  }
};
