const { json } = require("express");
const Appointment = require("../models/appointment");
const router = require("express").Router();

router.route("/getByUser/:id").get((req, res) =>
{
    const userid = req.params.id.split("=")[1];
    Appointment.find({ 'userid': userid }, (error, data)=> {
        if (error) {
            return error;
        } else {
            console.log(data);
            res.json(data);
        }
    })
});

router.route("/create").post((req, res) =>
{
    Appointment.create(req.body, (error, data) => {
        console.log(data);
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    })
});

router.route("/delete/:id").delete((req, res) => {
    const id = req.params.id.split("=")[1];
    Appointment.deleteOne({ '_id': id }, (error, data) => {
        if (error) {
            return error;
        } else {
            res.json(data);
        }
    })
})

router.route("/update").put((req, res) => {
    Appointment.updateOne(req.body)
})

module.exports = router