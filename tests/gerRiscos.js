const { Clientes, Setores, perigos_ges, agentes_riscos } = require('../models');

// Setores.findAll().then(
//     data => {
//         console.log(data.map(s => s.toJSON()));
//     }
// )

perigos_ges.findAll().then(
    data =>{
        console.log(data.map(p => p.toJSON()))
    }
)