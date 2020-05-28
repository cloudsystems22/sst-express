const {sequelize, Clientes, Setores, ClientesLicensa, Licensa } = require('../models')

// ClientesLicensa.findAll({include:'Clientes', include:'Licensa'}).then(
//     data => {
//         console.log(data.map( a => a.toJSON()));
//     }
// )
Clientes.findAll({include:'Setores'}).then(
    data => {
        console.log(data.map(c => c.toJSON()));
    }
)