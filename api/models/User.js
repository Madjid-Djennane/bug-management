let mongoose = require('mongoose');

let userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    lname: {
        type: String,
        required: true
    },

    uname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
    },

    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }],

    projectsAdmin: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }]

});

let User = module.exports = mongoose.model('User', userSchema);