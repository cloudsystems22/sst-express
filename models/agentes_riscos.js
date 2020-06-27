const agentes_riscos = (sequelize, DataTypes) => {
    let agentesRiscos = sequelize.define(
        'agentes_riscos',
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            risco:{
                type:DataTypes.STRING(150),
                allowNull: false
            },
            tipo: { type:DataTypes.STRING(50) },
            danos: { type: DataTypes.STRING(450) },
            cor: {type:DataTypes.STRING(45)},
            hexadecimal: {type:DataTypes.STRING(45)}
        },
        {
            tableMame:'agentes_riscos',
            timestamps:false
        }
    );
    agentesRiscos.associate = (models) => {
        agentesRiscos.hasMany(models.setores_riscos, {foreignKey:'agentes_riscos_id', as:'setores_riscos'})
    }
    return agentesRiscos;

}

module.exports = agentes_riscos;