const express = require('express');
const { createEmployee,deleteEmployees, getEmployees } = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createEmployee);
router.get('/', authMiddleware, getEmployees);
router.delete('/:employeeId',deleteEmployees)

module.exports = router;
