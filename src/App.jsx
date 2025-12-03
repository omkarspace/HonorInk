import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
<<<<<<< HEAD
import { ThemeProvider } from './lib/theme-provider';
=======
>>>>>>> e501412cee8a8d731fef59835af1ee644c96d280

const Home = lazy(() => import('./components/Home'));
const UdemyCertificate = lazy(() => import('./components/UdemyCertificate'));
const LinkedInCertificate = lazy(() => import('./components/LinkedInCertificate'));
<<<<<<< HEAD
const CourseraCertificate = lazy(() => import('./components/CourseraCertificate'));
=======
>>>>>>> e501412cee8a8d731fef59835af1ee644c96d280
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
<<<<<<< HEAD
    <ThemeProvider defaultTheme="light" storageKey="honorink-theme">
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading HonorInk...</p>
              </div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/udemy" element={<UdemyCertificate />} />
              <Route path="/linkedin" element={<LinkedInCertificate />} />
              <Route path="/coursera" element={<CourseraCertificate />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
=======
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
>>>>>>> e501412cee8a8d731fef59835af1ee644c96d280
