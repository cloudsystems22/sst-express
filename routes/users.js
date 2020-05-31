var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController');
const usersAPIController = require('../controllers/api/usersAPIController');

/* GET users listing. */
router.get('/cadastro', usersController.cadastro);
router.post('/cadastro', usersController.insert);

//Login
router.get('/login', usersController.login);
router.post('/login', usersController.logar);


//Controle de API Usuario
router.get('/api/usuarios', usersAPIController.index);
router.post('/api/usuarios', usersAPIController.searchById);

module.exports = router;
