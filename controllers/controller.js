const { Op } = require("sequelize")
const { Disease, Log, Medicine, User, Profile } = require("../models")
const flatpickr = require("flatpickr")
const bcrypt = require("bcrypt")

class Controller {

    static home(req, res) {
        res.render("home")
    }

    static guestHome(req, res) {
        res.render("dashboardUser")
    }

    static adminHome(req, res) {
        res.render("dashboardAdmin")
    }

    static signUp(req, res) {
        res.render("signUp")
    }

    static signUpPost(req, res) {
        const {name, gender, dateOfBirth, email, password, role} = req.body
        const profileInput = {name, gender, dateOfBirth}
        const userInput = {email, password, role}

        Profile.create(profileInput)
            .then((profile) => {
                const profileId = profile.dataValues.id
                userInput.ProfileId = profileId

                const saltRounds = 10
                const hashedPassword = bcrypt.hashSync(password, saltRounds)

                userInput.password = hashedPassword

                User.create(userInput)
                    .then((user) => {
                        // todo add session
                        res.redirect("/users/admin")
                    })
                    .catch((err) => {
                        if(err.name === "SequelizeValidationError") {
                            const errors = err.errors.map((el) => el.message)
                            res.redirect(`/users/signUp?errors=${errors}`)
                        }
                        else {
                            res.send(err)
                        }
                    })
            })
            .catch((err) => {
                if(err.name === "SequelizeValidationError") {
                    const errors = err.errors.map((el) => el.message)
                    res.redirect(`/users/signUp?errors=${errors}`)
                }
                else {
                    res.send(err)
                }
            })
    }

    static signInPost(req, res) {
        User.findAll({
            include: Profile,
            where : {
                email: req.body.email,
            }
        })
        .then(data => {
            const isValidPassword = bcrypt.compareSync(req.body.password, data[0].password)

            if (!isValidPassword) {
                res.redirect(`/?password invalid`)
            }

            if (data[0].role === "Admin") {
                res.render("dashboardAdmin", {data})
            } else if (data[0].role === "Guest") {
                res.render("dashboardUser", {data})
            }
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static profileList(req, res) {
        if (Object.values(req.query).length > 0) {
            User.findAll({
                include: Profile,
                where: {
                    name: {
                        [Op.iLike]: "%" + req.query.search + "%"
                    }
                },
                order: [['id', 'desc']]
            })
                .then(data => {
                    res.render("profileList", { data })
                })
                .catch((err) => {
                    res.send(err)
                })
        } else {
            User.findAll({
                include: Profile,
                order: [['id', 'desc']]
            })
                .then(data => {
                    // res.send(data)
                    res.render("profileList", { data })
                })
                .catch((err) => {
                    res.send(err)
                })
        }
    }

    static diseaseList(req, res) {

        if (Object.values(req.query).length > 0) {
            Disease.findAll({
                where: {
                    diagnosis: {
                        [Op.iLike]: "%" + req.query.search + "%"
                    }
                },
                order: [['id', 'desc']]
            })
                .then(data => {
                    res.render("diseases", { data })
                })
                .catch((err) => {
                    res.send(err)
                })
        } else {
            Disease.findAll({
                order: [['id', 'desc']]
            })
                .then(data => {
                    res.render("diseases", { data })
                })
                .catch((err) => {
                    res.send(err)
                })
        }
    }

    static guestDisease(req,res) {
        if (Object.values(req.query).length > 0) {
            Disease.findAll({
                where: {
                    diagnosis: {
                        [Op.iLike]: "%" + req.query.search + "%"
                    }
                },
                order: [['id', 'desc']]
            })
                .then(data => {
                    res.render("guestDiseases", { data })
                })
                .catch((err) => {
                    res.send(err)
                })
        } else {
            Disease.findAll({
                order: [['id', 'desc']]
            })
                .then(data => {
                    res.render("guestDiseases", { data })
                })
                .catch((err) => {
                    res.send(err)
                })
        }
    }

    static diseaseDetail(req, res) {
        Disease.findAll({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                console.log(data)
                res.render("diseaseDetail", { data })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static diseaseMedicine(req, res) {
        Disease.findAll({
            include: Medicine,
            where: {
                id: req.params.id
            },
            order: [['id', 'desc']]
        })
            .then(data => {

                // res.send(data[0].Medicines)
                res.render("diseaseMedicine", { data })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static medicineList(req, res) {
        if (Object.values(req.query).length > 0) {
            Medicine.findAll({
                where: {
                    name: {
                        [Op.iLike]: "%" + req.query.search + "%"
                    }
                },
                order: [['id', 'desc']]
            })
                .then(data => {
                    res.render("medicines", { data })
                })
                .catch((err) => {
                    res.send(err)
                })
        } else {
            Medicine.findAll({
                order: [['id', 'desc']]
            })
                .then(data => {
                    res.render("medicines", { data })
                })
                .catch((err) => {
                    res.send(err)
                })
        }
    }

    static guestMedicines(req, res) {
        if (Object.values(req.query).length > 0) {
            Medicine.findAll({
                where: {
                    name: {
                        [Op.iLike]: "%" + req.query.search + "%"
                    }
                },
                order: [['id', 'desc']]
            })
                .then(data => {
                    res.render("guestMedicines", { data })
                })
                .catch((err) => {
                    res.send(err)
                })
        } else {
            Medicine.findAll({
                order: [['id', 'desc']]
            })

                .then(data => {
                    res.render("guestMedicines", { data })
                })
                .catch((err) => {
                    res.send(err)
                })
        }
    }

    static diseaseAdd(req, res) {
        res.render("diseasesAdd")
    }

    static diseaseAddPost(req, res) {
        const {name, diagnosis, procedure, status} = req.body
        const input = {name, diagnosis, procedure, status}

        Disease.create(input)
        .then(() => {res.redirect("/diseases")})
        .catch((err) => {
                if(err.name === "SequelizeValidationError") {
                    const errors = err.errors.map((el) => el.message)
                    res.redirect(`/diseases/add?errors=${errors}`)
                }
                else {
                    res.send(err)
                }
            })
    }

    static diseaseDelete(req, res) {
        Disease.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(res.redirect("/diseases"))
            .catch((err) => {
                res.send(err)
            })
    }

    static medicineAdd(req, res) {
        res.render("medicineAdd")
    }

    static medicineAddPost(req, res) {
        const {name, company, regDate, description } = req.body
        const input = { name, company, regDate, description }
        Medicine.create(input)
        .then(() => {res.redirect("/medicines")})
        .catch((err) => {
            if(err.name === "SequelizeValidationError") {
                const errors = err.errors.map((el) => el.message)
                res.redirect(`/medicines/add?errors=${errors}`)
            }
            else {
                res.send(err)
            }
        })
    }

    static medicineDelete(req, res) {
        Medicine.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(res.redirect("/medicines"))
            .catch((err) => {
                res.send(err)
            })
    }

    static signUpProfile(req, res) {
        res.render('signUpProfile')
    }

    static signUpProfilePost(req, res) {
        // res.send(req.body)
        Profile.create(req.body)
            .then({})
            .catch((err) => {
                if(err.name === "SequelizeValidationError") {
                    const errors = err.errors.map((el) => el.message)
                    res.redirect(`/users/signUpProfile?errors=${errors}`)
                }
                else {
                    res.send(err)
                }
            })

        Profile.findAll({
            where: {
                name: req.body.name
            }
        })
            .then(data => {
                let count = data.length - 1
                let send = data[count]
                console.log(send)
                res.render("signUpUser", { send })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static signUpUserPost(req, res) {
        User.create(req.body)
            .then(
                res.redirect("/")
            )
            .catch((err) => {
                if(err.name === "SequelizeValidationError") {
                    const errors = err.errors.map((el) => el.message)
                    res.redirect(`/users/signUpUser?errors=${errors}`)
                }
                else {
                    res.send(err)
                }
            })
    }

    static diseaseChange(req, res) {
        Disease.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            // res.send(data)
            res.render("diseaseChange", {data})

        })
        .catch((err) => {
            res.send(err)
        })
    }

    static diseaseChangePost(req, res) {
        Disease.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(
            res.redirect("/diseases")
        )
        .catch((err) => {
            if(err.name === "SequelizeValidationError") {
                const errors = err.errors.map((el) => el.message)
                res.redirect(`/diseases/${id}/change?errors=${errors}`)
            }
            else {
                res.send(err)
            }
        })
    }

    static medicineChange(req, res) {
        
        Medicine.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            res.render("medicineChange", {data})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static medicineChangePost(req, res) {
        Medicine.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then(
                res.redirect("/medicines")
            )
            .catch((err) => {
                res.send(err)
            })
    }

}

module.exports = Controller