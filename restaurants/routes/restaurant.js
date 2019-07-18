var express = require('express');
var router = express.Router();
var restaurantController = require('../controllers/restaurant')

router.post('/create', restaurantController.create)
router.get('/', restaurantController.all);

module.exports = router;