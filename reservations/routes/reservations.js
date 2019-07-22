var express = require('express');
var router = express.Router();
var reservationsController = require('../controllers/reservations')

router.get('/', reservationsController.all);
router.get('/my', reservationsController.my);
router.post('/create', reservationsController.create);
router.get('/venue/:venueId', reservationsController.fromVenueId);
module.exports = router;