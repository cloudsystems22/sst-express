var express = require('express');
var router = express.Router();

const riscosController = require('../controllers/riscosController');
const authMiddlewares = require('../middlewares/authMiddleware');

router.post('/list', authMiddlewares, riscosController.lista);

module.exports = router;