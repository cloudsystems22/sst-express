const niveisAcesso = (sequelize, DataTypes) =>{
    let niveisacesso = sequelize.define(
        'niveisacesso',
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
    return niveisacesso;
}

module.exports = niveisAcesso;