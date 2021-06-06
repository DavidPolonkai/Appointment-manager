const { json } = require("express");
const User = require("../models/user");
const router = require("express").Router();

router.route("/create").post((req, res) =>
{
    User.create(req.body, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.json(data);
        }
    })
});

router.route("/getAll").get((req, res) => {
    User.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    })   
});

router.route("/find").post((req, res) => {
    User.findOne(req.body,'_id,name,email,address', (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
   })
});


module.exports = router