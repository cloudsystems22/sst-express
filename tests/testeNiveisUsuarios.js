const { sequelize, Usuario, niveisAcesso, nivelAcessoUsuario } = require('../models');

// nivelAcessoUsuario.findAll({include:['niveisAcesso', 'Usuario'], where:{id: 2 } }).then(
//     data => {
//         console.log(data.map( a => a.toJSON()));
//     }
// )
nivelAcessoUsuario.findAll({include:['niveisAcesso', 'Usuario'], where:{id: 2 } }).then(
    data => {
        console.log(data.map( a => a.toJSON()));
    }
)

