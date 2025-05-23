import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Survey() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/api/survey')
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const handleChange = (id, checked) => {
    setAnswers(prev => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = () => {
    fetch(import.meta.env.VITE_API_URL + '/api/risk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers)
    })
      .then(res => res.json())
      .then(data => {
        navigate('/results', { state: { results: data } });
      });
  };

  const grouped = questions.reduce((acc, q) => {
    acc[q.category] = acc[q.category] || [];
    acc[q.category].push(q);
    return acc;
  }, {});

  return (
    <div>
      <h2>Chronic Disease Risk Survey</h2>
      {Object.entries(grouped).map(([category, group]) => (
        <div key={category} style={{ marginBottom: '20px' }}>
          <h3>{category}</h3>
          {group.map(q => (
            <div key={q.id}>
              <label>
                <input
                  type="checkbox"
                  checked={!!answers[q.id]}
                  onChange={e => handleChange(q.id, e.target.checked)}
                />
                {q.question}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Survey;
