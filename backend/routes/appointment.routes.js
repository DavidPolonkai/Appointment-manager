const { json } = require("express");
const Appointment = require("../models/appointment");
const router = require("express").Router();
const checkIfAuthenticated = require("../JWTtoken/Validator").checkIfAuthenticated;

router.route("/getByUser/:id").get(checkIfAuthenticated,(req, res) =>
{
    const userid = req.params.id.split("=")[1];
    Appointment.find({ 'userid': userid }, (error, data)=> {
        if (error) {
            return error;
        } else {
            res.json(data);
        }
    })
});

router.route("/create").post(checkIfAuthenticated,(req, res) =>
{
    Appointment.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    })
});

router.route("/delete/:id").delete(checkIfAuthenticated,(req, res) => {
    const id = req.params.id.split("=")[1];
    Appointment.deleteOne({ '_id': id }, (error, data) => {
        if (error) {
            return error;
        } else {
            res.sendStatus(200);
        }
    })
});

router.route("/update").put(checkIfAuthenticated,(req, res) => {
    Appointment.updateOne({"_id": req.body._id}, req.body, (error, data) => {
        console.log(req.body);
        if (error) {
            return error;
        } else {
            res.json(data);
        }
    })
});

router.route("/getById/:id").get(checkIfAuthenticated,(req, res) => {
    const id = req.params.id.split("=")[1];
    Appointment.findById({'_id': id}, (error, data) => {
        if (error) {
            return error;
        } else {
            res.json(data);
        }
    })
});

module.exports = router