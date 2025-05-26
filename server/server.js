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

const diseaseMap = [
  {
    disease: "Heart Disease",
    triggers: ["smoking", "bp", "cholesterol", "weight", "family_heart"],
    tests: ["ECG", "Cholesterol panel"],
    actions: ["Quit smoking", "Exercise regularly", "Reduce sodium"]
  },
  {
    disease: "Type 2 Diabetes",
    triggers: ["weight", "diet", "sleep", "family_diabetes", "lab_hba1c"],
    tests: ["HbA1c", "Fasting glucose"],
    actions: ["Limit sugar", "Track carbs", "Increase activity"]
  }
  // ✅ Add 28 more diseases here
];

app.get('/api/survey', (req, res) => {
  res.json(surveyQuestions);
});

app.post('/api/risk', (req, res) => {
  const answers = req.body;
  let overallScore = 100;
  const results = [];

  for (const item of diseaseMap) {
    const matchCount = item.triggers.filter(trigger => answers[trigger]).length;
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
