const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000; // ✅ Only a numeric port here

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('✅ VitalityScreen backend is running!');
});

app.post('/api/submit-survey', (req, res) => {
  const data = req.body;
  console.log('Received survey data:', data);
  res.json({ success: true, message: 'Survey received', riskScore: 42 });
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
