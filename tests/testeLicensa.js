const {sequelize, Usuario, Licensa } = require('../models')


Licensa.findAll({}).then(
    data => {
        console.log(data.map(l => l.toJSON()));
        sequelize.close()
    }
);