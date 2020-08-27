var express = require('express');
var router = express.Router();

const riscosController = require('../controllers/riscosController');
const authMiddlewares = require('../middlewares/authMiddleware');

router.post('/', authMiddlewares, riscosController.riscos);
router.post('/grupoRiscos', authMiddlewares, riscosController.grupoRiscos);
//router.post('/riscos', authMiddlewares, riscosController.riscos);

module.exports = router;