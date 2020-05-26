var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController');
const licensaController = require('../controllers/licensaController');
const authMiddlewares = require('../middlewares/authMiddleware');

/* GET home page. */
router.get('/', authMiddlewares, usersController.index);

// Licensa do sistema
router.get('/licensa', authMiddlewares, licensaController.index);
router.post('/licensa', authMiddlewares, licensaController.create);
router.post('/show', authMiddlewares, licensaController.licensa);



module.exports = router;
