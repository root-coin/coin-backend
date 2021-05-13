const router = require('express').Router();
const auth = require('../common/auth');
const grow = require('../controllers/grow.controller');

router.post('/save', auth.verifyToken, grow.saveStatus);

router.get('/load', auth.verifyToken, grow.loadStatus);

module.exports = router;