var express = require('express');
var router = express.Router();

const setoresRiscosController = require('../controllers/setoresRiscosController');
const authMiddlewares = require('../middlewares/authMiddleware');

router.post('/create', authMiddlewares, setoresRiscosController.create);
router.post('/update', authMiddlewares, setoresRiscosController.update);
router.delete('/delete', authMiddlewares, setoresRiscosController.delete);

router.post('/grupos', authMiddlewares, setoresRiscosController.grupos);
router.post('/agentes', authMiddlewares, setoresRiscosController.agentes);
module.exports = router;