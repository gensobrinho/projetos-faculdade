const Sequelize = require("sequelize");
const db = require("./db");

const Equipament = require("./Equipaments");
const Event = require("./Event");

const allocatedEquipamentData = db.sequelize.define("allocatedEquipament",{
    id:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    }, 
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date:{
        type: Sequelize.DATE,
        allowNull: false
    },
    totalValue: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    }
})

// Equipament.hasMany(allocatedEquipamentData);
Event.hasMany(allocatedEquipamentData);

allocatedEquipamentData.sync()

module.exports = allocatedEquipamentData;