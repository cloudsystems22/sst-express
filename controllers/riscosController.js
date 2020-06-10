let { sequelize, agentes_riscos } = require('../models');
const riscosController = {
    index:(req, res) =>{

    },
    lista:async(req,res) => {
        let { id } = req.session.usuario;
        let riscos = await agentes_riscos.findAll();
        res.send(riscos);
    }
}

module.exports = riscosController;