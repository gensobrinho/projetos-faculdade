const Place = require("../models/Place");
const { Op } = require("sequelize");

const HiredPlace = require("../models/HiredPlace");
const availabilityPlace = require("../models/AvailabilityPlace");

const placeController = {
    register: async function(req, res){

        let idPlace = generateId();
        
        if(req.body.availability.status){ //full register
            Place.create({
                id: idPlace,
                usuarioId: req.body.userId, 
                type: req.body.type,
                zipCode: req.body.zipCode,
                state: req.body.state,
                city: req.body.city,
                district: req.body.district,
                road: req.body.road,
                address: req.body.address,
                complement: req.body.complement,
                name: req.body.name,
                accessibility: req.body.accessibility,
            }).then(()=>{
                availabilityPlace.create({
                    id: generateId(),
                    placeId: idPlace,
                    value: req.body.value,
                    area: req.body.availability.area,
                    restroom: req.body.availability.restroom,
                    carSpace: req.body.availability.carSpace,
                    pool: req.body.availability.detail.pool,
                    field: req.body.availability.detail.field,
                    stage: req.body.availability.detail.stage,
                    roof: req.body.availability.detail.roof,
                    freezer: req.body.availability.detail.freezer,
                    table: req.body.availability.detail.table,
                    chair: req.body.availability.detail.chair,
                    bed: req.body.availability.detail.bed,
                    water: req.body.availability.detail.water
                }).then(()=>{
                    res.send({check: true, id: idPlace});
                }).catch((err)=>{
                    console.log(err);
                    res.send({check: false, id: ""});
                });

            }).catch((err)=>{
                console.log(err);
                res.send({check: false, id: ""});
            });

            
        }
        else{ //not full register
            Place.create({
                id: idPlace,
                usuarioId: req.body.userId, 
                type: req.body.type,
                zipCode: req.body.zipCode,
                state: req.body.state,
                city: req.body.city,
                district: req.body.district,
                road: req.body.road,
                address: req.body.address,
                complement: req.body.complement,
                name: req.body.name,
                accessibility: req.body.accessibility,
            }).then(()=>{
                res.send({check: true, id: idPlace});
            }).catch((err)=>{
                console.log(err);
                res.send({check: false, id: ""});
            })
        }

        

    },
    all: async function(req, res){
        
        //pegar os locais de acordo com o estado e cidade recebido da requisição

        let allplaces = "";

        // if(req.body.state != "" && req.body.city != ""){
        //     allplaces = Place.findAll({
        //         where:{state: req.body.state, city: req.body.city}
        //     })
        // }
        // else if(req.body.state != "" && req.body.city == ""){
        //     allplaces = Place.findAll({
        //         where:{state: req.body.state}
        //     })
        // }
        // else if(req.body.state == "" && req.body.city != ""){
        //     allplaces = Place.findAll({
        //         where:{city: req.body.city}
        //     })  
        // }
        // else{
        //     allplaces = Place.findAll();
        // }

        //send places where value not equal 0
        allplaces = Place.findAll({
            where: {
                valor:{[Op.ne]: 0}
            }
        }).then((place)=>{
            res.send(place); 
        })

    },
    reserve: async function(req, res){
        const selectedPlace = Place.findAll({
            where: {id: req.body.placeId}
        });

        const checkReserve = HiredPlace.findAll({
            where: {id: req.body.placeId}
        })

        //se o checkReserve possuir algum valor, devemos checar a data que o local está reservado, se for no mesmo dia que o evento requisitado, devemos impedir a reserva
        if(1==1){}
    },
    disponibility: async function(req, res){
        
    },
    info: async function(req, res){

    }
}


function generateId(){
    return Math.random().toString(36).substring(2,9);
}


module.exports = placeController;