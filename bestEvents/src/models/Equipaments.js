const Sequelize = require("sequelize");
const db = require("./db");

const allocatedEquipament = require("./AllocatedEquipment");

const equipamentsData = db.sequelize.define("equipaments",{
    id:{
        type: Sequelize.STRING,
        primaryKey: true
    },
    type:{
        type: Sequelize.STRING,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description:{
        type: Sequelize.STRING,
    },
    value:{
        type: Sequelize.DOUBLE,
        allowNull: false
    }
})

equipamentsData.hasMany(allocatedEquipament);

equipamentsData.sync()

module.exports = equipamentsData;