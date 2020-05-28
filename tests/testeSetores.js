const { Clientes, Setores } = require('../models');

Setores.findAll({include:'Clientes'}).then(
    data => {
        console.log(data.map(s => s.toJSON()));
    }
)