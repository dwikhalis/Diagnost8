const Controller = require("../controllers/controller")

const diseaseRoute = require("express").Router()

diseaseRoute.get("/diseases", Controller.diseaseList)

diseaseRoute.get("/diseases/:id", Controller.diseaseDetail)

diseaseRoute.get("/diseases/:id/medicine", Controller.diseaseMedicine)

module.exports = diseaseRoute