const { AgentesRiscos } = require('../models');

// Setores.findAll({include:'Clientes'}).then(
//     data => {
//         console.log(data.map(s => s.toJSON()));
//     }
// )
AgentesRiscos.findAll().then(
    data => {
        console.log(data.map(r => r.toJSON()));
    }
)