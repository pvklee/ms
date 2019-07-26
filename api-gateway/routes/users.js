var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users');
const isAuthenticated = require('../services/authenticate').isAuthenticated;

router.post('/', usersController.signup);
router.post('/login', usersController.login);
router.get('/current', isAuthenticated, usersController.current);

module.exports = router;
