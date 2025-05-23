// server/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Handle all other undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Listen on the port provided by Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
