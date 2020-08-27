const Setores = (sequelize, DataTypes) => {
    let setores = sequelize.define(
        'Setores',
        {
            id:{
               type:DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true
            },
            setores:{ type:DataTypes.STRING(150) },
            descricao: { type:DataTypes.STRING(450)},
            num_func_m: { type:DataTypes.STRING(5)}, 
            num_func_f: { type:DataTypes.STRING(5)}, 
            clientes_id: {
                type:DataTypes.INTEGER,
                allowNull:false
            } 
        },
        {
            tableName:'setores',
            timestamps:false
        }
    );
    setores.associate = (models) => {
        setores.belongsTo(models.Clientes, {foreignKey:'clientes_id', as:'Clientes'});
        setores.hasMany(models.setores_riscos, {foreignKey:'setores_id', as: 'setores_riscos'});
    }
    return setores;
}

module.exports = Setores;