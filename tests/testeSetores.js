const { Clientes, Setores, perigos_ges, agentes_riscos } = require('../models');

Setores.findAll({where:{ clientes_id: 4 }, attributes:['id', 'clientes_id'], include:[{model:perigos_ges, as:'perigos_ges', include:[{model:agentes_riscos, as: 'agentes_riscos', attributes:['tipo']}]}]}).then(
    data => {
        console.log(data.map(s => s.toJSON()));
    }
)
