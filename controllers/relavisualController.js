const { Usuario, niveisAcesso, nivelAcessoUsuario, Clientes, Setores, setores_riscos, perigos_ges, agentes_riscos } = require('../models');
const { Op, Model } = require("sequelize");
const relavisualController = {
    clientespgr:async(req, res) => {
        let { id } = req.session.usuario;
        let usuarioAcesso = await nivelAcessoUsuario.findAll({include:['Usuario', 'niveisAcesso'], where: { usuario_id: id }});
        let clienteSetor = await Clientes.findAll({ 
            include:[{model:Setores, as:'Setores', 
                include:[{
                    model:setores_riscos, as:'setores_riscos', 
                    include:[{
                        model:agentes_riscos, as:'agentes_riscos'
                    }, {
                        model:perigos_ges, as:'perigos_ges'
                    }]
                }]
            }]
        })
        let datasAval = await perigos_ges.findAll({attributes:['data'], group:['data'], include:[{
            model:setores_riscos, as:'setores_riscos', include:[{
                model:Setores, as:'Setores', attributes:['clientes_id']
            }]
        }]});
        //console.log(datasAval);

        res.render('relatorios/clientespgr', { title: 'PGR - Avaliação de Riscos', usuarioAcesso, clienteSetor, datasAval })
    },
    groinicio:async(req, res) => {
        let usuario = req.session.usuario;
        let gersetor = await perigos_ges.findAll({
            include:[{model:setores_riscos, as:'setores_riscos', 
                include:[{model:Setores, as:'Setores'}, {model:agentes_riscos, as: 'agentes_riscos'}]}]
    
    });
        res.send(gersetor);
    },
    clienteSetor:async(req, res) => {
        let { id, data } = req.body;
        console.log(req.data);
        let clienteSetor = await Clientes.findAll({ where:{ id }, 
            include:[{model:Setores, as:'Setores', 
                include:[{
                    model:setores_riscos, as:'setores_riscos', 
                    include:[{
                        model:agentes_riscos, as:'agentes_riscos'
                    }, {
                        model:perigos_ges, as:'perigos_ges', where:{ data }
                    }]
                }]
            }]
        })
        //console.log(clienteSetor);
        res.send(clienteSetor);
    }

}

module.exports = relavisualController;