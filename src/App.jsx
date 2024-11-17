import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UdemyCertificate from './components/UdemyCertificate';
import LinkedInCertificate from './components/LinkedInCertificate';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/udemy" element={<UdemyCertificate />} />
          <Route path="/linkedin" element={<LinkedInCertificate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;