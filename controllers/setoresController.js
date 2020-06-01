let { sequelize, Setores } = require('../models');
const setoresController = {
    index:async(req, res) =>{

    },
    create:async(req, res) =>{
        let { id } = req.session.usuario;
        let { setores, descricao, num_func_m, num_func_f, clientes_id } = req.body;
        let setor = await Setores.create({setores, descricao, num_func_m, num_func_f, clientes_id });
        res.send(setor);

    },
    load:async(req,res) => {
        let { id } = req.body;
        let setor = await Setores.findAll({where: { id }});
        res.send(setor);
    },
    update:async(req,res) =>{
        let { id, setores, descricao, num_func_m, num_func_f, clientes_id } = req.body;
        let setor = await Setores.update({setores, descricao, num_func_m, num_func_f, clientes_id, where: { id } });
        res.send(setor);

    },
    delete:async(req, res) =>{
        let {id, idCliente } = req.body;
        //console.log(req.body);
        await Setores.destroy({
            where: { id }
        })
        let setores = await Setores.findAll({where:{ clientes_id: idCliente }})
        res.send(setores);
    }
}

module.exports = setoresController;