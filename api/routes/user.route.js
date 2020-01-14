const express = require('express');
const userRoutes = express.Router();
const bcrypt = require("bcrypt");
const veriftoken = require('./veriftoken');

let User = require('../models/User');


/**
 * @swagger
 * /user/add:
 *   post:
 *     tags:
 *       - User
 *     description: Ajoute un utilisateur (vérifie si l'email et le nom d'utilisateur n'existant pas déjà)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: utilisateur à ajouter
 *         in: body
 *         required: true
 *         type: object
 *     responses:
 *       200:
 *         description: utilisateur ajouté
 */

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

/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - User
 *     description: Retourne un utilisateur
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user id
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Utilisateur retourné
 */

userRoutes.route('/').get(veriftoken.verifyToken, (req, res) => {

    console.log(req.userId);

    User.find((err, users) => {
        if (err) {
            res.status(400).end(err);
        } else {
            res.json(users);
        }
    });
});


/* // Activate user
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
 */

module.exports = userRoutes;