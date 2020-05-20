const Usuario = (sequelize, DataTypes) => {
    let usuario = sequelize.define(
        'Usuario',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            senha: {
                type: DataTypes.STRING(256),
                allowNull: false
            },
            nome: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            sobrenome:{
                type:DataTypes.STRING(100),
                allowNull: false
            },
            rg:{
                type:DataTypes.STRING(15),
                allowNull: false
            },
            cpf: {
                type: DataTypes.STRING(15),
                allowNull: true,
                unique: true
            },
            email: {
                type: DataTypes.STRING(60),
                allowNull: false,
                unique: true
            },
            cell: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            data_nascimento: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            genero: {
                type: DataTypes.STRING(1),
                allowNull: true
            },
        }, 
        { 
            tableName: "usuario",
            timestamps: false 
        }
    );

    // usuario.associate = (models) => {
        
    //     usuario.hasOne(models.DadoProfissional, {
    //         foreignKey:'fk_usuario', as: 'dado_profissional'
    //     });

    //     usuario.hasMany(models.Contato, {
    //         foreignKey:'fk_usuario', as: 'contatos'
    //     });

    //     usuario.hasMany(models.Endereco, {
    //         foreignKey:'fk_usuario', as: 'enderecos'
    //     });

    //     usuario.hasMany(models.Post, {
    //         foreignKey:'fk_usuario', as: 'posts'
    //     });

    //     usuario.hasMany(models.Comentario, {
    //         foreignKey:'fk_usuario', as: 'comentarios'
    //     });

    //     usuario.hasMany(models.RegistroPortfolio, {
    //         foreignKey:'fk_usuario', as: 'registros'
    //     });

    //     usuario.belongsToMany(models.ServicoGeral, {
    //         through: "UsuarioServicoGeral",
    //         foreignKey:'fk_usuario',
    //         as: 'servicos_gerais'
    //     });

    //     usuario.belongsToMany(models.ServicoEspecifico, {
    //         through: "UsuarioServicoEspecifico",
    //         foreignKey:'fk_usuario',
    //         as: 'servicos_especificos'
    //     });

    //     usuario.belongsToMany(models.Produto, {
    //         through: "UsuarioProduto",
    //         foreignKey:'fk_usuario',
    //         as: 'produtos'
    //     });

    //     usuario.hasMany(models.Compromisso, {
    //         foreignKey:'fk_usuario_consumidor', as: 'compromissos'
    //     });

    //     usuario.hasMany(models.AvaliacaoUsuario, {
    //         foreignKey:'fk_usuario', as: 'avaliacoes'
    //     });
    // };

    return usuario;
}

module.exports = Usuario;