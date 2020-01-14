const express = require('express');
const bcrypt = require("bcrypt");
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const loginRoutes = express.Router();


/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Login
 *     description: Authentification d'un utilisateur. Retourne un token si l'utilisateur s'est authentifié 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: login
 *         description: User id
 *         in: body
 *         required: true
 *         type: object
 *     responses:
 *       200:
 *         description: Utilisateur authentifié
 */

loginRoutes.route('/').post(async(req, res) => {

    console.log(req)
    User.findOne({ uname: req.body.uname }).then(async user => {

        if (user == null) {
            res.statusMessage = "User name or password not correct";
            return res.status(409).end();
        }

        //console.log(user);
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {

                let payload = { subject: user.id };
                let token = jwt.sign(payload, 'eyJpc3MiOiJ0b2RvYXBpIiwibmJmIjoxND');
                res.status(200).send({ token });
            } else {
                res.statusMessage = 'User name or password not correct';
                res.status(409).end();
            }
        } catch {
            res.status(500).send()
        }

    }, err => console.log(err));

});



module.exports = loginRoutes;