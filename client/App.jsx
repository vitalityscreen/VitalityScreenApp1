import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Survey from './components/Survey';
import Dashboard from './components/Dashboard';
import Actions from './components/Actions';
import Login from './components/Login';
import TestResults from './components/TestResults';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/actions" element={<Actions />} />
        <Route path="/results" element={<TestResults />} />
      </Routes>
    </Router>
  );
}
export default App;