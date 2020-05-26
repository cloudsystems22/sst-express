const bcrypt = require('bcrypt');
let { sequelize,  Usuario, niveisAcesso, nivelAcessoUsuario, Licensa } = require('../models');
const licensaController = {
    index:async(req, res) => {
        let { id } = req.session.usuario;
        let usuarioAcesso = await nivelAcessoUsuario.findAll({include:['Usuario', 'niveisAcesso'], where: { usuario_id: id }});
        res.render('licensa', {title: 'Licensa', usuarioAcesso});
    },
    create:async(req, res) => {
        let { cnpj, razao_social, nome_fantasia, ie, cnae, logradouro, numero, bairro, cep, municipio, estado, site, fone, email, usuario_id } = req.body;
        let licensa = await Licensa.create({cnpj, razao_social, nome_fantasia, ie, cnae, logradouro, numero, bairro, cep, municipio, estado, site, fone, email, usuario_id });
        res.send(licensa);
    },
    update:async(req,res) => {
        let { id, cnpj, razao_social, nome_fantasia, ie, cnae, logradouro, numero, bairro, cep, municipio, estado, site, fone, email, usuario_id } = req.body;
        let licensa = await Licensa.update({cnpj, razao_social, nome_fantasia, ie, cnae, logradouro, numero, bairro, cep, municipio, estado, site, fone, email, usuario_id }, { where: { id }});
        res.send(licensa);
    },
    listar:async(req, res) =>{
        let { id } = req.session.usuario;
        let licensa = await Licensa.findAll({ where: { usuario_id: id }});

        res.send(licensa);
    },
    uplogo:async(req, res) => {
        let { id } = req.body;
        let { files } = req;
        console.log(files);
        await Licensa.update({  logo: '/images/logos/' + files[0].originalname }, {
            where: { id }
        });
        let liscensaUpdated = await Licensa.findAll({ where: { id }});
        res.send(liscensaUpdated); 
    }
}

module.exports = licensaController;