// issue.route.js

const express = require('express');
//const app = express();
const issueRoutes = express.Router();

const veriftoken = require('./veriftoken');

// Require Issue model in our routes module
const Issue = require('../models/Issue');
const Project = require('../models/Project');
const User = require('../models/User');


/**
 * @swagger
 * /issue/add:
 *   post:
 *     tags:
 *       - Issue
 *     description: Ajoute une issue
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: issue
 *         description: objet json (issue à ajouter)
 *         in: body
 *         required: true
 *         type: object
 *     responses:
 *       201:
 *         description: Issue ajouté
 */

issueRoutes.route('/add').post(veriftoken.verifyToken, async function(req, res) {

    let issue = new Issue(req.body);

    let project = await Project.findOne({ _id: issue.project });
    project.issues.push(issue._id);

    await project.save((err) => {
        res.status(500).end;
    });

    // save the issue
    issue.save()
        .then(issue => {
            res.status(201).json({ 'issue': 'issue in added successfully' });
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

/**
 * @swagger
 * /issue/projectUsers/{projectId}:
 *   get:
 *     tags:
 *       - Issue
 *     description: Retourne la liste des membres pour un projet donné
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
 *         description: success
 */
issueRoutes.route('/projectUsers/:projectId').get(veriftoken.verifyToken, async(req, res) => {

    const projectId = req.params.projectId;

    data = {
        members: []
    }

    function Member(_email, _name, _lname) {
        this.email = _email;
        this.name = _name,
            this.lname = _lname
    }

    user = await User.findOne({ _id: req.userId })

    if (user) {
        let m = new Member(user.email, user.name, user.lname);
        data.members.push(m);
    }


    Project.findOne({ _id: projectId })
        .populate('members')
        .exec((err, project) => {

            if (!project) {
                console.log("pas de projet")

            } else {

                if (err) {
                    res.status(400).json("error with project Users");
                }

                if (project.members !== []) {
                    for (i in project.members) {
                        let m = new Member(project.members[i].email, project.members[i].name, project.members[i].lname);
                        data.members.push(m);
                    }
                }

                res.status(200).json(data);
            }


        });

});

/**
 * @swagger
 * /issue/list/{id}:
 *   get:
 *     tags:
 *       - Issue
 *     description: Retourne les issues d'un projet donné
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: project id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: liste des issues retournée
 */

issueRoutes.route('/list/:id').get(veriftoken.verifyToken, (req, res) => {

    const id = req.params.id;

    Project.findOne({ _id: id })
        .populate('issues')
        .exec((err, project) => {

            if (err) {
                res.status(500).end;
            }
            const issues = project.issues;
            res.status(200).json(issues);
        });

});


/**
 * @swagger
 * /issue/spec/{id}:
 *   get:
 *     tags:
 *       - Issue
 *     description: Retourne l'issue dont l'id est donné en paramètres
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Issue id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Issue returned
 */
issueRoutes.route('/spec/:id').get((req, res) => {
    const id = req.params.id;
    Issue.findOne({ _id: id }, (err, issue) => {
        if (err) {
            res.status(401).send('there is a problem')
        } else {
            res.json(issue);
        }
    });
});



issueRoutes.route('/edit/:id').get(veriftoken.verifyToken, function(req, res) {
    let id = req.params.id;
    Issue.findById(id, function(err, issue) {
        res.json(issue);
    });
});

/**
 * @swagger
 * /issue/update:
 *   put:
 *     tags:
 *       - Issue
 *     description: Met à jour une issue (l'id de l'issue a mettre à jour est récuperer directement dans le cors de la requête)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: issue
 *         description: issue à mettre à jour
 *         in: body
 *         required: true
 *         type: object
 *     responses:
 *       201:
 *         description: Issue mise à jour
 */

issueRoutes.route('/update').put(veriftoken.verifyToken, (req, res) => {

    Issue.updateOne({ _id: req.body._id }, req.body, (err) => {
        if (err) {
            res.status(400).send('not modified !');
        }
        res.status(201).json({ 'message': 'updated' });
    });
});


/**
 * @swagger
 * /issue/delete/{id}:
 *   delete:
 *     tags:
 *       - Issue
 *     description: Supprime l'issue avec l'id donné en paramètres
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Issue id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Issue supprimée
 */

issueRoutes.route('/delete/:id').delete(veriftoken.verifyToken, function(req, res) {
    Issue.findByIdAndRemove({ _id: req.params.id }, function(err, issue) {
        if (err) res.json(err);
        else res.status(200).json('Successfully removed');
    });
});

/**
 * @swagger
 * /issue/takeIssue/{issueId}:
 *   get:
 *     tags:
 *       - Issue
 *     description: Prendre la main par l'utilisateur courant sur l'issue dont l'id est donné en paramètres 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: issueId
 *         description: Issue id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Issue en main
 */

issueRoutes.route('/takeIssue/:issueId').get(veriftoken.verifyToken, (req, res) => {
    const issueId = req.params.issueId;
    const userId = req.userId;

    User.findOne({ _id: userId }).then(async user => {
            const issue = await Issue.findOne({ _id: issueId });
            issue.assignedTo = user.email;
            issue.save();

            res.status(200).end();
        })
        .catch(err => {
            res.status(400).send("Unable to take the issue")
        })

})


/**
 * @swagger
 * /issue/getIssues:
 *   get:
 *     tags:
 *       - Issue
 *     description: Retourne les liste des issues dont l'utilisateur courant a la main
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Issues retournées
 */

issueRoutes.route('/getIssues').get(veriftoken.verifyToken, async(req, res) => {

    user = await User.findOne({ _id: req.userId })

    if (!user) {
        res.status(400).json("cannot get current user issues")
    } else {
        Issue.find({ assignedTo: user.email })
            .populate('project')
            .exec((err, issues) => {
                if (err) {
                    res.status(400).json("cannot get current user issues")
                } else {
                    res.status(200).json(issues)
                }
            })
    }
})


/**
 * @swagger
 * /issue/isAdmin/{projectId}:
 *   get:
 *     tags:
 *       - Issue
 *     description: Retourne vrai si l'utilisateur courant est l'admin du projet dont l'id est donné en paramètres, retourne faux sinon
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
 *         description: Get user by id
 */
issueRoutes.route('/isAdmin/:projectId').get(veriftoken.verifyToken, (req, res) => {

    userId = req.userId
    projectId = req.params.projectId

    Project.findOne({ _id: projectId, admin: userId }, (err, project) => {
        if (err) {
            res.status(400).json("cannot define if user is admin")
        } else {
            if (!project) {

                res.status(200).json(false)
            } else {

                res.status(200).json(true)
            }
        }
    })
})

/**
 * @swagger
 * /issue/next/{issueId}:
 *   get:
 *     tags:
 *       - Issue
 *     description: Met à jour le status d'une issue dont l'id est donné en paramètres
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Status mis à jour
 */

issueRoutes.route('/next/:issueId').get(veriftoken.verifyToken, async(req, res) => {

    issueId = req.params.issueId;

    status = ['Pending', 'Implementation', 'QA', 'Closed'];

    issue = await Issue.findOne({ _id: issueId });

    if (!issue) {
        res.status(400).json("there is an error")
    } else {
        index = status.indexOf(issue.status)
        index = (index + 1) % 4
        issue.status = status[index];
        issue.save()

        res.status(200).json("status updated")

    }
})


module.exports = issueRoutes;