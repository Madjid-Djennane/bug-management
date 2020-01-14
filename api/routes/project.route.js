// project.route.js

const express = require('express');
//const app = express();
const projectRoutes = express.Router();

const Project = require("../models/Project");
const User = require("../models/User");
const veriftoken = require('./veriftoken')

// Require Issue model in our routes module


/**
 * @swagger
 * /project/getUsersEmails:
 *   get:
 *     tags:
 *       - Project
 *     description: Retourne les emails de tous les utilisateurs (susceptible d'appartenir à un projet)
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: emails des utilisateurs retournés
 */

projectRoutes.route('/getUsersEmails').get(veriftoken.verifyToken, (req, res) => {

    let data = {
        users: [],
        projects: []
    }

    User.find({}).select("email -_id").then((user) => {
            for (element in user) {
                data.users.push(user[element].email)
            }

            Project.find({}).select('title -_id').then((project) => {

                    for (element in project) {
                        data.projects.push(project[element].title);
                    }

                    res.status(200).json(data)

                })
                .catch(error => {
                    console.log('error on projects list')
                    res.statusMessage = 'error on projects list';
                    res.status(400).end();
                })

        })
        .catch(error => {
            console.log('error on user list')
            res.statusMessage = 'error on user list';
            res.status(400).end();
        })

});


/**
 * @swagger
 * /project/add:
 *   post:
 *     tags:
 *       - Project
 *     description: Ajouter un projet
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: project
 *         description: projet à ajouter
 *         in: body
 *         required: true
 *         type: object
 *     responses:
 *       200:
 *         description: Projet ajouté
 */

projectRoutes.route('/add').post(veriftoken.verifyToken, (req, res) => {

    let project = {
        title: req.body.title,
        description: req.body.description,
        admin: req.body.admin,
        members: []
    }

    const users = req.body.members;

    User.find({ email: users }).select("_id").then(user => {

            for (i in user) {
                project.members.push((user[i]._id))
            }

            let projet = new Project(project);
            projet.save().then(proj => {

                    User.find({ _id: proj.members }).then(use => {
                            for (i in use) {
                                use[i].projects.push(proj._id);
                                use[i].save().then().catch(err => {
                                    res.status(500).end
                                })
                            }

                        })
                        .catch(err => {
                            res.status(409).end()
                        })

                    User.findOne({ _id: project.admin }).then(user => {
                            user.projectsAdmin.push(proj._id)
                            user.save().then().catch(err => {
                                res.status(500).end()
                            })
                        })
                        .catch(err => {
                            res.status(409).end()
                        })


                    res.status(201).json({ "message": "project added !" })
                })
                .catch(err => {
                    //console.log(err)
                    res.statusMessage = "error : project not added"
                    res.status(400).end()
                })


        })
        .catch(
            err => {

                res.status(400).send("error with id users")
            }
        )

})

/**
 * @swagger
 * /project/getProject/{projectId}:
 *   get:
 *     tags:
 *       - Project
 *     description: Retourne le projet dont l'id est donné en paramètre
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
 *         description: Projet retourné
 */

projectRoutes.route('/getProject/:projectId').get(veriftoken.verifyToken, (req, res) => {


    const projectId = req.params.projectId;
    Project.findOne({ _id: projectId })
        .populate('members')
        .exec((err, project) => {

            if (err) res.status(500).end;

            res.status(200).json(project);
        });
})

/**
 * @swagger
 * /project/update:
 *   put:
 *     tags:
 *       - Project
 *     description: Met à jour un projet
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: project
 *         description: projet a mettre à jour
 *         in: body
 *         required: true
 *         type: object
 *     responses:
 *       200:
 *         description: Projet mis à jour
 */

projectRoutes.route('/update').put(veriftoken.verifyToken, async(req, res) => {

    let project = req.body.project;
    project.members.length = 0;

    for (i in req.body.members) {
        mail = req.body.members[i]
        use = await User.findOne({ email: mail })
        if (use) {
            use.projects.push(project._id)
            use.save()
        }
    }


    User.find({ email: req.body.members }).select('_id').then(user => {
            for (i in user) {
                project.members.push((user[i]._id))

            }

            Project.updateOne({ _id: project._id }, project, async(err) => {
                if (err) {
                    res.statusMessage = 'cannot update project';
                    res.status(400).end();
                }

                res.status(200).json({ 'message': 'updated' });
            });
        })
        .catch(err => {
            res.statusMessage = 'cannot update project';
            res.status(400).end();
        })


});


module.exports = projectRoutes;