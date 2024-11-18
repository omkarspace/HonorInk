import { useState } from 'react';
import { Link } from 'react-router-dom';
import CertificateForm from './CertificateForm';
import html2pdf from 'html2pdf.js';

const UdemyCertificate = () => {
  const [certificate, setCertificate] = useState(null);

  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'Enter your first name' },
    { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Enter your last name' },
    { name: 'completionDate', label: 'Completion Date', type: 'text', placeholder: 'e.g., January 25, 2024' },
    { name: 'courseLength', label: 'Course Length (hours)', type: 'number', placeholder: 'e.g., 12' },
    { name: 'courseName', label: 'Course Name', type: 'textarea', placeholder: 'Enter the course name' },
    { name: 'instructor', label: 'Instructor Name', type: 'text', placeholder: 'Enter instructor name' }
  ];

  const generateCertificateId = () => {
    return 'UC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleSubmit = (data) => {
    const certId = generateCertificateId();
    setCertificate({ ...data, certId });
  };

  const downloadPDF = () => {
    const element = document.getElementById('certificate');
    
    const opt = {
      margin: 0,
      filename: `udemy-certificate-${certificate.certId}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
        scale: 4,
        useCORS: true,
        letterRendering: true,
        windowWidth: 1920,
        dpi: 300,
        logging: false,
        removeContainer: true
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'landscape',
        compress: true,
        precision: 16,
        putOnlyUsedFonts: true
      },
      pagebreak: { mode: 'avoid-all' }
    };

    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.disabled = true;
    downloadBtn.innerText = 'Generating PDF...';

    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        downloadBtn.disabled = false;
        downloadBtn.innerText = 'Download Certificate';
      });
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
          <CertificateForm onSubmit={handleSubmit} fields={fields} platform="Udemy" />
        ) : (
          <div className="space-y-6">
            <div id="certificate" className="certificate-container bg-white w-[1056px] h-[748px] mx-auto">
              <div className="p-16 h-full flex flex-col">
                <div className="flex justify-between items-start mb-12">
                  <img src="/udemy-logo.png" alt="Udemy" className="h-14 object-contain" />
                  <div className="text-right text-sm text-gray-600">
                    <div className="font-medium">Certificate no: {certificate.certId}</div>
                    <div>Certificate url: ude.my/{certificate.certId}</div>
                  </div>
                </div>
                
                <div className="text-center flex-grow flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-800 mb-6 tracking-wide">
                    CERTIFICATE OF COMPLETION
                  </h3>
                  <h1 className="text-5xl font-bold text-gray-900 mb-8 leading-tight max-w-4xl mx-auto">
                    {certificate.courseName}
                  </h1>
                  <p className="text-2xl text-gray-700 mb-12">
                    Instructor: {certificate.instructor}
                  </p>
                  
                  <div className="mt-auto">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                      {certificate.firstName} {certificate.lastName}
                    </h2>
                    <p className="text-xl text-gray-700 mb-3">
                      Completed on {certificate.completionDate}
                    </p>
                    <p className="text-xl text-gray-700">
                      {certificate.courseLength} total hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              id="downloadBtn"
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

export default UdemyCertificate;