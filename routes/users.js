var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController');

/* GET users listing. */
router.get('/', usersController.login);
router.get('/cadastro', usersController.cadastro);
router.post('/cadastro', usersController.insert)

module.exports = router;
