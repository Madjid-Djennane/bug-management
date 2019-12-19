// issue.route.js

const express = require('express');
//const app = express();
const projectRoutes = express.Router();

const Project = require("../models/Project");
const User = require("../models/User");

// Require Issue model in our routes module

/* 
projectRoutes.route('/:member').get((req, res) => {

    member = req.params.member;

    User.findOne({ uname: member }, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err });
        }

        Project.findOne({ title: "projet 1" }, (err, project) => {

            if (err) {
                res.status(500).json({ error: err });
            }

            project.members.push(user.id);
            project.save();

        });

        res.send(user.uname)

                let project = new Project({
                    title: "projet 1",
                    description: "this is project n°1",
                    admin: user.id
                });

                project.save((err) => {
                    if (err) console.log(err);
                    res.send('project created');
                }) 
    });





});
*/

// before adding new project

projectRoutes.route('/addProject').get((req, res) => {

    let data = {
        users: [],
        projects: []
    }

    User.find({}).select("email -_id").then((user) => {
            for (element in user) {
                data.users.push(user[element].email)
            }

            Project.find({}).select('name -_id').then((project) => {

                    for (element in project) {
                        data.projects.push(project[element].name);
                    }

                    res.json(data)

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


// add a new project 

projectRoutes.route('/add').post((req, res) => {
    // console.log(req.body);
    let project = {
        title: req.body.title,
        description: req.body.description,
        admin: req.body.admin,
        members: []
    }

    const users = req.body.members;

    /*     User.findOne({_id:project.admin}).then(user => {

        })
        .catch(err => {

        }) */


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
                console.log(err)
                res.status(400).send("error with id users")
            }
        )


    //console.log(project);


})


module.exports = projectRoutes;