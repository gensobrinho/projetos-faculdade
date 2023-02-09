const Equipament = require("../models/Equipaments");
const AllocatedEquipament = require("../models/AllocatedEquipment");


const equipamentController = {
    all: async function(req, res){
        Equipament.findAll({attributes:["type"], distinct: true}).then(item=>{

            let equipaments = []
    
            for(let i = 0; i < item.length; i++){
                equipaments.push(item[i].dataValues);
            }
    
            res.json(equipaments);
    
        });
    },
    mobilia: async function(req, res){
        Equipament.findAll({where:{type: "mobilia"}}).then(item =>{
            let equipaments = []
    
            for(let i = 0; i < item.length; i++){
                equipaments.push(item[i].dataValues);
            }
    
            res.json(equipaments);
        })
    },
    audiovisual: async function(req, res){

        Equipament.findAll({where:{type: "audiovisual"}}).then(item =>{
            let equipaments = []
    
            for(let i = 0; i < item.length; i++){
                equipaments.push(item[i].dataValues);
            }
    
            res.json(equipaments);
        })
    }, 
    construcao: async function(req, res){
        Equipament.findAll({where:{type: "construcao"}}).then(item =>{
            let equipaments = []
    
            for(let i = 0; i < item.length; i++){
                equipaments.push(item[i].dataValues);
            }
    
            res.json(equipaments);
        })
    },
    efeitosespeciais: async function(req, res){
        Equipament.findAll({where:{type: "efeitosespeciais"}}).then(item =>{
            let equipaments = []
    
            for(let i = 0; i < item.length; i++){
                equipaments.push(item[i].dataValues);
            }
    
            res.json(equipaments);
        })
    },
    alimenticio: async function(req, res){
        Equipament.findAll({where:{type: "alimenticio"}}).then(item =>{
            let equipaments = []
    
            for(let i = 0; i < item.length; i++){
                equipaments.push(item[i].dataValues);
            }
    
            res.json(equipaments);
        })
    }, 
    util: async function(req, res){
        Equipament.findAll({where:{type: "util"}}).then(item =>{
            let equipaments = []
    
            for(let i = 0; i < item.length; i++){
                equipaments.push(item[i].dataValues);
            }
    
            res.json(equipaments);
        })
    }, 
    reserve: async function(req, res){
        //adicionar a tabela de equipamentos alugados os novos equipamentos que foram alugados
    }
}


module.exports = equipamentController;