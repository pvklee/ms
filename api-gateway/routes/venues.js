var express = require('express');
var router = express.Router();
const venuesController = require('../controllers/venues');
const isAuthenticated = require('../services/authenticate').isAuthenticated;

router.post('/create', isAuthenticated, venuesController.create);
router.get('/my', isAuthenticated, venuesController.my);
router.get('/', venuesController.all);
router.get('/:venueId', venuesController.detail)

module.exports = router;
