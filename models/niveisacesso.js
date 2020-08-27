const niveisAcesso = (sequelize, DataTypes) =>{
    let niveisacesso = sequelize.define(
        'niveisAcesso',
        {
            id:{
                type:DataTypes.INTEGER(),
                primaryKey: true,
                allowNull: false
            },
            niveis:{
                type:DataTypes.STRING(150),
                allowNull:false
            }
        },
        { 
            tableName: "niveis_acesso",
            timestamps: false 
        }
    
    );
    // niveisacesso.associate = (models) => {
    //     niveisAcesso.hasMany(models.nivelAcessoUsuario, {
    //         foreignKey:'nivel_acesso_id', as: 'niveis_acesso_usuario'
    //     })

    // }
    return niveisacesso;
}

module.exports = niveisAcesso;