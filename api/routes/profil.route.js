// profil.route.js

const express = require('express')
    //const app = express();
const profilRoutes = express.Router()
const veriftoken = require('./veriftoken')
const bcrypt = require("bcrypt")

const User = require('../models/User')


/**
 * @swagger
 * /profil:
 *   get:
 *     tags:
 *       - Profil
 *     description: Retourne l'utilisateur courent
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: utilisateur courant
 *         in: body
 *         required: true
 *         type: object
 *     responses:
 *       200:
 *         description: Utilisateur retourné
 */


profilRoutes.route('/').get(veriftoken.verifyToken, (req, res) => {
    const userId = req.userId

    User.findOne({ _id: userId }).then(user => {
            user.password = '';
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).json("can't get user profil")
        })
})

/**
 * @swagger
 * /profil/update:
 *   put:
 *     tags:
 *       - Profil
 *     description: Met à jour les données personnelles de l'utilisateur courant
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: utilisateur courant
 *         in: body
 *         required: true
 *         type: object
 *     responses:
 *       201:
 *         description: Utilisateur mis à jour
 */

profilRoutes.route('/update').put(veriftoken.verifyToken, async(req, res) => {
    const userId = req.userId
    const newUser = req.body

    const user = await User.findOne({ _id: userId })

    if (user) {
        user.name = newUser.name
        user.lname = newUser.lname
        user.uname = newUser.uname
        user.email = newUser.email

        user.save()
            .then(user => {
                res.status(201).json('user updated with success')
            })
            .catch(err => {
                res.status(400).json(err)
            })

    } else {
        res.status(400).json("User not found")
    }
})


/**
 * @swagger
 * /profil/updatePassword:
 *   put:
 *     tags:
 *       - Profil
 *     description: Met à jour le mot de passe de l'utilisateur courant
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: password
 *         description: ancien et nouveau mot de passe
 *         in: body
 *         required: true
 *         type: object
 *     responses:
 *       201:
 *         description: Mot de pas mis à jour
 */

profilRoutes.route('/updatePassword').put(veriftoken.verifyToken, async(req, res) => {

    const userId = req.userId
    const password = req.body.pass
    const newPassword = req.body.Newpwd

    let user = await User.findOne({ _id: userId })

    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            const hashPassword = await bcrypt.hash(newPassword, 10)
            user.password = hashPassword
            user.save()
                .then(user => {

                    res.status(201).json('Password updated with success')
                })
                .catch(err => {
                    res.status(400).json(err)
                })
        } else {
            res.statusMessage = 'Password not correct'
            res.status(409).end()
        }

    } else {
        res.status(400).json("user not found")
    }

})

module.exports = profilRoutes;