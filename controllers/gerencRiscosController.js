const { Setores, agentes_riscos, setores_riscos, perigos_ges } = require('../models');
const { Op } = require("sequelize");
const gerencRiscosController = {
    details:async(req,res) => {
        let usuario = req.session.usuario;
        let { id } = req.query;
        let setor = await Setores.findOne({ where: { id }});
        let gruposRiscos = await setores_riscos.findAll({attributes:['setores_id'], group:['tipo', 'setores_id'], include:[{model:Setores, as:'Setores', where:{ id }}, {model:agentes_riscos, as:'agentes_riscos', attributes:['tipo', 'hexadecimal']}]})
        let agentesRiscos = await setores_riscos.findAll({include:[{model:Setores, as:'Setores', where:{ id }}, {model:agentes_riscos, as:'agentes_riscos'}]})
        //console.log(agentesRiscos);
        res.render('gro/planilhagro', {setor, gruposRiscos, agentesRiscos});
    },
    create:async(req,res) => {
        let { id } = req.session.usuario;
        let { data, fase, agentes_riscos_id, descr_risco, lim_expo, danos, fonte_geradora, intensidade, tecnica_util, pequ, grand, risco, inn, defin_acoe, monitoramento, setores_riscos_id } = req.body;
        //console.log(req.body);
        let riscoGer = await perigos_ges.create({data, fase, agentes_riscos_id, descr_risco, lim_expo, danos, fonte_geradora, intensidade, tecnica_util, pequ, grand, risco, inn, defin_acoe, monitoramento, setores_riscos_id });
        //console.log(riscoGer);
        let riscoGes = await perigos_ges.findAll({where:{ id:riscoGer.id }, include:[{model:setores_riscos, as:'setores_riscos', include:[{model:agentes_riscos, as:'agentes_riscos'}]}]});
        res.send(riscoGes);
    },
    carrega:async(req,res) => {
        let { setores_id, data } = req.body;
        let riscoGes = await perigos_ges.findAll({where:{ data }, include:[{model:setores_riscos, as:'setores_riscos', where:{ setores_id }, include:[{model:agentes_riscos, as:'agentes_riscos'}]}]});
        //console.log(riscoGes);
        res.send(riscoGes);
    },
    update:async(req,res) => {
        //let { id } = req.session.usuario;
        let { id, data, fase, agentes_riscos_id, descr_risco, lim_expo, danos, fonte_geradora, intensidade, tecnica_util, pequ, grand, risco, inn, defin_acoe, monitoramento, setores_riscos_id } = req.body;
        let riscoGer = await perigos_ges.update({data, fase, agentes_riscos_id, descr_risco, lim_expo, danos, fonte_geradora, intensidade, tecnica_util, pequ, grand, risco, inn, defin_acoe, monitoramento, setores_riscos_id }, {where: { id }});
        console.log(riscoGer);
        res.send(riscoGer);
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