const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001; // ✅ Use environment-assigned port, never a hardcoded URL

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// Example route
app.post('/api/risk-assessment', (req, res) => {
  const userData = req.body;
  res.json({
    riskScore: 42,
    category: 'Medium',
    received: userData
  });
});

// ✅ Start the server on the correct port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
