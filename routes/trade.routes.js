const router = require('express').Router();
const auth = require('../common/auth');
const coin = require('../controllers/coin.controller');

router.get('/coins', coin.getCoinPrice);

router.get('/chart/:coinId', coin.getCoinsPrice);

router.post('/save-data', coin.saveInfo);

module.exports = router;
