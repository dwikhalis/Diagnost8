const Controller = require("../controllers/controller")

const medicineRoute = require("express").Router()

medicineRoute.get("/medicines", Controller.medicineList)



module.exports = medicineRoute