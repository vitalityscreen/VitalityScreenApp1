import React, { useState } from 'react';

const surveyQuestions = [
  { id: 1, question: 'Do you have a family history of diabetes?' },
  { id: 2, question: 'Do you smoke or have you smoked in the past?' },
  { id: 3, question: 'Do you regularly consume alcohol?' },
  { id: 4, question: 'Do you exercise at least 3 times per week?' },
  { id: 5, question: 'Do you have high blood pressure?' },
  { id: 6, question: 'Do you have a BMI over 30 (obese)?' },
  { id: 7, question: 'Have you had elevated cholesterol levels?' },
  { id: 8, question: 'Have you been diagnosed with fatty liver disease?' },
  { id: 9, question: 'Do you snore or have you been diagnosed with sleep apnea?' },
  { id: 10, question: 'Do you frequently experience joint pain or stiffness?' },
  { id: 11, question: 'Do you experience persistent sadness or depression?' },
  { id: 12, question: 'Do you have frequent anxiety or panic attacks?' },
  { id: 13, question: 'Do you have a diagnosed thyroid disorder?' },
  { id: 14, question: 'Do you have frequent headaches or migraines?' },
  { id: 15, question: 'Do you have difficulty remembering things?' },
  { id: 16, question: 'Have you had any cancer screenings in the last 12 months?' },
  { id: 17, question: 'Do you have regular bowel movements?' },
  { id: 18, question: 'Have you had unexplained weight loss or gain recently?' },
  { id: 19, question: 'Do you take any long-term prescription medications?' },
  { id: 20, question: 'Have you ever been diagnosed with asthma or COPD?' },
  { id: 21, question: 'Have you had any seizures or been diagnosed with epilepsy?' },
  { id: 22, question: 'Do you have autoimmune conditions like rheumatoid arthritis or MS?' },
  { id: 23, question: 'Do you often feel tired even after a full night’s sleep?' },
  { id: 24, question: 'Do you avoid fruits and vegetables in your diet?' },
  { id: 25, question: 'Have you ever had a stroke or TIA (mini-stroke)?' },
  { id: 26, question: 'Do you have breast lumps or abnormal mammograms (if female)?' },
  { id: 27, question: 'Do you have frequent urination or thirst?' },
  { id: 28, question: 'Do you have skin moles that have changed shape or color?' },
  { id: 29, question: 'Do you have blood in your stool or persistent abdominal pain?' },
  { id: 30, question: 'Have you ever been diagnosed with gout or uric acid buildup?' },
];

export default function SurveyPage() {
  const [answers, setAnswers] = useState({});

  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    const res = await fetch('/api/submit-survey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    });
    const data = await res.json();
    alert('Survey submitted! Check dashboard for results.');
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Chronic Disease Risk Survey</h2>
      {surveyQuestions.map(q => (
        <div key={q.id} className="mb-4">
          <label className="block mb-1">{q.question}</label>
          <select
            onChange={e => handleChange(q.id, e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unsure">Unsure</option>
          </select>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Submit
      </button>
    </div>
  );
}
