var express = require('express');
var router = express.Router();
var inventoryController = require('../controllers/inventory')

router.post('/create', inventoryController.create)

module.exports = router;
