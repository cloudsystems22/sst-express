const setores_riscos = (sequelize, DataTypes) => {
    let setoresRiscos = sequelize.define(
        'setores_riscos',
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            setores_id:{
                type: DataTypes.INTEGER,
                allowNull:false
            },
            agentes_riscos_id:{
                type: DataTypes.INTEGER,
                alloNull: false
            }
        },
        {
            tableName:'setores_riscos',
            timestamps:false
        }
    )
    setoresRiscos.associate = (models) => {
        setoresRiscos.belongsTo(models.Setores, {foreignKey:'setores_id', as:'Setores' });
        setoresRiscos.belongsTo(models.agentes_riscos, {foreignKey:'agentes_riscos_id', as:'agentes_riscos'});
    }
    return setoresRiscos;
}

module.exports = setores_riscos;