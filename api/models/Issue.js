const mongoose = require('mongoose');
const Project = require('./Project');
const Schema = mongoose.Schema;

// Define collection and schema for Issues
let Issue = new Schema({

    description: {
        type: String,
        required: true
    },

    priority: {
        type: String,
        enum: ["low", "high", "medium"]
    },

    assignedTo: {
        type: String
    },

    category: {
        type: String,
        enum: ["Bug", "Incident"]
    },

    status: {
        type: String,
        enum: ["Pending", "QA", "Implementation", "Closed"]
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }
});

module.exports = mongoose.model('Issue', Issue);