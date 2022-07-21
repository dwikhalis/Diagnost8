console.clear()

const { Router } = require('express')
const express = require("express")
const diseaseRoute = require('./routers/diseaseRoute')
const medicineRoute = require('./routers/medicineRoute')
const userRoute = require('./routers/userRoute')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(medicineRoute)
app.use(diseaseRoute)
app.use(userRoute)
app.set('view engine', 'ejs')

app.listen(port, () => {
    console.log(`Listening ${port}`)
})