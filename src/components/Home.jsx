import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 animate-gradient">
      <div className="glass-card p-8 rounded-2xl max-w-md w-full mx-auto bg-white/5 backdrop-blur-lg shadow-lg border border-white/10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Certificate Generator
          </h1>
          <p className="text-gray-300 text-lg">
            Create professional certificates in seconds
          </p>
        </div>

        <div className="space-y-6">
          <Link to="/udemy" className="block group relative">
            <div className="glass-card p-6 rounded-xl group-hover:bg-gradient-to-r from-orange-500/20 to-red-500/20 transition duration-300 border border-white/10 shadow-md">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Udemy Certificate
                  </h2>
                  <p className="text-gray-400">
                    Generate Udemy-style certificates
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/linkedin" className="block group relative">
            <div className="glass-card p-6 rounded-xl group-hover:bg-gradient-to-r from-blue-500/20 to-cyan-500/20 transition duration-300 border border-white/10 shadow-md">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    LinkedIn Certificate
                  </h2>
                  <p className="text-gray-400">
                    Generate LinkedIn Learning certificates
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-400">
            Choose a platform to generate your certificate
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
