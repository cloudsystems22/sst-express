var express = require('express');
var router = express.Router();

const relavisualController = require('../controllers/relavisualController');
const authMiddlewares = require('../middlewares/authMiddleware');

router.get('/', authMiddlewares, relavisualController.clientespgr);
router.get('/groinicio', authMiddlewares, relavisualController.groinicio);
router.post('/clienteSetor', authMiddlewares, relavisualController.clienteSetor);


module.exports = router;