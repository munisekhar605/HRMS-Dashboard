import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Content-Type': 'application/json', 
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('JWT');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => Promise.reject(error) 
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Unauthorized: Redirecting to login...');
        localStorage.removeItem('JWT'); 
        window.location.href = '/login'; 
      } else {
        console.error('API Error:', error.response.data.message || error.message);
      }
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error); 
  }
);


// Sign up a new user
export const signup = async ({ email, password, fullName }) => {
  try {
    const response = await api.post('/api/auth/signup', { email, password, fullName });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

// Log in an existing user
export const login = async ({ email, password }) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error; 
  }
};


export const logout = () => {
  localStorage.removeItem('JWT'); 
  window.location.href = '/login'; 
};


export const fetchCandidates = async () => {
  try {
    const response = await api.get('/api/candidates');
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

// Add a new candidate
export const newCandidate = async (candidateData) => {
  try {
    const response = await api.post('/api/candidates/', candidateData);
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const updateStatus = async (candidateId, newStatus) => {
  try {
    const candidateData = { status: newStatus };
    const response = await api.put(`/api/candidates/updatestatus/${candidateId}`, candidateData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Delete a candidate
export const deleteCandidate = async (candidateId) => {
  try {
    const response = await api.delete(`/api/candidates/${candidateId}`);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};


export const getEmployees = async () => {
  try {
    const response = await api.get('/api/employees'); 
    return response.data; 
  } catch (error) {
    throw error; 
  }
};


export const createEmployee = async (employeeData) => {
  try {
    const response = await api.post('/api/employees', employeeData); 
    console.log("Employee added:", response.data); 
    return response.data; 
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error; 
  }
};

// Delete an employee
export const deleteEmployees = async (employeeId) => {
  try {
    console.log("id",employeeId)
    const response = await api.delete(`/api/employees/${employeeId}`);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};



export default api;
