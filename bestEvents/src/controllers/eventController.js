const Event = require("../models/Event");
const Payment = require("../models/Payment");
const HiredPlace = require("../models/HiredPlace");
const Equipament = require("../models/Equipaments");
const AllocatedEquipament = require("../models/AllocatedEquipment");
const Buffet = require("../models/Buffet");
const Workers = require("../models/Worker");
const WorkeSelected = require("../models/WorkSelected");
const Card = require("../models/Card");


const eventController = {
    register: async function(req, res){
        const eventId = generateId();
        const paymentId = generateId()

        //card registration
        Card.create({
            id: generateId(),
            number: req.body.paymentMethod.cardNumber,
            name: req.body.paymentMethod.cardHolder,
            validDate: req.body.paymentMethod.validDate,
            ccv: req.body.paymentMethod.ccv,
            usuarioId: req.body.idUser,
        })


        //payment registration
        Payment.create({
            id: paymentId,
            situation: true,
            contract: "",
            totalValue: req.body.totalValue,
            usuarioId: req.body.idUser,
        });


        //event registration
        Event.create({
            id: eventId,
            peopleQuantity: req.body.peopleQtd,
            date: req.body.date,
            type: req.body.type,
            value: req.body.totalValue,
            description: req.body.description,
            usuarioId: req.body.idUser,
            paymentId: paymentId,
            placeId: req.body.place.id
        });


        //place reserve
        // HiredPlace.create({
        //     id: generateId(),
        //     reservedDate: req.body.date,
        //     placeId: req.body.place.id,
        // })

        //equipaments
        // if(req.body.equipaments != ""){
        //     for(i = 0; i < req.body.equipaments.length; i++){
        //         AllocatedEquipament.create({
        //             id: generateId(),
        //             quantity: req.body.equipaments[i].qtd,
        //             date: req.body.date,
        //             totalValue: req.body.equipamentPrice,
        //             equipamentId: req.body.equipaments[i].id,
        //             eventId: eventId
        //         })
        //     }
        // }
        

        //buffet
        if(req.body.buffet != ""){
            for(i = 0; i < req.body.buffet.cart.length; i++){
                Buffet.create({
                    id: generateId(),
                    quantity: req.body.buffet.cart[i].quantity,
                    totalValue: req.body.buffet.cart[i].totalValue,
                    menuId: req.body.buffet.cart[i].menuId,
                    eventId: eventId,
                })
            }
        }


        //workes
        if(req.body.workes != ""){
            for(i = 0; i < req.body.workes.length; i++){
                WorkeSelected.create({
                    id: generateId(),
                    salary: req.body.workes[i].workerData.salary,
                    date: req.body.date,
                    eventId: eventId,
                    workerId: req.body.workes[i].workerData.id,
                })
            }
        }





        res.send({result: true});
    },
    remove: async function(req, res){

    }
}


function generateId(){
    return Math.random().toString(36).substring(2,9);
}


module.exports = eventController;