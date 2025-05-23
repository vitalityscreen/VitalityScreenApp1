import { useEffect, useState } from 'react';
function Actions() {
  const [actions, setActions] = useState([]);
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/api/actions')
      .then(res => res.json())
      .then(data => setActions(data));
  }, []);
  return (
    <div>
      <h2>Today's Actions</h2>
      <ul>{actions.map((action, i) => <li key={i}>{action}</li>)}</ul>
    </div>
  );
}
export default Actions;