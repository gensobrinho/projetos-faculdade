const dotenv = require("dotenv").config();
const Sequelize = require("sequelize");


//servidor azure
// const sequelize = new Sequelize("bestdb", "bestevents@bestevents", "Hospedagemtis!", {
//     host: "bestevents.mysql.database.azure.com",
//     dialect: "mysql"
// });


// sequelize.authenticate().then(() =>{
//     console.log("Conectando ao Banco...");
// }).catch((err) =>{
//     console.log("houve um erro: "+err);
// });



//banco de dados local
const sequelize = new Sequelize("bestevents", "root", "bestevents123", {
    host: "localhost",
    dialect: "mysql"
})



sequelize.authenticate().then(() =>{
    console.log("Conectando ao Banco...");
}).catch((err) =>{
    console.log("houve um erro: "+err);
});




module.exports ={
    sequelize: sequelize,
    Sequelize: Sequelize
} 



