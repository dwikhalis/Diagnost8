const Controller = require("../controllers/controller")

const userRoute = require("express").Router()

userRoute.get("/", Controller.home)

userRoute.get("/users/signup", Controller.home)

userRoute.get("/admin/:id", Controller.home)

userRoute.get("/users/:id", Controller.home)

module.exports = userRoute