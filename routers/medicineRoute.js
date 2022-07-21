const Controller = require("../controllers/controller")

const medicineRoute = require("express").Router()

medicineRoute.get("/medicines", Controller.medicineList)

medicineRoute.get("/medicines/add", Controller.medicineAdd)

medicineRoute.post("/medicines/add", Controller.medicineAddPost)

medicineRoute.get("/medicines/:id/delete", Controller.medicineDelete)



module.exports = medicineRoute