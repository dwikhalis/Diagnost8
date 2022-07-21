
const { Disease, Log, Medicine, User, Profile } = require("../models")

class Controller {

    static home(req, res) {
        res.render("home")
    }

    static diseaseList(req, res) {
        Disease.findAll({})
            .then(data => {
                res.render("diseases", { data })
            })
            .catch((err) => {
                res.send(err)
            })
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
            }
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
        Medicine.findAll({})
            .then(data => {
                res.render("medicines", { data })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static diseaseAdd(req, res) {
        res.render("diseasesAdd")
    }

    static diseaseAddPost(req, res) {
        Disease.create(req.body)
            .then(res.redirect("/diseases"))
            .catch((err) => {
                res.send(err)
            })
    }

    static diseaseDelete(req, res) {
        Disease.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(
                Disease.findAll({})
                    .then(data => {
                        res.render("diseases", { data })
                    })
                    .catch((err) => {
                        res.send(err)
                    })
            )
            .catch((err) => {
                res.send(err)
            })
    }

    static medicineAdd(req, res) {
        res.render("medicineAdd")
    }

    static medicineAddPost(req, res) {
        Medicine.create(req.body)
            .then(res.redirect("/medicines"))
            .catch((err) => {
                res.send(err)
            })
    }

    static medicineDelete(req, res) {
        Medicine.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(
                Medicine.findAll({})
                    .then(data => {
                        res.render("medicines", { data })
                    })
                    .catch((err) => {
                        res.send(err)
                    })
            )
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
                res.send(err)
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
                res.send(err)
            })
    }

    static diseaseChange(req, res) {
        res.render("diseaseChange")
    }

    static diseaseChangePost(req, res) {
        console.log(req.body)
        Disease.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(
            res.redirect("/diseases")
        )
        .catch((err) => {
            res.send(err)
        })
    }

}

module.exports = Controller