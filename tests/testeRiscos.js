const { agentes_riscos } = require('../models');

// Setores.findAll({include:'Clientes'}).then(
//     data => {
//         console.log(data.map(s => s.toJSON()));
//     }
// )
agentes_riscos.findAll().then(
    data => {
        console.log(data.map(r => r.toJSON()));
    }
)