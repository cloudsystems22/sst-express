let { sequelize,  Usuario, nivelAcessoUsuario, Licensa, Clientes, ClientesLicensa, Setores, perigos_ges, setores_riscos, agentes_riscos } = require('../models');
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
        let { id } = req.session.usuario;
        let { idcli } = req.query;
        let usuarioAcesso = await nivelAcessoUsuario.findAll({include:['Usuario', 'niveisAcesso'], where: { usuario_id: id }});
        let licensa = await Licensa.findOne({where: { usuario_id: id }});
        let cliente = await Clientes.findOne({
            where: { id:idcli },
            include:[{model:Setores, as:'Setores'}]
        });
        let gruposRiscos = await setores_riscos.findAll({attributes:['setores_id'], group:['tipo', 'setores_id'], include:[{model:Setores, as:'Setores', where:{ clientes_id: idcli }}, {model:agentes_riscos, as:'agentes_riscos', attributes:['tipo', 'hexadecimal']}]})
        let agentesRiscos = await setores_riscos.findAll({include:[{model:Setores, as:'Setores', where:{ clientes_id: idcli }}, {model:agentes_riscos, as:'agentes_riscos'}]})
        //console.log(gruposRiscos);
        res.render('clientes/detalhes', { title:'Detalhes - ', cliente, gruposRiscos, agentesRiscos, usuarioAcesso });
    },
    form:async(req, res) => {
        let { id } = req.session.usuario;
        let { idcli } = req.query;
        let usuarioAcesso = await nivelAcessoUsuario.findAll({include:['Usuario', 'niveisAcesso'], where: { usuario_id: id }});
        let licensa = await Licensa.findOne({where: { usuario_id: id }});
        res.render('clientes/formulario', {title:'Cliente', usuarioAcesso, idcli});
    },
    update:async(req, res) => {
        let { id, cnpj, razao_social, nome_fantasia, ie, cnae, logradouro, numero, bairro, cep, municipio, estado, site, fone, email } = req.body;
        let cliente = await Clientes.update({cnpj, razao_social, nome_fantasia, ie, cnae, logradouro, numero, bairro, cep, municipio, estado, site, fone, email }, { where: { id }});
        res.send(cliente);
    },
    uplogo:async(req, res) => {
        let { id } = req.body;
        let { files } = req;
        //console.log(files);
        await Clientes.update({  logo: '/images/logos/' + files[0].originalname }, {
            where: { id }
        });
        let clienteUpdated = await Clientes.findAll({ where: { id }});
        res.send(clienteUpdated); 
    },
    delete:async(req, res) => {
        res.send('Delete');
    }
}

module.exports = clientesController