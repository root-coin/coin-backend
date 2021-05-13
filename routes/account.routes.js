const router = require('express').Router();
const user = require('../controllers/user.controller');

router.post('/new', user.createToken);

router.post('/login', user.login);

module.exports = router;
