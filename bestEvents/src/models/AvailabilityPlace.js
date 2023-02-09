const Sequelize = require("sequelize");
const db = require("./db");
const Place = require("./Place");


const availabilityPlaceData = db.sequelize.define("availabilityPlace",{
    id:{
        type: Sequelize.STRING,
        //autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    value:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    area: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    restroom: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defalt: 1
    },
    carSpace: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0
    },
    pool:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    field:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    stage:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    roof:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    freezer:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    table:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    chair:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    bed:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    water:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    }
})

// Place.hasOne(availabilityPlaceData);
availabilityPlaceData.belongsTo(Place);

availabilityPlaceData.sync();

module.exports = availabilityPlaceData;