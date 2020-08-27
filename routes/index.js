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
let upload = multer({ storage: storage})

const usersController = require('../controllers/usersController');
const licensaController = require('../controllers/licensaController');
const authMiddlewares = require('../middlewares/authMiddleware');

/* GET home page. */
router.get('/', authMiddlewares, usersController.index);

// Licensa do sistema
router.get('/licensa', authMiddlewares, licensaController.index);
router.post('/licensa', authMiddlewares, licensaController.create);
router.post('/show', authMiddlewares, licensaController.listar);
router.post('/update', authMiddlewares, licensaController.update);
router.post('/uplogo', authMiddlewares, upload.any(), licensaController.uplogo);



module.exports = router;
