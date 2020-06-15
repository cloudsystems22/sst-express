const { agentes_riscos, perigos_ges } = require('../models');
const gerencRiscosController = {
    create:async(req,res) => {
        let { id } = req.session.usuario;
        let { fase, agentes_riscos_id, danos, fonte_geradora, intensidade, tecnica_util, risco, monitoramento, imgfonte1, imgfonte2, imgfonte3, setores_id } = req.body;
        let data = new Date();
        //console.log(data);
        let riscoGer = await perigos_ges.create({data, fase, agentes_riscos_id, danos, fonte_geradora, intensidade, tecnica_util, risco, monitoramento, imgfonte1, imgfonte2, imgfonte3, setores_id });
        res.send(riscoGer);
    },
    grupos:async(req,res) => {
        let { id } = req.session.usuario;
        let { setores_id } = req.body;
        let gruposRiscos = await perigos_ges.findAll({where:{ setores_id }, attributes:['setores_id'], group:['tipo'], include:[{model:agentes_riscos, as:'agentes_riscos', attributes:['id', 'tipo']}]});
        res.send(gruposRiscos);
    },
    agentes:async(req,res) =>{
        let { id } = req.session.usuario;
        let { setores_id, tipo } = req.body;
        let agentesRiscos = await perigos_ges.findAll({where:{ setores_id }, include:[{model:agentes_riscos, as:'agentes_riscos', where:{ tipo }}]});
        res.send(agentesRiscos);

    },
    update:async(req,res) => {

    },
    delete:async(req,res) => {
        let { id, tipo } = req.body;
        console.log(req.body);
        await perigos_ges.destroy({
            where: { id }
        })
        let agentesRiscos = await perigos_ges.findAll({include:[{model:agentes_riscos, as: 'agentes_riscos', where:{ tipo }}]})
        //console.log(agentesRiscos);
        res.send(agentesRiscos);
    }
}

module.exports = gerencRiscosController;