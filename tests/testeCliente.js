const {sequelize, Clientes, ClientesLicensa, Licensa } = require('../models')

ClientesLicensa.findAll({include:'Clientes', include:'Licensa'}).then(
    data => {
        console.log(data.map( a => a.toJSON()));
    }
)
// Clientes.findAll().then(
//     data => {
//         console.log(data.map(c => c.toJSON()));
//     }
// )