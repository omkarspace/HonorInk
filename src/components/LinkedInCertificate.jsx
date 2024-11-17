import { useState } from 'react';
import { Link } from 'react-router-dom';
import CertificateForm from './CertificateForm';
import html2pdf from 'html2pdf.js';

const LinkedInCertificate = () => {
  const [certificate, setCertificate] = useState(null);

  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'Enter your first name' },
    { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Enter your last name' },
    { name: 'completionDate', label: 'Completion Date', type: 'text', placeholder: 'e.g., January 25, 2024' },
    { name: 'courseLength', label: 'Course Length', type: 'text', placeholder: 'e.g., 1 hour 30 minutes' },
    { name: 'courseName', label: 'Course Name', type: 'text', placeholder: 'Enter the course name' }
  ];

  const generateCertificateId = () => {
    return 'LI-' + Math.random().toString(36).substr(2, 12).toUpperCase();
  };

  const handleSubmit = (data) => {
    const certId = generateCertificateId();
    setCertificate({ ...data, certId });
  };

  const downloadPDF = () => {
    const element = document.getElementById('certificate');
    const opt = {
      margin: 1,
      filename: 'linkedin-certificate.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'px', format: 'a4', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen p-6">
      <Link to="/" className="fixed top-6 left-6 text-white hover:text-blue-400 transition duration-300">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </Link>

      <div className="container mx-auto max-w-6xl pt-20">
        {!certificate ? (
          <CertificateForm onSubmit={handleSubmit} fields={fields} platform="LinkedIn" />
        ) : (
          <div className="space-y-6">
            <div id="certificate" className="certificate-container">
              <div className="border-8 border-gray-200 p-12">
                <div className="flex justify-between items-start mb-12">
                  <img src="/linkedin-learning.png" alt="LinkedIn Learning" className="h-10" />
                  <div className="text-sm text-gray-600">
                    Certificate ID: {certificate.certId}
                  </div>
                </div>
                
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-800 mb-6">Certificate of Completion</h2>
                  <h3 className="text-2xl text-gray-700 mb-10">
                    Congratulations, {certificate.firstName} {certificate.lastName}
                  </h3>
                  <h1 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
                    {certificate.courseName}
                  </h1>
                  <div className="text-xl text-gray-700 space-y-2">
                    <p>Course completed on {certificate.completionDate}</p>
                    <p>{certificate.courseLength}</p>
                  </div>
                </div>
                
                <div className="text-gray-700 mt-12 max-w-2xl mx-auto">
                  <p className="text-center text-lg italic">
                    By continuing to learn, you have expanded your perspective, sharpened your skills, 
                    and made yourself even more in demand.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={downloadPDF}
              className="btn-primary w-full max-w-md mx-auto block"
            >
              Download Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInCertificate;