import { useState, useEffect } from 'react';
function Survey() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/api/survey')
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = () => {
    fetch(import.meta.env.VITE_API_URL + '/api/risk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers)
    })
    .then(res => res.json())
    .then(data => alert(`Your risk level is: ${data.risk}`));
  };

  return (
    <div>
      <h2>Survey</h2>
      {questions.map(q => (
        <div key={q.id}>
          <label>{q.question}</label>
          <input type="checkbox" onChange={e => handleChange(q.id, e.target.checked)} />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
export default Survey;