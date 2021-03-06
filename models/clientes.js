const Clientes = (sequelize, DataTypes) => {
    let clientes = sequelize.define(
        'Clientes',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            cnpj: {
                type:DataTypes.STRING(15),
                allowNull: false
            },
            razao_social:{
                type:DataTypes.STRING(250),
                allowNull: false
            },
            nome_fantasia:{ type:DataTypes.STRING(150)},
            ie:{ type:DataTypes.STRING(15)},
            cnae: { type:DataTypes.STRING(15)},
            logradouro: { type:DataTypes.STRING(150)},
            numero: { type:DataTypes.STRING(5) },
            bairro: { type:DataTypes.STRING(50) },
            cep: { type:DataTypes.STRING(15)},
            municipio: { type:DataTypes.STRING(50) },
            estado: { type:DataTypes.STRING(50)},
            site: { type:DataTypes.STRING(50) },
            fone: { type:DataTypes.STRING(15) },
            email: { type:DataTypes.STRING(50) },
            logo: { type:DataTypes.STRING(150)},
        },
        {
            tableName: 'clientes',
            timestamps: false
        }
    );
    clientes.associate = (models) => {
        clientes.hasMany(models.Setores, {foreignKey:'clientes_id', as:'Setores'})
    }
    return clientes;
}

module.exports = Clientes;