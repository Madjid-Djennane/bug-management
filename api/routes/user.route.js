const express = require('express');
const userRoutes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

let User = require('../models/User');

//Verification of the token


let verifyToken = function(req, res, next) {
    console.log(req);
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }

    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }

    let payload = jwt.verify(token, 'eyJpc3MiOiJ0b2RvYXBpIiwibmJmIjoxND')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }

    req.userId = payload.subject
    next()
}

// add user

userRoutes.route('/add').post((req, res) => {

    let new_email = req.body.email;
    let new_uname = req.body.uname;

    User.findOne().or([{ email: new_email }, { uname: new_uname }])
        .then(async use => {

            if (use != null) {

                if (new_email === use.email) {
                    res.statusMessage = "e-mail already exists";
                    res.status(409).end();
                } else {
                    res.statusMessage = "user name already exists";
                    res.status(409).end();
                }
            } else {
                let user = new User(req.body);

                try {
                    const hashPassword = await bcrypt.hash(user.password, 10);
                    user.password = hashPassword;
                    user.save()
                        .then(user => {
                            res.status(201).json({ 'issue': 'user is added successfully' });
                        })
                        .catch(err => {
                            //console.log(err);
                            res.status(400).json(err);

                        });

                } catch (err) {
                    res.status(500).send(err);
                }

            }

        })
        .catch(err => {
            console.error(err);
        });

});

// get Users

userRoutes.route('/').get(verifyToken, (req, res) => {
    User.find((err, users) => {
        if (err) {
            res.status(400).end(err);
        } else {
            res.json(users);
        }
    });
});


// Activate user
userRoutes.route('/setActivation').post(async(req, res) => {

    console.log(req.body);

    if (req.body.active === false || req.body.active === '') {
        await User.updateOne({ uname: req.body.uname }, { active: true });
        res.status(200).send('Activation enabled');
    } else {
        await User.updateOne({ uname: req.body.uname }, { active: false });
        res.status(200).send('Activation disabled');
    }

});


module.exports = userRoutes;