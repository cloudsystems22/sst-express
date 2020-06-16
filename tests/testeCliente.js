const {sequelize, Clientes, Setores, perigos_ges, agentes_riscos, ClientesLicensa, Licensa } = require('../models');
const setoresController = require('../controllers/setoresController');

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
    where: { id: 4},
    include:[{model:Setores, as:'Setores', include:[
        {
            model:perigos_ges, as:'perigos_ges', include:[{
                model:agentes_riscos,
                as:'agentes_riscos'
            }]
        }
    ]}]
}).then(
    data => {
        console.log(data.map(c => c.toJSON()));
    }
)