const User = require("../models/User");
const Worker = require("../models/Worker");

const jwt = require("jsonwebtoken");

const workerController = {
    register: async function(req, res){

        const selectedUser = await Worker.findAll({
            where:{usuarioId: req.body.userId}
        })

        let response = {
            alreadyRegistered: false,
            error: true
        }

        if(selectedUser.length >= 1){
            response.alreadyRegistered = true;
            res.status(400).send(response);
        }
        else{
            Worker.create({
                id: generateId(),
                functionType: req.body.functionType,
                resume: "exemplo path curriculo",
                bankAccount: req.body.bankAccount,
                agency: req.body.agency,
                accountNumber: req.body.accountNumber,
                usuarioId: req.body.userId,
            }).then(()=>{
                response.error = false
                res.send(response);
            }).catch((err)=>{
                console.log(err);
                response.error = true
                res.send(response);
            })
        }

        


    },
    info: async function(req, res){

        const selectedWorker = await Worker.findAll({
            where:{usuarioId: req.body.userId}
        })

        res.send(selectedWorker[0].dataValues);

    },
    all: async function(req, res){
        const allWorkers = await Worker.findAll();
        const workes = []

        for(i = 0; i < allWorkers.length; i++){
            const workerData = await User.findAll({where:{id: allWorkers[i].usuarioId}});

            workes.push({workerData: allWorkers[i], personData: {
                name: workerData[0].nome,
                district: workerData[0].bairro,
                city: workerData[0].cidade
            }});
        }

        res.send(workes);
    },
    allOfType: async function(req, res){
        const allWorkesOfType = await Worker.findAll({
            where:{functionType: req.body.workerFunction}
        })

        res.send(allWorkesOfType)
    }

}


function generateId(){
    return Math.random().toString(36).substring(2,9);
}

module.exports = workerController;