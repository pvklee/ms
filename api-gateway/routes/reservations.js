var express = require('express');
var router = express.Router();
const reservationsController = require('../controllers/reservations');
const isAuthenticated = require('../services/authenticate').isAuthenticated;

router.post('/create', isAuthenticated, reservationsController.create);
router.get('/my', isAuthenticated, reservationsController.my);
router.get('/', reservationsController.all);

module.exports = router;