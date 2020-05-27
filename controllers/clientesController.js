let { sequelize,  Usuario, nivelAcessoUsuario, Licensa, Clientes, ClientesLicensa } = require('../models');
const clientesController = {
    index:async(req, res) => {
        let { id } = req.session.usuario;

        let usuarioAcesso = await nivelAcessoUsuario.findAll({include:['Usuario', 'niveisAcesso'], where: { usuario_id: id }});
        let licensa = await Licensa.findOne({where: { usuario_id: id }})
        let clientesLicensa = await ClientesLicensa.findAll({include:['Clientes'], where: {licensa_id: licensa.id }});
        //console.log(clientesLicensa);
        res.render('clientes/index', {title: 'Clientes', usuarioAcesso, clientesLicensa });
    },
    create:async(req, res) => {
        let { id } = req.session.usuario;
        let { cnpj, ie, razao_social, nome_fantasia, cnae, cep, logradouro, numero, bairro, municipio, estado, site, fone, email } = req.body;
        let usuarioAcesso = await nivelAcessoUsuario.findAll({include:['Usuario', 'niveisAcesso'], where: { usuario_id: id }});
        let licensa = await Licensa.findOne({where: { usuario_id: id }})
        let cliente = await Clientes.create({ cnpj, ie, razao_social, nome_fantasia, cnae, cep, logradouro, numero, bairro, municipio, estado, site, fone, email })
        let clienteLicensa = await ClientesLicensa.create({ licensa_id: licensa.id, clientes_id: cliente.id });
        res.send(clienteLicensa);
    },
    show:async(req, res) =>{
        let { id } = req.body;
        let cliente = await Clientes.findOne({where: { id }})
        res.send(cliente);
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