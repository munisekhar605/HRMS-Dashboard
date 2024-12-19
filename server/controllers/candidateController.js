const Candidate = require('../models/candidateModel');
const { uploadPDFToS3 } = require('../service/awsS3Upload');


exports.newCandidate = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, department, experience, adminId} = req.body;

        if (!fullName || !email || !phoneNumber || !department || !experience) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const resumeUrl = await uploadPDFToS3(req);
        const newCandidate = new Candidate({
            fullName,
            email,
            phoneNumber,
            department,
            experience,
            resume: resumeUrl, 
        });
        await newCandidate.save();

        res.status(201).json({
            message: 'Candidate added successfully',
            candidate: newCandidate,
        });
    } catch (error) {
        console.error('Error adding candidate:', error);
        res.status(500).json({ message: 'Error adding candidate', error: error.message });
    }
};


// Fetch all candidates
exports.fetchCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching candidates' });
  }
};


// Delete a candidate
exports.deleteCandidate = async (req, res) => {
  const { candidateId } = req.params;
  try {
    await Candidate.findByIdAndDelete(candidateId);
    res.status(200).json({ msg: 'Candidate deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting candidate' });
  }
};


exports.updateStatus = async (req, res) => {
  const { candidateId } = req.params;  
  const { status } = req.body; 
  try {
  
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candidateId, 
      { status }, 
      { new: true } 
    );

    if (!updatedCandidate) {
      return res.status(404).json({ msg: 'Candidate not found' });
    }

    res.status(200).json(updatedCandidate);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating candidate status', error: err.message });
  }
};
