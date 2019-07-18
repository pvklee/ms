var express = require('express');
var router = express.Router();
const restaurantsController = require('../controllers/restaurants');
const isAuthenticated = require('../services/authenticate').isAuthenticated;

router.post('/create', isAuthenticated, restaurantsController.create);
router.get('/', restaurantsController.all);

module.exports = router;
