const router = require('express').Router();
const auth = require('../common/auth');
const coin = require('../controllers/coin.controller');

router.get('/coins', coin.getCoinsPrice);

router.get('/chart/:coinId', coin.getCoinChart);

router.post('/save-data', coin.saveInfo);

router.post('/transaction/buy/:coinId', auth.verifyToken, coin.buy);

module.exports = router;
