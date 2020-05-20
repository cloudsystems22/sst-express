const nivelAcessoUsuario = (sequelize, DataType) => {
    let acessoUsuario = sequelize.define(
        'nivelAcessoUsuario', {
            id:{
                type:DataType.INTEGER(),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            niveis_acesso_id:
            { 
                type: DataType.INTEGER(),
                allowNull: false
            },
            usuario_id:
            {
                type: DataType.INTEGER(),
                allowNull: false
            }
            
        },
        { 
            tableName: "niveis_acesso_usuario",
            timestamps: false 
        }
    );

    acessoUsuario.associate = (models) => {
        acessoUsuario.hasMany(models.niveisAcesso, { foreignKey:'id', as: 'niveisAcesso'});
        acessoUsuario.hasMany(models.Usuario, { foreignKey:'id', as: 'Usuario'});
    }
    return acessoUsuario;

}
module.exports = nivelAcessoUsuario