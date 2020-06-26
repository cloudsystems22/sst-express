const { agentes_riscos, perigos_ges, Setores, setores_riscos } = require('../models');

// Setores.findAll({include:'Clientes'}).then(
//     data => {
//         console.log(data.map(s => s.toJSON()));
//     }
// )
// agentes_riscos.findAll({ attributes:['tipo'], group:['tipo'] }).then(
//     data => {
//         console.log(data.map(r => r.toJSON()));
//     }
// )
// setores_riscos.findAll().then(
//     data => {
//         console.log(data.map(s => s.toJSON()));
//     }
// )

// setores_riscos.findAll({attributes:['setores_id'], group:['tipo', 'setores_id'], include:[{model:Setores, as:'Setores', where:{ clientes_id: 1 }}, {model:agentes_riscos, as:'agentes_riscos', attributes:['tipo', 'hexadecimal']}]}).then(
//     data => {
//         console.log(data.map(s => s.toJSON()));
//     }
// )

setores_riscos.findAll({include:[{model:Setores, as:'Setores', where:{ clientes_id: 1 }}, {model:agentes_riscos, as:'agentes_riscos'}]}).then(
    data => {
        console.log(data.map(s => s.toJSON()));
    }
)

// agentes_riscos.findAll({where:{ tipo:'Físicos'}}).then(
//     data => {
//         console.log(data.map(r => r.toJSON()))
//     }
// )

// let print = async() => {
//     let riscos = await agentes_riscos.findAll();
//     let riscosFisicos = riscos.filter( r => r.tipo == 'Físicos');
//     console.log(riscosFisicos);
// }

// print();

