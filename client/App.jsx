import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Survey from './components/Survey';
import Dashboard from './components/Dashboard';
import Actions from './components/Actions';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/actions" element={<Actions />} />
      </Routes>
    </Router>
  );
}

export default App;
