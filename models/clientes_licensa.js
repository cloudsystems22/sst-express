const ClientesLicensa = (sequelize, DataTypes) => {
    let clientesLicensa = sequelize.define(
        'ClientesLicensa',{
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            licensa_id:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            clientes_id:{
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: "clientes_has_licensa",
            timestamps: false
        }
    );
    clientesLicensa.associate = (models) => {
        clientesLicensa.belongsTo(models.Clientes, { foreignKey:'id', as: 'Clientes'});
        clientesLicensa.hasMany(models.Licensa, { foreignKey:'id', as: 'Licensa'});
    }
    return clientesLicensa;
}

module.exports = ClientesLicensa;