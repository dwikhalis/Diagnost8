const Controller = require("../controllers/controller")

const userRoute = require("express").Router()

userRoute.get("/", Controller.home)

userRoute.get("/users/signUpProfile", Controller.signUpProfile)

userRoute.post("/users/signUpProfile", Controller.signUpProfilePost)

userRoute.post("/users/signUpUser", Controller.signUpUserPost)

userRoute.get("/admin/:id", Controller.home)

userRoute.get("/users/:id", Controller.home)

module.exports = userRoute