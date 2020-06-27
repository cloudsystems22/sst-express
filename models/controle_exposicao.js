const controle_exposicao = (sequelize, DataTypes) => {
    let controleExposicao = sequelize.define(
        'controle_exposicao',
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull:false,
                primaryKey:true,
                autoIncrement:true
            },
            pcdaepc:{
                type:DataTypes.STRING(250)
            },
            eficaz:{
                type:DataTypes.STRING(45)
            },
            epi:{
                type:DataTypes.STRING(45)
            },
            ca:{
                type:DataTypes.STRING(45)
            },
            atenuacao:{
                type:DataTypes.STRING(45)
            },
            perigos_ges_id:{
               type:DataTypes.INTEGER,
               allowNull:false
            }
        },
        {
            tableName:"controle_exposicao",
            allowNull:false
        }
    );

    return controleExposicao;

}
module.exports = controle_exposicao;