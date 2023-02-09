const Sequelize = require("sequelize");
const db = require("./db");


const buffetCompanyData = db.sequelize.define("empresaBuffet", {
    id:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    }, 
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cnpj:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
});

buffetCompanyData.sync();

module.exports = buffetCompanyData;