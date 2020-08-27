const { Usuario } = require('../../models');
var jwt = require('jsonwebtoken');
//const authToken = require('../../config/auth');

const usersAPIController = {
    index:async(req, res) => {
        await Usuario.findAll()
        .then(usuario => {
            return res.status(200).json(usuario)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
    },
    searchById:async(req, res) => {
        let { id } = req.body;
        await Usuario.findByPk({ where: { id }})
        .then(usuario =>{
            return res.status(200).json(usuario)
        })
        .catch(error => {
            return res.status(400).json(error);
        })
    }
}

module.exports = usersAPIController;