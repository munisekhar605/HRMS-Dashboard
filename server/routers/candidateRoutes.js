const express = require('express');
const { fetchCandidates,updateStatus, newCandidate, deleteCandidate } = require('../controllers/candidateController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, fetchCandidates);
router.post('/',authMiddleware,newCandidate);
router.delete('/:candidateId', authMiddleware, deleteCandidate);
router.put('/updatestatus/:candidateId', updateStatus);
module.exports = router;
