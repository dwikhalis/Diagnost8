const Controller = require("../controllers/controller")

const userRoute = require("express").Router()

userRoute.get("/", Controller.home)

userRoute.get("/users/signUpProfile", Controller.signUpProfile)

userRoute.post("/users/signUpProfile", Controller.signUpProfilePost)

userRoute.post("/users/signIn", Controller.signInPost)

userRoute.post("/users/signUpUser", Controller.signUpUserPost)

userRoute.get("/users/signUp", Controller.signUp)

userRoute.post("/users/signUp", Controller.signUpPost)

userRoute.get("/users/guest", Controller.guestHome)

userRoute.get("/users/admin", Controller.adminHome)

userRoute.get("/users/admin/profileList", Controller.profileList)

module.exports = userRoute