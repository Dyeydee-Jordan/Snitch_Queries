const express = require('express');
const cors = require('cors');
const nutritionistRoute = require('./routes/nutritionistRoute');
const parentRoute = require('./routes/parentRoute');
const admissionRoute = require('./routes/admissionRequestRoute');
const nutritionRecordRoute = require('./routes/nutritionRecordRoute');

const app = express();
const PORT = process.env.PORT || 3006;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/member', nutritionistRoute);
app.use('/api/parent', parentRoute);
app.use('/api/admission', admissionRoute);
app.use('/api/nutrition', nutritionRecordRoute);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
    console.log(`API URL: http://localhost:${PORT}/api/member`);
    console.log(`API URL : http://localhost:${PORT}/api/parent`);
    console.log(`API URL : http://localhost:${PORT}/api/admission`);
    console.log(`API URL : http://localhost:${PORT}/api/nutrition`);
});