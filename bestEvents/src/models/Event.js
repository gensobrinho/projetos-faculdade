const Sequelize = require("sequelize");
const db = require("./db");

const User = require("./User");
const Place = require("./Place");
const Payment = require("./Payment");

const eventData = db.sequelize.define("event",{
    id:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    peopleQuantity:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date:{
        type: Sequelize.DATE,
        allowNull: false
    },
    type:{
        type: Sequelize.STRING,
        allowNull: false
    },
    value:{
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: true
    }
});


User.hasMany(eventData);
Payment.hasOne(eventData);
Place.hasMany(eventData);


eventData.sync();

module.exports = eventData;