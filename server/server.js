const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Define the disease map with 30 diseases
const diseaseMap = [
  "Type 2 Diabetes", "Hypertension", "Coronary Artery Disease", "Stroke", "Chronic Kidney Disease",
  "COPD", "Asthma", "Alzheimer’s Disease", "Parkinson’s Disease", "Depression",
  "Anxiety", "Osteoarthritis", "Rheumatoid Arthritis", "Osteoporosis", "Fatty Liver Disease",
  "Irritable Bowel Syndrome", "Inflammatory Bowel Disease", "Migraine", "Epilepsy", "Gout",
  "Psoriasis", "Multiple Sclerosis", "Thyroid Disease", "Obesity", "Sleep Apnea",
  // 5 Additional Common Cancers
  "Breast Cancer", "Prostate Cancer", "Colorectal Cancer", "Lung Cancer", "Skin Cancer"
];

// Basic endpoint to confirm server is running
app.get('/api/ping', (req, res) => {
  res.send({ message: 'Server is alive' });
});

// Endpoint to get the list of diseases
app.get('/api/diseases', (req, res) => {
  res.send(diseaseMap);
});

// Endpoint to receive survey answers and return risk results
app.post('/api/submit-survey', (req, res) => {
  const answers = req.body;

  // Simulate risk scoring
  const results = diseaseMap.map(disease => {
    const random = Math.random();
    let risk = 'Low';
    if (random > 0.66) risk = 'High';
    else if (random > 0.33) risk = 'Medium';

    return {
      disease,
      riskLevel: risk,
      recommendedTests: [`Test for ${disease}`],
      actionPlan: [`Action plan for ${disease}`]
    };
  });

  // Calculate an overall health score (simple version)
  const score = results.reduce((acc, r) => {
    if (r.riskLevel === 'High') return acc - 2;
    if (r.riskLevel === 'Medium') return acc - 1;
    return acc + 1;
  }, 50);

  res.send({
    overallScore: Math.max(0, Math.min(100, score)),
    results
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
