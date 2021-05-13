const router = require('express').Router();
const auth = require('../common/auth');
const coin = require('../controllers/coin.controller');

router.get('/coins', coin.getCoinsPrice);

router.get('/chart/:coinId', coin.getCoinPrice);

router.post('/save-data', coin.saveInfo);

module.exports = router;
