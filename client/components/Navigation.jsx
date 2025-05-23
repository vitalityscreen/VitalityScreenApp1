import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Login</Link></li>
        <li><Link to="/survey">Survey</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/actions">Actions</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
