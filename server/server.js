const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const diseaseMap = [  
  { disease: "Heart Disease", triggers: ["smoking", "bp", "cholesterol", "weight", "family_heart"], tests: ["ECG", "Cholesterol panel"], actions: ["Quit smoking", "Exercise regularly", "Reduce sodium"] },
  { disease: "Type 2 Diabetes", triggers: ["weight", "diet", "sleep", "family_diabetes", "lab_hba1c"], tests: ["HbA1c", "Fasting glucose"], actions: ["Limit sugar", "Track carbs", "Increase activity"] },
  { disease: "Hypertension", triggers: ["bp", "weight", "cholesterol", "family_heart", "meds_bp"], tests: ["Blood pressure check"], actions: ["Lower salt intake", "Exercise", "Take prescribed medication"] },
  { disease: "Chronic Kidney Disease", triggers: ["diabetes", "bp", "pain", "urination"], tests: ["eGFR", "Urine albumin"], actions: ["Control diabetes", "Limit NSAIDs", "Manage BP"] },
  { disease: "Alzheimer's Disease", triggers: ["family_stroke", "vision", "hearing", "fatigue"], tests: ["Cognitive assessment"], actions: ["Stay mentally active", "Manage chronic conditions"] },
  { disease: "COPD", triggers: ["smoking", "asthma", "family_heart"], tests: ["Pulmonary function test"], actions: ["Stop smoking", "Use inhalers as prescribed"] },
  { disease: "Asthma", triggers: ["asthma", "family_heart", "pain"], tests: ["Spirometry"], actions: ["Avoid triggers", "Use controller medication"] },
  { disease: "Arthritis", triggers: ["pain", "weight", "family_stroke"], tests: ["X-ray", "CRP"], actions: ["Exercise", "Anti-inflammatory diet"] },
  { disease: "Osteoporosis", triggers: ["weight", "diet", "pain"], tests: ["DEXA scan"], actions: ["Calcium & Vitamin D", "Weight-bearing exercise"] },
  { disease: "Obesity", triggers: ["diet", "exercise", "sleep"], tests: ["BMI", "Waist circumference"], actions: ["Healthy diet", "Daily physical activity"] },
  { disease: "Liver Disease", triggers: ["alcohol", "weight", "diet"], tests: ["Liver function test"], actions: ["Reduce alcohol", "Low-fat diet"] },
  { disease: "Lung Cancer", triggers: ["smoking", "cancer_history", "family_cancer"], tests: ["Low-dose CT"], actions: ["Quit smoking", "Annual screening"] },
  { disease: "Breast Cancer", triggers: ["breast_check", "family_cancer", "cancer_history"], tests: ["Mammogram"], actions: ["Routine screening", "Breast self-exam"] },
  { disease: "Prostate Cancer", triggers: ["prostate", "family_cancer", "cancer_history"], tests: ["PSA blood test"], actions: ["Discuss screening", "Healthy lifestyle"] },
  { disease: "Colorectal Cancer", triggers: ["diet", "pain", "family_cancer"], tests: ["Colonoscopy"], actions: ["Screen regularly", "High-fiber diet"] },
  { disease: "Pancreatic Cancer", triggers: ["smoking", "family_cancer", "diabetes"], tests: ["CT or MRI"], actions: ["Avoid tobacco", "Healthy diet"] },
  { disease: "Skin Cancer", triggers: ["skin_changes", "cancer_history"], tests: ["Dermatology exam"], actions: ["Use sunscreen", "Annual skin checks"] },
  { disease: "Depression", triggers: ["fatigue", "sleep", "pain"], tests: ["Mental health screening"], actions: ["Therapy", "Exercise", "Social support"] },
  { disease: "Anxiety", triggers: ["fatigue", "sleep", "urination"], tests: ["Psychological eval"], actions: ["Mindfulness", "Counseling"] },
  { disease: "Thyroid Disease", triggers: ["fatigue", "weight", "vision"], tests: ["TSH", "T3/T4"], actions: ["Manage meds", "Endocrinology consult"] },
  { disease: "Cervical Cancer", triggers: ["family_cancer", "cancer_history"], tests: ["Pap smear", "HPV test"], actions: ["Routine screening", "Vaccination"] },
  { disease: "Multiple Sclerosis", triggers: ["vision", "fatigue", "pain"], tests: ["MRI brain/spine"], actions: ["Neurology referral"] },
  { disease: "Parkinson’s Disease", triggers: ["vision", "hearing", "pain"], tests: ["Neurological exam"], actions: ["Physical therapy", "Medication management"] },
  { disease: "Gout", triggers: ["diet", "pain", "urination"], tests: ["Uric acid test"], actions: ["Reduce red meat", "Hydrate"] },
  { disease: "Sleep Apnea", triggers: ["sleep", "weight", "fatigue"], tests: ["Sleep study"], actions: ["CPAP", "Weight loss"] },
  { disease: "GERD", triggers: ["diet", "pain", "sleep"], tests: ["Endoscopy"], actions: ["Avoid trigger foods", "Elevate head while sleeping"] },
  { disease: "Peptic Ulcer", triggers: ["pain", "diet", "alcohol"], tests: ["Upper GI scope"], actions: ["Antacids", "Avoid NSAIDs"] },
  { disease: "Urinary Incontinence", triggers: ["urination", "pain", "weight"], tests: ["Urodynamic testing"], actions: ["Pelvic floor exercises", "Urology referral"] },
  { disease: "Hearing Loss", triggers: ["hearing", "fatigue"], tests: ["Audiogram"], actions: ["Hearing aids", "ENT consult"] },
  { disease: "Macular Degeneration", triggers: ["vision", "family_cancer"], tests: ["Ophthalmology exam"], actions: ["Eye vitamins", "Annual eye exams"] }
];

app.get('/api/diseases', (req, res) => {
  res.json(diseaseMap);
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
