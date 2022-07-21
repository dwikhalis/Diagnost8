
const { Disease, Log, Medicine, User} = require("../models")

class Controller {

    static home(req, res) {
        res.render("home")
    }

    static diseaseList(req, res) {
        Disease.findAll({})
        .then(data => {
            res.render("diseases", {data})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static diseaseDetail(req,res) {
        Disease.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            console.log(data)
            res.render("diseaseDetail", {data})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static diseaseMedicine(req,res) {
        Disease.findAll({
            include: Medicine,
            where: {
                id: req.params.id
            }
        })
        .then(data => {

            // res.send(data[0].Medicines)
            res.render("diseaseMedicine", {data})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static medicineList(req, res) {
        Medicine.findAll({})
        .then(data => {
            res.render("medicines", {data})
        })
        .catch((err) => {
            res.send(err)
        })
    }
    

}

module.exports = Controller