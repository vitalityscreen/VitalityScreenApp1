const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/ping', (req, res) => {
  res.send('Backend is working!');
});

app.get('/api/survey', (req, res) => {
  res.json([
    { id: 'smoking', question: 'Do you smoke?' },
    { id: 'exercise', question: 'Do you exercise regularly?' },
    { id: 'diet', question: 'Is your diet high in processed foods?' }
  ]);
});

app.post('/api/risk', (req, res) => {
  const answers = req.body;
  const riskScore = Object.values(answers).reduce((acc, val) => acc + (val ? 1 : 0), 0);
  const risk = riskScore > 2 ? 'High' : riskScore > 1 ? 'Medium' : 'Low';
  res.json({ score: riskScore, risk });
});

app.get('/api/actions', (req, res) => {
  res.json([
    "Walk 30 minutes today",
    "Avoid sugary snacks",
    "Drink 2L of water"
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});