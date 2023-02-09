const BuffetCompany = require("../models/BuffetCompany");
const BuffetMenu = require("../models/BuffetMenu");
const BuffetEvent = require("../models/Buffet");

const buffetController = {
    allCompany: async function(req, res){
        const companyData = await BuffetCompany.findAll();

        res.send(companyData);

    },
    company: async function(req, res){
        const companyData = await BuffetCompany.findAll({where:{id: req.body.companyId}});

        res.send(companyData);
    },
    menu: async function(req, res){
        const menuData = await BuffetMenu.findAll({where:{empresaBuffetId: req.body.companyId}});

        res.send(menuData);
    }
}


function generateId(){
    return Math.random().toString(36).substring(2,9);
}

module.exports = buffetController;