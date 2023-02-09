const Sequelize = require("sequelize");
const db = require("./db");

const BufferMenu = require("./BuffetMenu");
const Event = require("./Event");


const buffetData = db.sequelize.define("buffet", {
    id:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalValue:{
        type: Sequelize.DOUBLE,
        allowNull: false
    }
})

BufferMenu.hasOne(buffetData);
Event.hasMany(buffetData);

buffetData.sync();

module.exports = buffetData;