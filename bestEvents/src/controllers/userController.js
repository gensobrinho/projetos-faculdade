const User = require("../models/User");
const Place = require("../models/Place");
const Events = require("../models/Event");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userController = {
    register: async function(req, res){


        const checkEmail = await User.findAll({
            where:{email: req.body.email}
        })
        const checkCpf = await User.findAll({
            where:{cpf: req.body.cpf}
        })

        if(checkEmail.length == 1)
            return res.status(400).send("email already registered");

        if(checkCpf.length == 1){
            return res.status(400).send("cpf already registered");
        }
            

        User.create({
            id: generateId(),
            nome: req.body.name,
            email: req.body.email,
            senha: bcrypt.hashSync(req.body.password),
            estado: req.body.state,
            cidade: req.body.city,
            bairro: req.body.district,
            rua: req.body.road,
            numEndereco: req.body.address,
            complemento: req.body.complement,
            cep: req.body.zipCode,
            telefone: req.body.phoneNumber,
            cpf: req.body.cpf,
            nascimento: req.body.birthDate,
            sexo: req.body.gender,
            tipoPessoa: req.body.personType,
        }).then(()=>{
            res.send(true);
        }).catch((err)=>{
            console.log(err);
            res.send(false);
        })
    },
    login: async function(req, res){
        const selectedUser = await User.findAll({
            where:{email: req.body.email}
        })

        if(selectedUser.length == 0)
            return res.status(400).send(false);

        const checkPassword = bcrypt.compareSync(req.body.password, selectedUser[0].dataValues.senha);
        
        if(!checkPassword)
            return res.status(400).send(false);

        const token = jwt.sign({id: selectedUser[0].dataValues.id}, process.env.TOKEN_SECRET);

        res.send({userToken: token});
    },
    profile: async function(req, res){

        const validData = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
        //console.log(validData.id);

        const user = await User.findAll({
            where:{id: validData.id}
        });
        //console.log(user);


        //eventos do usuario
        const eventsFromUser = await Events.findAll({
            where: {usuarioId: validData.id}
        })

        const placesFromUser = await Place.findAll({
            where: {usuarioId: validData.id}
        })
        //console.log(placesFromUser);


        //serviços do usuario


        const userContent = {
            userData: user,
            eventsFromUser: eventsFromUser,
            placesFromUser: placesFromUser,
            worksFromUser: [],
        }

        res.send(userContent);
    },
    session: async function(req, res){

        const validData = jwt.verify(req.body.token, process.env.TOKEN_SECRET);

        const user = await User.findAll({
            where:{id: validData.id}
        });

        res.send({id: user[0].dataValues.id, name: user[0].dataValues.nome});
    }
}

function generateId(){
    return Math.random().toString(36).substring(2,9);
}


module.exports = userController;