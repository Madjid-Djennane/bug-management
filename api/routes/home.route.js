const express = require('express');
const User = require('../models/User');
const Project = require('../models/Project');
const Issue = require('../models/Issue')
const veriftoken = require('./veriftoken');

const mainRoutes = express.Router();


/**
 * @swagger
 * /home:
 *   get:
 *     tags:
 *       - Home 
 *     description: retourne la liste des project de l'utilisateur courant (projets membre et admin)
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 */

mainRoutes.route('/').get(veriftoken.verifyToken, (req, res) => {

    // Les projets auquels l'utilisateur appartient 
    //(en tant qu'admin ou bien en tant que membre)

    userProjects = {
        admin: null,
        member: null,
    }

    User.findOne({ _id: req.userId })
        .populate('projects')
        .populate('projectsAdmin')
        .exec((err, user) => {

            if (err) {
                res.status(500).end();
            }

            userProjects.member = user.projects;
            userProjects.admin = user.projectsAdmin;



            res.json(userProjects)
        });

});


/**
 * @swagger
 * /home/user:
 *   get:
 *     tags:
 *       - Home
 *     description: retourne la liste des utilisateurs
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 */

mainRoutes.route('/user').get(veriftoken.verifyToken, (req, res) => {

    const id = req.userId;

    User.findOne({ _id: id }, (err, user) => {
        if (err) res.status(500).end;
        res.status(200).json(user);
    });
});

/**
 * @swagger
 * /home/deleteProject/{projectId}:
 *   delete:
 *     tags:
 *       - Home
 *     description: supprime un projet et toutes les références des issues et utilisateurs à ce projet 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: projectId
 *         description: project id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: projet supprimé
 */

mainRoutes.route('/deleteProject/:projectId').delete(veriftoken.verifyToken, (req, res) => {
    const projectId = req.params.projectId;

    Project.findByIdAndRemove({ _id: projectId }, (err, project) => {
        if (err) {
            res.statusMessage = "Cannot delete project"
            res.status(400).end()
        }

        Issue.deleteMany({ _id: project.issues }, err => {
            if (err) {
                res.status(400).json("Cannot delete project")
            }

        })

        User.findOne({ _id: project.admin }, (err, user) => {
            if (err) {
                res.status(400).json("Cannot delete project")
            }

            let index = user.projectsAdmin.indexOf(projectId)
            if (index !== -1) user.projectsAdmin.splice(index, 1)

            user.save(err => {
                if (err) {
                    res.status(400).json("Cannot delete project")
                }

            })
        })


        User.find({ _id: project.members }, (err, users) => {
            if (err) {
                res.status(400).json("Cannot delete project")
            }

            for (i in users) {
                let user = users[i]
                let index = user.projects.indexOf(projectId)
                if (index !== -1) user.projects.splice(index, 1)
                user.save(err => {
                    if (err) {
                        res.status(400).json("Cannot delete project")
                    }

                })
            }
        })

        res.status(200).json("Successfully removed")
    })
})

// tells if is admin or not 

module.exports = mainRoutes;