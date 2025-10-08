const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoute');
const departmentRoutes = require('./routes/departmentRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/department', departmentRoutes);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
//   console.log(`API URL: http://localhost:${PORT}/api/students`);
});