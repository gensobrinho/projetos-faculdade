const Sequelize = require("sequelize");
const db = require("./db");

// const Place = require("./Place");

const hiredPlaceData = db.sequelize.define("hiredPlace",{
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    reservedDate:{
        type: Sequelize.DATE,
        allowNull: false
    }
});

// Place.hasOne(hiredPlaceData);

hiredPlaceData.sync();

module.exports = hiredPlaceData;

