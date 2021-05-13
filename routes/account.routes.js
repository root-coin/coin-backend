const router = require('express').Router();
const user = require('../controllers/user.controller');

router.post('/login', user.login);

module.exports = router;
