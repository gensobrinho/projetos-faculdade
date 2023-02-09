const Sequelize = require("sequelize");
const db = require("./db");
const User = require("./User");
const hiredPlace = require("./HiredPlace");

const placeData = db.sequelize.define("place",{
    id:{
        type: Sequelize.STRING,
        //autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    type:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    zipCode:{
        type: Sequelize.STRING,
        allowNull: false
    },
    state:{
        type: Sequelize.CHAR(2),
        allowNull: false
    },
    city:{
        type: Sequelize.STRING,
        allowNull: false
    },
    district:{
        type: Sequelize.STRING,
        allowNull: false
    },
    road:{
        type: Sequelize.STRING,
        allowNull: false
    },
    address:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    complement:{
        type: Sequelize.STRING,
        allowNull: true,
        default: null
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    accessibility:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    }
})


User.hasMany(placeData);
placeData.hasOne(hiredPlace);


placeData.sync();

module.exports = placeData;