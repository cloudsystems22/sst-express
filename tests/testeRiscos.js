const { agentes_riscos, perigos_ges } = require('../models');

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

agentes_riscos.findAll({include:[{model:perigos_ges, as:'perigos_ges'}]}).then(
    data =>{
        console.log(data.map(r => r.toJSON()));
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
