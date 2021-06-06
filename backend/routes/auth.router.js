const { json } = require("express");
const User = require("../models/user");
const router = require("express").Router();
var token = require("../JWTtoken/JWT").token;

router.route("/find").post((req, res) => {
    let founduser;
    console.log("asd");
    User.findOne(req.body, '_id,name,email,address', ( err, data ) => {
        founduser = data;
    });
    console.log(founduser);
    if (!founduser) return res.sendStatus(401);

    token = jwt.sign({ userID: founduser.id, username: founduser.name }, 'appointment-app-shared-secret', { expiresIn: '2h' });
    res.send({ token });
});
