const perigos_ges = (sequelize, DataTypes) => {
    let perigosGes = sequelize.define(
        'perigos_ges',
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull:false,
                primaryKey:true,
                autoIncrement:true
            },
            data:{
                type:DataTypes.DATE,
                allowNull:false
            },
            fase:{type:DataTypes.STRING(45)},
            agentes_riscos_id: {
                type:DataTypes.INTEGER,
                allowNull:false
            },
            danos:{
                type:DataTypes.STRING(150)
            },
            lim_expo:{
                type:DataTypes.STRING(45)
            },
            fonte_geradora:{
                type:DataTypes.STRING(450)
            },
            intensidade:{
                type:DataTypes.STRING(5)
            },
            tecnica_util:{
                type:DataTypes.STRING(50)
            },
            risco:{
                type:DataTypes.STRING(50)
            },
            monitoramento:{
                type:DataTypes.STRING(50)
            },
            imgfonte1:{
                type:DataTypes.STRING(45)
            },
            imgfonte2:{
                type:DataTypes.STRING(45)
            },
            imgfonte3:{
                type:DataTypes.STRING(45)
            },
            setores_id:{
                type:DataTypes.INTEGER,
                allowNull:false
            }

        },
        {
            tableName:"perigos_ges",
            timestamps:false
        }
    );
    perigosGes.associate = (models) => {
        perigosGes.belongsTo(models.agentes_riscos, {foreignKey:'agentes_riscos_id', as:'agentes_riscos'})
    }
    return perigosGes;

}

module.exports = perigos_ges;