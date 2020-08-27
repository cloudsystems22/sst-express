let { sequelize, agentes_riscos } = require('../models');
const riscosController = {
    index:(req, res) =>{

    },
    grupoRiscos:async(req,res) => {
        let { id } = req.session.usuario;
        let gruposRiscos = await agentes_riscos.findAll({ attributes:['tipo'], group:['tipo'] });
        //let riscos = await agentes_riscos.findAll();
        res.send(gruposRiscos);
    },
    riscos:async(req, res) => {
        let riscos = await agentes_riscos.findAll();
        res.send(riscos);
    }

}

module.exports = riscosController;