const { agentes_riscos, perigos_ges, Setores, Clientes } = require('../models');


perigos_ges.findAll({ where:{ setores_id: 69 }, attributes:['id', 'setores_id'], include:[{model:Setores, as:'Setores'}], include:[{model:agentes_riscos, as:'agentes_riscos'}]}).then(
    data => {
        console.log(data.map(p => p.toJSON()));
    }
)
// let setores_id = 69;
// let tipo = 'Biológicos';
// //let riscos = [{tipo:"Físicos", risco:"Ruídos"}, {tipo:"Químicos", risco:"Poeiras"},{tipo:"Químicos", risco:"Óleos"}];
// let riscos = [];
// perigos_ges.findAll({where:{ setores_id: 69 }, attributes:['id', 'setores_id', 'risco'], include:[{model:agentes_riscos, as:'agentes_riscos'}]}).then(
//     data=> {
//         let lista = data.map(p => p.toJSON());
//         lista.forEach(array =>{
//             riscos.push({id:array.id, tipo:array.agentes_riscos.tipo, risco:array.agentes_riscos.risco})
//         })
//         let agrupados = groupBy(riscos, 'tipo');
//         console.log(agrupados);
//     }
// );

// function groupBy(array, prop){
//     let result = array.reduce(function(total, item) {
//         let key = item[prop]
//         total[key] = (total[key] || []).concat(item);
//         return total;
//     }, {});

//     return result
// }

