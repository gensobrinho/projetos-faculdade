const Sequelize = require("sequelize");
const db = require("./db");

// module.exports.User = db.sequelize.define("usuario", {
//     id:{
//         type: Sequelize.STRING,
//         //autoIncrement: true,
//         primaryKey: true,
//         allowNull: false,
//     },
//     nome: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     telefone: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     senha: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     sexo: {
//         type: Sequelize.CHAR(1),
//         allowNull: true,
//     },
//     estado: {
//         type: Sequelize.CHAR(2),
//         allowNull: false,
//     },
//     cidade: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     cep: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     cpf: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false,
//     },
//     numEndereco: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     complemento: {
//         type: Sequelize.STRING,
//         allowNull: true,
//     },
//     rua: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     bairro: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     nascimento: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     tipoPessoa: {
//         type: Sequelize.CHAR(1),
//         allowNull: false,
//     },
// });



// module.exports.Local = db.sequelize.define("local",{
//     id:{
//         type: Sequelize.STRING,
//         //autoIncrement: true,
//         primaryKey: true
//     },
//     nome:{
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     complemento:{
//         type: Sequelize.STRING
//     }, 
//     estado:{
//         type: Sequelize.CHAR(2),
//         allowNull: false,
//     },
//     bairro:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     numEndereco:{
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     cep:{
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     rua:{
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     cidade:{
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     valor:{
//         type: Sequelize.DOUBLE,
//         allowNull: false,
//     },
//     capacidade:{
//         type: Sequelize.INTEGER,
//         allowNull: false,
//     },
//     acessibilidade:{
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//     },
//     descricao:{
//         type: Sequelize.TEXT,
//         allowNull: false,
//     }
// })




module.exports.CartaoUsuario = db.sequelize.define("cartaousuario",{
    numero:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
    },
    validade:{
        type: Sequelize.DATE,
        allowNull: false,
    },
    cvv:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})




module.exports.Pagamento = db.sequelize.define("pagamento",{
    id:{
        type: Sequelize.STRING,
        //autoIncrement: true,
        primaryKey: true
    },
    situacao:{
        type: Sequelize.STRING,
        defaultValue: "naoPago",
        allowNull: false,
    },
    // contrato:{
    //     adicionar arquivo
    // }
})


module.exports.Evento = db.sequelize.define("evento",{
    id:{
        type: Sequelize.STRING,
        //autoIncrement: true,
        primaryKey: true
    },
    qtdPessoas:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    data:{
        type: Sequelize.DATE,
        allowNull: false,
    },
    tipoEvento:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    valor:{
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false,
    }
})


// module.exports.Equipamento = db.sequelize.define("equipamento",{
//     id:{
//         type: Sequelize.STRING,
//         primaryKey: true
//     },
//     tipo:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     nome:{
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     },
//     descricao:{
//         type: Sequelize.STRING,
//     },
//     valor:{
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     }
// })


// module.exports.EquipamentoAlocado = db.sequelize.define("equipamentoAlocado",{
//     quantidade:{
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     dataAlocacao:{
//         type: Sequelize.DATE,
//         allowNull: false
//     }
// })


// module.exports.EmpresaBuffet = db.sequelize.define("empresaBuffet", {
//     id:{
//         type: Sequelize.STRING,
//         primaryKey: true,
//         allowNull: false
//     }, 
//     nome: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     cnpj:{
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     }
// })


// module.exports.Cardapio = db.sequelize.define("cardapio",{
//     id:{
//         type: Sequelize.STRING,
//         primaryKey: true,
//         allowNull: false
//     },
//     item:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     valorUnidade:{
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     },
//     descricao:{
//         type: Sequelize.TEXT,
//         allowNull: true
//     }
// })

// module.exports.Buffet = db.sequelize.define("buffet", {
//     quantidade: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     valorTotal:{
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     }
// })

// module.exports.User.hasMany(module.exports.Local);
// module.exports.User.hasMany(module.exports.CartaoUsuario);
// module.exports.User.hasMany(module.exports.Pagamento);
// module.exports.User.hasMany(module.exports.Evento);

// module.exports.Evento.belongsTo(module.exports.Pagamento);
// module.exports.Evento.belongsTo(module.exports.Local);

// module.exports.Evento.hasMany(module.exports.EquipamentoAlocado);
// module.exports.Equipamento.hasMany(module.exports.EquipamentoAlocado);

// module.exports.EmpresaBuffet.hasOne(module.exports.Cardapio);
// module.exports.Cardapio.hasMany(module.exports.Buffet);

//module.exports.Buffet.belongsTo(module.exports.Evento);


// module.exports.Buffet.sync({force: true});
// module.exports.Cardapio.sync({force: true});
// module.exports.EmpresaBuffet.sync({force: true});
// module.exports.EquipamentoAlocado.sync({force:true});
// module.exports.Equipamento.sync({force:true});
// module.exports.Evento.sync({force:true});
// module.exports.Pagamento.sync({force:true});
// module.exports.CartaoUsuario.sync({force:true});
// module.exports.Local.sync({force:true})
// module.exports.User.sync({force:true});


// module.exports.User.sync({force:true});
// module.exports.Local.sync({force:true});
// module.exports.CartaoUsuario.sync({force:true});
// module.exports.Pagamento.sync({force:true});
// module.exports.Evento.sync({force:true});
// module.exports.Equipamento.sync({force:true});
// module.exports.EquipamentoAlocado.sync({force:true});
// module.exports.EmpresaBuffet.sync({force: true});
// module.exports.Cardapio.sync({force: true});
// module.exports.Buffet.sync({force: true});


// module.exports.User.sync();
//module.exports.Local.sync();
// module.exports.CartaoUsuario.sync();
// module.exports.Pagamento.sync();
// module.exports.Evento.sync();
// module.exports.EquipamentoAlocado.sync();
// module.exports.Equipamento.sync();
// module.exports.EmpresaBuffet.sync();
// module.exports.Cardapio.sync();
// module.exports.Buffet.sync();

