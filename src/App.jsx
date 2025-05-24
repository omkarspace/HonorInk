import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';

const Home = lazy(() => import('./components/Home'));
const UdemyCertificate = lazy(() => import('./components/UdemyCertificate'));
const LinkedInCertificate = lazy(() => import('./components/LinkedInCertificate'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Navbar />
        <Suspense fallback={<div className="text-center text-white mt-8">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/udemy" element={<UdemyCertificate />} />
            <Route path="/linkedin" element={<LinkedInCertificate />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;