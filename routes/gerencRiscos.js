var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
let storage = multer.diskStorage ({
    destination: (req, file, cb) =>{
        cb(null, path.join('public', 'images', 'logos'));
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);

    }
});
let upload = multer({ storage: storage});

const gerencRiscosController = require('../controllers/gerencRiscosController');
const authMiddlewares = require('../middlewares/authMiddleware');

router.get('/', authMiddlewares, gerencRiscosController.details)
router.post('/create', authMiddlewares, gerencRiscosController.create);
router.post('/update', authMiddlewares, gerencRiscosController.update);
router.post('/delete', authMiddlewares, gerencRiscosController.delete);

module.exports = router;