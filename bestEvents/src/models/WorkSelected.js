const Sequelize = require("sequelize");
const db = require("./db");

const Event = require("./Event");
const Worker = require("./Worker");


const workSelectedData = db.sequelize.define("workeSelected", {
    id:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    salary:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    date:{
        type: Sequelize.DATE,
        allowNull: false
    },
});

Event.hasOne(workSelectedData);
Worker.hasOne(workSelectedData);

workSelectedData.sync()

module.exports = workSelectedData;

