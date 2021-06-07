const { json } = require("express");
const User = require("../models/user");
const router = require("express").Router();
var token = require("../JWTtoken/JWT").token;
const jwt = require('jsonwebtoken');

router.route("").post((req, res) => {
    let founduser;
    console.log(req.body);
    User.findOne(req.body, '_id name', ( err,data ) => {
        founduser = data;
        if (!founduser) return res.sendStatus(401);

        token = jwt.sign({ userID: founduser._id, username: founduser.name }, 'appointment-app-shared-secret', { expiresIn: '200s' });
        console.log(token);
        res.send({
            token: token,
            timout: '200'
        });
    });
});
module.exports = router