const { agentes_riscos, perigos_ges } = require('../models');


perigos_ges.findAll({attributes:['setores_id'], group:['tipo'], include:[{model:agentes_riscos, as:'agentes_riscos', attributes:['tipo']}]}).then(
    data => {
        console.log(data.map(p => p.toJSON()));
    }
)
