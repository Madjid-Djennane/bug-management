let mongoose = require("mongoose");
// const User = require("./User");
// const Issue = require("./Issue");

let projectSchema = mongoose.Schema({
    title: {
        type: String
    },

    description: {
        type: String
    },

    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    issues: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue"
    }]

});

let Project = module.exports = mongoose.model('Project', projectSchema);