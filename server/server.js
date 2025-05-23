const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const surveyQuestions = [
  { id: "smoking", question: "Do you currently smoke?", category: "Lifestyle" },
  { id: "alcohol", question: "Do you consume alcohol regularly?", category: "Lifestyle" },
  { id: "exercise", question: "Do you exercise at least 3 times a week?", category: "Lifestyle" },
  { id: "diet", question: "Is your diet high in processed or fast foods?", category: "Lifestyle" },
  { id: "sleep", question: "Do you sleep fewer than 6 hours per night?", category: "Lifestyle" },
  { id: "weight", question: "Is your BMI over 30 (obese)?", category: "Measurements" },
  { id: "bp", question: "Have you ever had high blood pressure?", category: "Medical History" },
  { id: "cholesterol", question: "Have you ever had high cholesterol?", category: "Medical History" },
  { id: "diabetes", question: "Have you been diagnosed with diabetes or prediabetes?", category: "Medical History" },
  { id: "asthma", question: "Have you been diagnosed with asthma or COPD?", category: "Medical History" },
  { id: "heart_disease", question: "Have you been diagnosed with heart disease?", category: "Medical History" },
  { id: "stroke", question: "Have you had a stroke or TIA?", category: "Medical History" },
  { id: "cancer_history", question: "Have you ever been diagnosed with cancer?", category: "Medical History" },
  { id: "family_diabetes", question: "Does a close family member have diabetes?", category: "Family History" },
  { id: "family_heart", question: "Does a close family member have heart disease?", category: "Family History" },
  { id: "family_cancer", question: "Does a close family member have cancer?", category: "Family History" },
  { id: "family_stroke", question: "Family history of stroke or aneurysm?", category: "Family History" },
  { id: "prostate", question: "Do you have a prostate?", category: "Sex-Specific" },
  { id: "breast_check", question: "Do you regularly check your breasts or have mammograms?", category: "Sex-Specific" },
  { id: "skin_changes", question: "Have you noticed new or changing moles or spots?", category: "Symptoms" },
  { id: "fatigue", question: "Do you often feel chronically tired or fatigued?", category: "Symptoms" },
  { id: "pain", question: "Do you regularly experience joint or muscle pain?", category: "Symptoms" },
  { id: "urination", question: "Do you have frequent or painful urination?", category: "Symptoms" },
  { id: "vision", question: "Have you experienced unexplained vision changes?", category: "Symptoms" },
  { id: "hearing", question: "Have you experienced hearing loss or ringing?", category: "Symptoms" },
  { id: "meds_bp", question: "Are you taking medication for blood pressure?", category: "Medications" },
  { id: "meds_diabetes", question: "Are you taking medication for diabetes?", category: "Medications" },
  { id: "meds_cholesterol", question: "Are you on statins or other cholesterol meds?", category: "Medications" },
  { id: "lab_bp", question: "Was your last BP reading above 140/90?", category: "Test Results" },
  { id: "lab_chol", question: "Was your last cholesterol test abnormal?", category: "Test Results" },
  { id: "lab_hba1c", question: "Was your last HbA1c > 6.0?", category: "Test Results" }
];

app.get('/api/ping', (req, res) => {
  res.send('Backend is working!');
});

app.get('/api/survey', (req, res) => {
  res.json(surveyQuestions);
});

app.post('/api/risk', (req, res) => {
  const answers = req.body;
  let riskScores = {};
  let highCount = 0;

  Object.entries(answers).forEach(([key, value]) => {
    if (value === true) {
      riskScores[key] = 'Yes';
      highCount++;
    }
  });

  const overall = highCount > 10 ? 'High' : highCount > 5 ? 'Medium' : 'Low';
  res.json({ riskScores, overallRisk: overall });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
