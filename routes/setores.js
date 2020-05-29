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

const setoresController = require('../controllers/setoresController');
const authMiddlewares = require('../middlewares/authMiddleware');

router.post('/create', authMiddlewares, setoresController.create);
router.post('/update', authMiddlewares, setoresController.update);