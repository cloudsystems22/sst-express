let { sequelize,  Usuario, nivelAcessoUsuario, Licensa, Clientes, ClientesLicensa } = require('../models');
const clientesController = {
    index:async(req, res) => {
        let { id } = req.session.usuario;

        let usuarioAcesso = await nivelAcessoUsuario.findAll({include:['Usuario', 'niveisAcesso'], where: { usuario_id: id }});
        let licensa = await Licensa.findOne({where: { usuario_id: id }})
        let clientesLicensa = await ClientesLicensa.findAll({include:['Clientes'], where: {licensa_id: licensa.id }})
        res.render('clientes/index', {title: 'Clientes', usuarioAcesso, clientesLicensa });
    },
    create:async(req, res) => {
        res.send('Create');
    },
    details:async(req, res) => {
        res.send('Detalhes');
    },
    form:async(req, res) => {
        let { id } = req.session.usuario;

        let usuarioAcesso = await nivelAcessoUsuario.findAll({include:['Usuario', 'niveisAcesso'], where: { usuario_id: id }});
        let licensa = await Licensa.findOne({where: { usuario_id: id }});
        res.render('clientes/formulario', {title:'Cliente', usuarioAcesso});
    },
    update:async(req, res) => {
       
        res.send();
    },
    delete:async(req, res) => {
        res.send('Delete');
    }
}

module.exports = clientesController