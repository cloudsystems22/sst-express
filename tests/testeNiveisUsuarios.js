const { sequelize, Usuario, niveisAcesso, nivelAcessoUsuario } = require('../models');

nivelAcessoUsuario.findAll({include:['niveisAcesso', 'Usuario'], where:{id: 1 } }).then(
    data => {
        console.log(data.map( a => a.toJSON()));
    }
)

