const Sequelize = require("sequelize");
const db = require("./db");
const User = require("./User");

const workerData = db.sequelize.define("worker", {
    id:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    functionType: {
        type: Sequelize.STRING,
    },
    resume: {
        type: Sequelize.STRING,
    },
    bankAccount: {
        type: Sequelize.STRING,
    },
    agency: {
        type: Sequelize.STRING,
    },
    accountNumber: {
        type: Sequelize.STRING,
    },
});


User.hasOne(workerData); // trabalhador pertence ao um usuario

workerData.sync();

module.exports = workerData;