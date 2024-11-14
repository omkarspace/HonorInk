import React, { useState, useRef } from 'react';
import { Download, Share2, Image } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import CertificateForm from './components/CertificateForm';
import Certificate from './components/Certificate';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    courseName: '',
    completionDate: '',
    courseLength: '',
    instructorName: '',
    certificateType: 'linkedin',
    showWatermark: true
  });

  const certificateRef = useRef(null);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      logging: false,
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
    pdf.save('certificate.pdf');
  };

  const downloadImage = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      logging: false,
      useCORS: true
    });

    const link = document.createElement('a');
    link.download = 'certificate.png';
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  const shareCertificate = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      logging: false,
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
    try {
      await navigator.share({
        title: 'My Course Certificate',
        text: `Check out my certificate for completing ${formData.courseName}!`,
        files: [new File([await (await fetch(imgData)).blob()], 'certificate.jpg', { type: 'image/jpeg' })]
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Certificate Generator</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <CertificateForm formData={formData} setFormData={setFormData} />
            
            <div className="mt-6 flex space-x-4">
              <button
                onClick={downloadCertificate}
                className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Download className="h-5 w-5 mr-2" />
                Download PDF
              </button>
              
              <button
                onClick={downloadImage}
                className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Image className="h-5 w-5 mr-2" />
                Download Image
              </button>
              
              <button
                onClick={shareCertificate}
                className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg overflow-hidden">
            <div className="transform scale-[0.6] origin-top" ref={certificateRef}>
              <Certificate {...formData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;