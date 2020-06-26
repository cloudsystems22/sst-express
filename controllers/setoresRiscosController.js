let { sequelize, Setores, setores_riscos, agentes_riscos } = require('../models');
const setoresRiscosController = {
    create:async(req,res) => {
        let usuario = req.session.usuario;
        let { setores_id, agentes_riscos_id } = req.body;
        let setoresRiscos = await setores_riscos.create({ setores_id, agentes_riscos_id });
        res.send(setoresRiscos);
    },
    update:async(req,res) => {

    },
    delete:async(req,res) => {
        let { id, tipo } = req.body;
        await setores_riscos.destroy({
            where: { id }
        })
        let agentesRiscos = await setores_riscos.findAll({include:[{model:agentes_riscos, as: 'agentes_riscos', where:{ tipo }}]})
        //console.log(agentesRiscos);
        res.send(agentesRiscos);
    },
    grupos:async(req,res) =>{
        let { setores_id } = req.body;
        let riscosSetores = await setores_riscos.findAll({where:{ setores_id }, attributes:['setores_id'], group:['tipo'], include:[{model:agentes_riscos, as:'agentes_riscos', attributes:['tipo', 'hexadecimal']}]});
        res.send(riscosSetores);
    },
    agentes:async(req,res) =>{
        let { id } = req.session.usuario;
        let { setores_id, tipo } = req.body;
        let agentesRiscos = await setores_riscos.findAll({where:{ setores_id }, include:[{model:agentes_riscos, as:'agentes_riscos', where:{ tipo }}]});
        res.send(agentesRiscos);

    },
}

module.exports = setoresRiscosController;
