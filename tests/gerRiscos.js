const { Clientes, Setores, setores_riscos, perigos_ges, agentes_riscos } = require('../models');
const { Op } = require("sequelize");
// Setores.findAll().then(
//     data => {
//         console.log(data.map(s => s.toJSON()));
//     }
// )

perigos_ges.findAll({where:{ data:"2020-06-29" }, include:[{model:setores_riscos, as:'setores_riscos', where:{ setores_id: 11 }, include:[{model:agentes_riscos, as:'agentes_riscos'}]}]}).then(
    data =>{
        console.log(data.map(p => p.toJSON()))
    }
)

// perigos_ges.findAll({ where: { data: '2020-06-29' }}).then(
//     data => {
//         console.log(data.map(p => p.toJSON()));
//     }
// )