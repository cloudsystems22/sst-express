const bcrypt = require('bcrypt');
let { sequelize,  Usuario, niveisAcesso, nivelAcessoUsuario, Licensa } = require('../models');
const licensaController = {
    index:async(req, res) => {
        let { id } = req.session.usuario;
        let usuarioAcesso = await nivelAcessoUsuario.findAll({include:['Usuario', 'niveisAcesso'], where: { id }});
        res.render('licensa', {title: 'Licensa', usuarioAcesso});
    },
    create:async(req, res) => {
        let { cnpj, razao_social, nome_fantasia, ie, cnae, logradouro, numero, bairro, cep, municipio, estado, site, fone, email, niveis_acesso_usuario_id } = req.body;
        let licensa = await Licensa.create({cnpj, razao_social, nome_fantasia, ie, cnae, logradouro, numero, bairro, cep, municipio, estado, site, fone, email, niveis_acesso_usuario_id });
        res.send(licensa);
    },
    licensa:async(req, res) =>{
        let { id } = req.session.usuario;
        let licensa = await Licensa.findAll({ where: { niveis_acesso_usuario_id:id }});
        res.send(licensa);
    }
}

module.exports = licensaController;