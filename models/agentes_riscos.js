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
            tipo: { type:DataTypes.STRING(45) },
            danos: { type: DataTypes.STRING(450) }
        },
        {
            tableMame:'agentes_riscos',
            timestamps:false
        }
    );
    return agentesRiscos;

}

module.exports = agentes_riscos;