var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController');


/* GET users listing. */
router.get('/cadastro', usersController.cadastro);
router.post('/cadastro', usersController.insert);

//Login
router.get('/login', usersController.login);
router.post('/login', usersController.logar);

module.exports = router;
