const bcrypt = require('bcrypt');
let { sequelize,  Usuario, niveisAcesso, nivelAcessoUsuario } = require('../models');
const usersController = {
    index: async(req, res) =>{
        let { id } = req.session.usuario;
        let usuarioAcesso = await nivelAcessoUsuario.findAll({include:['Usuario', 'niveisAcesso'], where: { id }});
        res.render('index', {title: "SST-EXPRESS", usuarioAcesso})
    },

    cadastro: (req, res) =>{
        res.render('cadastroUsuario', {title: 'Cadastro'})
    },

    insert: async(req, res) =>{
        let { username, senha} = req.body;
        let hashPassword = bcrypt.hashSync(senha, 10);

        let usuario = await Usuario.create({username, senha:hashPassword});
        console.log(usuario);
        res.redirect('/users');
    },

    login:(req, res) =>{
        
        res.render('login', {title: 'Login'});
    },

    logar: async(req, res) =>{
        //recebendo as informações do body
        const { username, senha } = req.body;

        //procurando um usuário
        const user = await Usuario.findOne(
            { where:
                { username }
            }
        );
        
        //redirecionando para tela de erro se o usuário não existir
        if(!user) {
            res.redirect('/users?error=1');
        }
        
        //validar senha
        if(!bcrypt.compareSync(senha, user.senha)){
            res.redirect('/users?error=1');
        }
        
        console.log(user);
        //setando uma sessiona com o usuário
        req.session.usuario = user;

        //redirecionando para página inicial
        res.redirect('/');
    }
}

module.exports = usersController;