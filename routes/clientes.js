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

const clientesController = require('../controllers/clientesController');
const authMiddlewares = require('../middlewares/authMiddleware');

router.get('/', authMiddlewares, clientesController.index);
router.post('/create', authMiddlewares, clientesController.create);
router.get('/details', authMiddlewares, clientesController.details);
router.post('/update', authMiddlewares, clientesController.update);
router.post('/delete', authMiddlewares, clientesController.delete);

module.exports = router;