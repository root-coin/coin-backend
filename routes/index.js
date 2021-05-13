const express = require('express');
const router = express.Router();
const account = require('./account.routes');
const trade = require('./trade.routes');
const grow = require('./grow.routes');

router.use('/account', account);

router.use('/trade', trade);

router.use('/grow', grow);

module.exports = router;
