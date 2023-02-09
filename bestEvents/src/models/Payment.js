const Sequelize = require("sequelize");
const db = require("./db");

const User = require("./User");

const paymentData = db.sequelize.define("payment",{
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    situation:{
        type: Sequelize.BOOLEAN, //0 - pendente | 1 - Pago
        allowNull: false,
        defaultValue: false,
    },
    contract:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    totalValue:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
});


User.hasMany(paymentData);

paymentData.sync()

module.exports = paymentData;

