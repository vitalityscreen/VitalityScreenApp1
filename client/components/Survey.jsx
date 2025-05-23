// server/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const surveyQuestions = [ /* full list of 30+ questions like smoking, bp, weight, etc. */ ];

app.get('/api/survey', (req, res) => {
  res.json(surveyQuestions);
});

const diseaseMap = [
  {
    disease: "Heart Disease",
    triggers: ["smoking", "bp", "cholesterol", "weight", "family_heart"],
    tests: ["ECG every 6 months", "Cholesterol annually"],
    actions: ["Quit smoking", "Exercise 30 min/day", "Low-salt diet"]
  },
  {
    disease: "Type 2 Diabetes",
    triggers: ["weight", "diet", "sleep", "family_diabetes", "lab_hba1c"],
    tests: ["HbA1c every 6 months"],
    actions: ["Reduce sugar", "Walk daily", "Track carbs"]
  }
  // Add more diseases here
];

app.post('/api/risk', (req, res) => {
  const answers = req.body;
  let overallScore = 100;
  let results = [];

  for (const item of diseaseMap) {
    let matchCount = 0;
    for (const trigger of item.triggers) {
      if (answers[trigger]) matchCount++;
    }

    const riskLevel = matchCount >= 3 ? "High" : matchCount === 2 ? "Medium" : "Low";
    if (riskLevel === "High") overallScore -= 15;
    else if (riskLevel === "Medium") overallScore -= 8;

    results.push({
      disease: item.disease,
      riskLevel,
      recommendedTests: item.tests,
      actions: item.actions
    });
  }

  const overallRisk = overallScore > 80 ? "Low" : overallScore > 60 ? "Medium" : "High";

  res.json({
    overallScore,
    overallRisk,
    results
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
