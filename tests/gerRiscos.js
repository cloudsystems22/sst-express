const { Clientes, Setores, setores_riscos, perigos_ges, agentes_riscos } = require('../models');
const { Op } = require("sequelize");
// Setores.findAll().then(
//     data => {
//         console.log(data.map(s => s.toJSON()));
//     }
// )

// perigos_ges.findAll({where:{ data:"2020-06-29" }, include:[{model:setores_riscos, as:'setores_riscos', where:{ setores_id: 11 }, include:[{model:agentes_riscos, as:'agentes_riscos'}]}]}).then(
//     data =>{
//         console.log(data.map(p => p.toJSON()))
//     }
// )

// perigos_ges.findAll({include:[{where:{id:32}, model:setores_riscos, as:'setores_riscos', include:[{model:agentes_riscos, as:'agentes_riscos'}]}]}).then(
//     data => {
//         console.log(data.map(p => p.toJSON()));
//     }
// )
// perigos_ges.findAll({include:[
//     {
//         where:{id:32}, 
//         model:setores_riscos, as:'setores_riscos', 
//             include:[{model:Setores, as:'Setores', include:[{model:Clientes, as:'Clientes'}]}, {model:agentes_riscos, as: 'agentes_riscos'}]
//     }
// ]}).then(
//     data => {
//         console.log(data.map(p => p.toJSON()));
//     }
// )
perigos_ges.findAll({attributes:['data'], group:['data'], where:{ data:'2020-07-01' }, include:[{
    model:setores_riscos, as:'setores_riscos', include:[{
        model:Setores, as:'Setores', attributes:['clientes_id'], where:{ clientes_id:2 }
    }]
}]}).then(
    data => {
        console.log(data.map(p => p.toJSON()));
    }
)


