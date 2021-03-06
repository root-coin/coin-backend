const express = require('express');
const path = require('path');

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const index = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(
  cors({
    origin: 'http://example.com',
    credentials: true, // cors, axios에서 둘 다 true로
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).json({
    Message: 'Nothing to show',
  });
});

app.use('/static', express.static('public'));
app.use('/api', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ err });
});

app.listen(process.env.PORT || 3000, () =>
  console.log('Example app listening on port 3000!')
);

module.exports = app;
