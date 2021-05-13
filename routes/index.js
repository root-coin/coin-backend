const express = require('express');
const router = express.Router();
const account = require('./account.routes');
const trade = require('./trade.routes');

router.use('/account', account);

router.use('/trade', trade);

module.exports = router;
