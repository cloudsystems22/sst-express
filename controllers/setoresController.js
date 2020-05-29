let { sequelize,  Usuario, Clientes, Setores } = require('../models');
const setoresController = {
    index:async(req, res) =>{

    },
    create:async(req, res) =>{
        let { setores, descricao, num_func_m, num_func_f, clientes_id } = req.body;
        let setor = await Setores.create({setores, descricao, num_func_m, num_func_f, clientes_id });
        res.send(setor);

    },
    update:async(req,res) =>{
        let { id, setores, descricao, num_func_m, num_func_f, clientes_id } = req.body;
        let setor = await Setores.update({setores, descricao, num_func_m, num_func_f, clientes_id, where: { id } });
        res.send(setor);

    },
    delete:async(req, res) =>{
        
    }
}

module.expors = setoresController;