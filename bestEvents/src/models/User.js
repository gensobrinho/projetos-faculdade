const Sequelize = require("sequelize");
const db = require("./db");

// const Place = require("./Place");

const userData = db.sequelize.define("usuario", {
    id:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sexo: {
        type: Sequelize.CHAR(1),
        allowNull: true,
    },
    estado: {
        type: Sequelize.CHAR(2),
        allowNull: false,
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cpf: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    numEndereco: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    complemento: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    rua: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nascimento: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipoPessoa: {
        type: Sequelize.CHAR(1),
        allowNull: false,
    },
});

// userData.hasMany(Place);

userData.sync();

module.exports = userData;