const { json } = require("express");
const Appointment = require("../models/appointment");
const router = require("express").Router();

router.route("/getByUser").get((req, res) =>
{
    Appointment.find(req.body, (error, data)=> {
        if (error) {
            return next(error)
        } else {
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


/*router.route("/createuser").post((req, res) =>
{
    User.create(req.body, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.json(data);
        }
    })
});

router.route("/getAllUsers").get((req, res) => {
    User.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    })   
});

router.route("/findUser").post((req, res) => {
    User.findOne(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
   })
});
*/

module.exports = router