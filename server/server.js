const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simple test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is working!' });
});

// Add your API endpoints here
app.post('/api/risk-assessment', (req, res) => {
  // Placeholder: return a sample risk score
  const userData = req.body;
  console.log('Received data:', userData);
  res.json({ riskScore: 75, category: 'Medium' });
});

// Use the PORT provided by Render or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
