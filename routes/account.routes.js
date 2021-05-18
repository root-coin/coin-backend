const router = require('express').Router();
const user = require('../controllers/user.controller');
const auth = require('../common/auth');

router.post('/new', user.checkId, user.new);

router.post('/login', user.createToken);

router.get('/logout', user.logout);

router.post('/info', auth.verifyToken, user.getInfo);

module.exports = router;
