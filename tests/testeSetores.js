const { Clientes, Setores } = require('../models');

Setores.findAll({}).then(
    data => {
        console.log(data.map(s => s.toJSON()));
    }
)