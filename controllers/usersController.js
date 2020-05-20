const usersController = {
    index:(req, res) =>{
        res.render('index', {title: "SST-EXPRESS"})
    },

    cadastro: (req, res) =>{

    },

    insert: (req, res) =>{

    },

    login:(req, res) =>{
        res.render('login', {title: 'Login'});
    }
}

module.exports = usersController;