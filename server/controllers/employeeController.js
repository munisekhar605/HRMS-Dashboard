const Employee = require('../models/employeeModel');

exports.createEmployee = async (req, res) => {
  const { name, email, phone, position, department, dateOfJoining } = req.body;

  if (!name || !email || !phone || !position || !department || !dateOfJoining) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ msg: 'Employee with this email already exists' });
    }

    const newEmployee = new Employee({ name, email, phone, position, department, dateOfJoining });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error('Error creating employee:', err.message);
    res.status(500).json({ msg: 'Error creating employee', error: err.message });
  }
};

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find(); 
    if (!employees.length) {
      return res.status(404).json({ msg: 'No employees found' });
    }
     res.status(201).json({ success: true, data: employees });
  } catch (err) {
    console.error('Error fetching employees:', err.message);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

exports.deleteEmployees = async (req, res) => {
  const { employeeId } = req.params; 
  
  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' }); 
    }
    await Employee.deleteOne({ _id: employeeId }); 
    res.status(200).json({ success: true, msg: 'Employee deleted successfully' }); 
  } catch (err) {
    console.error('Error deleting employee:', err.message);
    res.status(500).json({ msg: 'Error deleting employee', error: err.message }); 
  }
};
