const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    department: { type: String, required: true },
    experience: { type: String, required: true },
    resume: { type: String, required: true },
    status: { 
        type: String, 
        default: "New", 
        enum: ["New", "Pending", "Selected", "Rejected"], 
    },
}, { timestamps: true });  

const Candidate = mongoose.model('Candidate', CandidateSchema);

module.exports = Candidate;
