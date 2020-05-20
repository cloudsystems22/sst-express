const nivelAcessoUsuario = (sequelize, DataType) => {
    let acessoUsuario = sequelize.define(
        'niveisAcessoUsuario', {
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
            tableName: "niveisAcessoUsuario",
            timestamps: false 
        }
    );
    return acessoUsuario;

}
module.exports = nivelAcessoUsuario