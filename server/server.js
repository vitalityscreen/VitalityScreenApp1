
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const diseaseMap = [
  {
    "disease": "Heart Disease",
    "triggers": [
      "smoking",
      "bp",
      "cholesterol",
      "weight",
      "family_heart"
    ],
    "tests": [
      "ECG every 6 months",
      "Cholesterol panel annually"
    ],
    "actions": [
      "30 min cardio daily",
      "Low-salt diet",
      "Quit smoking"
    ]
  },
  {
    "disease": "Type 2 Diabetes",
    "triggers": [
      "weight",
      "diet",
      "sleep",
      "family_diabetes",
      "lab_hba1c"
    ],
    "tests": [
      "HbA1c every 6 months",
      "Fasting glucose yearly"
    ],
    "actions": [
      "Limit sugar",
      "Track carbs",
      "Walk daily"
    ]
  },
  {
    "disease": "Stroke",
    "triggers": [
      "bp",
      "cholesterol",
      "smoking",
      "family_stroke"
    ],
    "tests": [
      "Blood pressure monthly",
      "Cholesterol panel yearly"
    ],
    "actions": [
      "Manage BP",
      "Exercise",
      "Avoid tobacco"
    ]
  },
  {
    "disease": "Breast Cancer",
    "triggers": [
      "family_cancer",
      "breast_check",
      "cancer_history"
    ],
    "tests": [
      "Mammogram every 2 years"
    ],
    "actions": [
      "Self-exam monthly",
      "Routine checkups"
    ]
  },
  {
    "disease": "Prostate Cancer",
    "triggers": [
      "prostate",
      "family_cancer",
      "cancer_history"
    ],
    "tests": [
      "PSA test every 2 years"
    ],
    "actions": [
      "Discuss screening with doctor",
      "Maintain healthy weight"
    ]
  }
];

app.get('/api/ping', (req, res) => {
  res.send('Backend is working!');
});

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
