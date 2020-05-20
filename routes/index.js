var express = require('express');
var router = express.Router();

const authController = require('../controllers/usersController');

/* GET home page. */
router.get('/', authController.index);

module.exports = router;
