const { agentes_riscos, perigos_ges } = require('../models');


// perigos_ges.findAll({where:{ setores_id: 32}, attributes:['setores_id'], group:['tipo'], include:[{model:agentes_riscos, as:'agentes_riscos', attributes:['tipo']}]}).then(
//     data => {
//         console.log(data.map(p => p.toJSON()));
//     }
// )
let setores_id = 3;
let tipo = 'Biológicos';

perigos_ges.findAll({where:{ setores_id }, attributes:['id', 'setores_id', 'risco'], include:[{model:agentes_riscos, as:'agentes_riscos', where:{ tipo }}]}).then(
    data => {
        console.log(data.map(p => p.toJSON()));
    }
);
