const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simple route for testing
app.get('/', (req, res) => {
  res.send('VitalityScreen backend is running!');
});

// Example API endpoint
app.post('/api/submit-survey', (req, res) => {
  const data = req.body;
  console.log('Received survey data:', data);
  // Simulate processing and response
  res.json({ success: true, message: 'Survey received', riskScore: 42 });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
