const { sequelize, niveisAcesso } = require('../models');

niveisAcesso.findAll().then(
    data => {
        console.log(data.map(n => n.toJSON()));
        sequelize.close();
    }
);

// const Sequelize = require("sequelize");
// const dbConfig = require("../config/database");
// const dbConn = new Sequelize(dbConfig);

// dbConn.query("select * from niveis_acesso", Sequelize.QueryTypes.SELECT)
// .then(
//     data => {
//         console.log(data);
//         dbConn.close();
//     }
// );
