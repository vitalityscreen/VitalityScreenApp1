import { useLocation } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const data = location.state?.results;

  if (!data) return <p>No results to display. Please complete the survey first.</p>;

  return (
    <div>
      <h2>Your Personalized Risk Assessment</h2>
      <p><strong>Overall Health Score:</strong> {data.overallScore}</p>
      <p><strong>Overall Risk Level:</strong> <span className={`risk-${data.overallRisk.toLowerCase()}`}>{data.overallRisk}</span></p>
      <table className="table">
        <thead>
          <tr>
            <th>Disease</th>
            <th>Risk Level</th>
            <th>Recommended Tests</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((item, index) => (
            <tr key={index}>
              <td>{item.disease}</td>
              <td className={`risk-${item.riskLevel.toLowerCase()}`}>{item.riskLevel}</td>
              <td>{item.recommendedTests.join(', ')}</td>
              <td>{item.actions.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
