// issue.route.js

const express = require('express');
//const app = express();
const issueRoutes = express.Router();

// Require Issue model in our routes module
let Issue = require('../models/Issue');


// Defined store route
issueRoutes.route('/add').post(function(req, res) {
    let issue = new Issue(req.body);
    console.log(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({ 'issue': 'issue in added successfully' });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
});

// Defined get data(index or listing) route
issueRoutes.route('/').get((req, res) => {
    Issue.find(function(err, issues) {
        if (err) {
            console.log(err);
        } else {
            res.json(issues);
        }
    });
});

// get specific issue
issueRoutes.route('/:id').get((req, res) => {
    const id = req.params.id;
    Issue.findOne({ _id: id }, (err, issue) => {
        if (err) {
            res.status(401).send('there is a problem')
        } else {
            res.json(issue);
        }
    });
});



// Defined edit route
issueRoutes.route('/edit/:id').get(function(req, res) {
    let id = req.params.id;
    Issue.findById(id, function(err, issue) {
        res.json(issue);
    });
});

//  Defined update route
issueRoutes.route('/update').put((req, res) => {
    Issue.updateOne({ _id: req.body._id }, req.body, (err) => {
        if (err) {
            res.status(400).send('not modified !');
        }
        res.json({ 'message': 'updated' });
    });
});

// Defined delete | remove | destroy route
issueRoutes.route('/delete/:id').get(function(req, res) {
    Issue.findByIdAndRemove({ _id: req.params.id }, function(err, issue) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = issueRoutes;