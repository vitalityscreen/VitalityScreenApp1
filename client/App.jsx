// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Survey from './components/Survey';
import Results from './components/Results';
import Header from './components/Header';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Survey />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
