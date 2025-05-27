import React, { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Temporary call to simulate pulling last submission (or use real session-based fetch later)
    const fetchResults = async () => {
      try {
        const res = await fetch('https://vitalityscreenapp1.onrender.com/api/submit-survey', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });

        if (!res.ok) throw new Error(`Status ${res.status}`);

        const data = await res.json();
        setScore(data.overallScore);
        setResults(data.results);
      } catch (err) {
        setError('Failed to load dashboard results.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-600 text-center">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Health Dashboard</h2>
      <div className="mb-6">
        <p className="text-lg font-medium">Overall Health Score:</p>
        <p className="text-3xl text-green-600 font-bold">{score} / 100</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Risk by Condition:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((r, i) => (
            <div key={i} className="border rounded p-4 shadow">
              <h4 className="font-semibold">{r.disease}</h4>
              <p className="text-sm"><strong>Risk:</strong> {r.riskLevel}</p>
              <p className="text-sm"><strong>Recommended Test:</strong> {r.recommendedTests?.[0]}</p>
              <p className="text-sm"><strong>Action:</strong> {r.actionPlan?.[0]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
