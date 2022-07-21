const Controller = require("../controllers/controller")

const diseaseRoute = require("express").Router()

diseaseRoute.get("/diseases", Controller.diseaseList)

diseaseRoute.get("/diseases/add", Controller.diseaseAdd)

diseaseRoute.post("/diseases/add", Controller.diseaseAddPost)

diseaseRoute.get("/diseases/:id", Controller.diseaseDetail)

diseaseRoute.get("/diseases/:id/medicine", Controller.diseaseMedicine)

diseaseRoute.get("/diseases/:id/delete", Controller.diseaseDelete)

diseaseRoute.get("/diseases/:id/change", Controller.diseaseChange)

diseaseRoute.post("/diseases/:id/change", Controller.diseaseChangePost)

diseaseRoute.get("/users/guest/diseases/", Controller.guestDisease)


module.exports = diseaseRoute