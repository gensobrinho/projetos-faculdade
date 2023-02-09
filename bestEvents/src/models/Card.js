const Sequelize = require("sequelize");
const db = require("./db");

const User = require("./User");

const cardData = db.sequelize.define("card",{
    id:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    number:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    validDate:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    ccv:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

User.hasMany(cardData);

cardData.sync()

module.exports = cardData;
