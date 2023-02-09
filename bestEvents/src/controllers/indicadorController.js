
const Event = require("../models/Event");
const User = require("../models/User");
const Worker = require("../models/Worker");
const HiredWorker = require("../models/HiredPlace");


const indicadorController = {
    cadastrosConvertidos: async function(req, res){
        const allEvents = await Event.findAll();
        const allUsers = await User.findAll();
        console.log(allEvents.length);
        console.log(allUsers.length);

        const qttEvents = parseInt(allEvents.length);
        const qttUsers = parseInt(allUsers.length);

        // const result = (qttEvents / qttUsers);
        
        // console.log(result);
        res.send({
            qttEvents: qttEvents,
            qttUsers: qttUsers,
        });
    },
    funcSemEventos: async function(req, res){
        const allWorkers = await Worker.findAll();
        const allHiredWorkers = await HiredWorker.findAll();

        const qttWorkers = parseInt(allWorkers.length);
        const qttHiredWorkers = parseInt(allHiredWorkers.length);

        res.send({
            qttWorkers: qttWorkers,
            qttHiredWorkers: qttHiredWorkers,
        })
    }
};


module.exports = indicadorController;