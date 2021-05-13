const router = require('express').Router();
const user = require('../controllers/user.controller');

router.post('/new', user.new);

router.post('/login', user.createToken);

module.exports = router;
