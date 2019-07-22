var express = require('express');
var router = express.Router();
var venuesController = require('../controllers/venues')

router.post('/create', venuesController.create)
router.get('/', venuesController.all);
router.get('/:venueId', venuesController.detail);

module.exports = router;