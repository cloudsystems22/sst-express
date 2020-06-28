const { Setores, agentes_riscos, setores_riscos, perigos_ges } = require('../models');
const gerencRiscosController = {
    details:async(req,res) => {
        let usuario = req.session.usuario;
        let { id } = req.query;
        let setor = await Setores.findOne({ where: { id }});
        let gruposRiscos = await setores_riscos.findAll({attributes:['setores_id'], group:['tipo', 'setores_id'], include:[{model:Setores, as:'Setores', where:{ id }}, {model:agentes_riscos, as:'agentes_riscos', attributes:['tipo', 'hexadecimal']}]})
        let agentesRiscos = await setores_riscos.findAll({include:[{model:Setores, as:'Setores', where:{ id }}, {model:agentes_riscos, as:'agentes_riscos'}]})
        console.log(agentesRiscos);
        res.render('gro/planilhagro', {setor, gruposRiscos, agentesRiscos});
    },
    create:async(req,res) => {
        let { id } = req.session.usuario;
        let { fase, agentes_riscos_id, danos, fonte_geradora, intensidade, tecnica_util, risco, monitoramento, imgfonte1, imgfonte2, imgfonte3, setores_id } = req.body;
        let data = new Date();
        //console.log(data);
        let riscoGer = await perigos_ges.create({data, fase, agentes_riscos_id, danos, fonte_geradora, intensidade, tecnica_util, risco, monitoramento, imgfonte1, imgfonte2, imgfonte3, setores_id });
        res.send(riscoGer);
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