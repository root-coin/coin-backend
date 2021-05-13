const router = require('express').Router();
const user = require('../controllers/user.controller');
const auth = require('../common/auth');

router.post('/new', user.checkId, user.new);

router.post('/login', auth.verifyToken, user.createToken);

router.get('/logout', user.logout);

module.exports = router;
