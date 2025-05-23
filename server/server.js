// server/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Basic test route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Fallback for unmatched routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Only listen on a port, NOT a URL!
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
