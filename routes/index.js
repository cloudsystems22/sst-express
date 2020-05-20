var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController');
const authMiddlewares = require('../middlewares/authMiddleware');

/* GET home page. */
router.get('/', authMiddlewares, usersController.index);



module.exports = router;
