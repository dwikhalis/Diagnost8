const Controller = require("../controllers/controller")

const medicineRoute = require("express").Router()

medicineRoute.get("/medicines", Controller.medicineList)

medicineRoute.get("/medicines/add", Controller.medicineAdd)

medicineRoute.post("/medicines/add", Controller.medicineAddPost)

medicineRoute.get("/medicines/:id/delete", Controller.medicineDelete)

medicineRoute.get("/medicines/:id/change", Controller.medicineChange)

medicineRoute.post("/medicines/:id/change", Controller.medicineChangePost)

medicineRoute.get("/users/guest/medicines/", Controller.guestMedicines)



module.exports = medicineRoute