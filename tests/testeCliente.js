const {sequelize, Clientes, Setores, setores_riscos, perigos_ges, agentes_riscos, ClientesLicensa, Licensa } = require('../models');

// ClientesLicensa.findAll({include:'Clientes', include:'Licensa'}).then(
//     data => {
//         console.log(data.map( a => a.toJSON()));
//     }
// )
// Clientes.findAll({include:'Setores'}).then(
//     data => {
//         console.log(data.map(c => c.toJSON()));
//     }
// )

Clientes.findAll({
    include:[{model:Setores, as:'Setores', 
                include:[{
                    model:setores_riscos, as:'setores_riscos', 
                    include:[{
                        model:agentes_riscos, as:'agentes_riscos',
                        attributes:['tipo', 'hexadecimal'],
                        group:['tipo']
                    }]
                }]
            }]
}).then(
    data => {
        console.log(data.map(c => c.toJSON()));
    }
)