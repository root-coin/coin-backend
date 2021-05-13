const router = require('express').Router();
const auth = require('../common/auth');
const coin = require('../controllers/coin.controller');

router.get('/coins', coin.getCoinPrice);

module.exports = router;
