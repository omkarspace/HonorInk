import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import CertificateForm from "./CertificateForm";
import html2pdf from "html2pdf.js";

const CourseraCertificate = () => {
  const [certificate, setCertificate] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const fields = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
    },
    {
      name: "completionDate",
      label: "Completion Date",
      type: "date",
      placeholder: "e.g., January 25, 2024",
    },
    {
      name: "courseLength",
      label: "Course Length (weeks)",
      type: "number",
      placeholder: "e.g., 4",
    },
    {
      name: "courseName",
      label: "Course Name",
      type: "textarea",
      placeholder: "Enter the course name",
    },
    {
      name: "instructor",
      label: "Instructor Name",
      type: "text",
      placeholder: "Enter instructor name",
    },
  ];

  const generateCertificateId = () => {
    return "CO-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleSubmit = (data) => {
    const certId = generateCertificateId();
    setCertificate({ ...data, certId });
    setIsPreview(true);
  };

  const handleEdit = () => {
    setIsPreview(false);
  };

  const resetForm = () => {
    setCertificate(null);
    setIsPreview(false);
  };

  const downloadPDF = () => {
    const element = document.getElementById("certificate");
    if (!element) {
      console.error("Certificate element not found!");
      return;
    }

    const opt = {
      margin: 0,
      filename: `coursera-certificate-${certificate.certId}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        windowWidth: 1920,
        dpi: 300,
        logging: false,
        removeContainer: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "landscape",
        compress: true,
        precision: 16,
        putOnlyUsedFonts: true,
      },
      pagebreak: { mode: "avoid-all" },
    };

    setIsGenerating(true);

    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        setIsGenerating(false);
      })
      .catch((error) => {
        console.error("PDF generation failed:", error);
        setIsGenerating(false);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return formatter.format(date);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <Link
        to="/"
        className="fixed top-6 left-6 text-blue-600 hover:text-blue-800 transition duration-300"
        aria-label="Go back"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </Link>

      <div className="container mx-auto max-w-6xl pt-20">
        {!certificate ? (
          <CertificateForm
            onSubmit={handleSubmit}
            fields={fields}
            platform="Coursera"
          />
        ) : (
          <div className="space-y-8">
            <div
              id="certificate"
              className="bg-white w-full max-w-[1056px] aspect-w-16 aspect-h-9 mx-auto shadow-lg overflow-hidden border-2 border-blue-200"
            >
              <div className="relative h-full bg-gradient-to-br from-blue-600 to-indigo-800">
                {/* Header */}
                <div className="flex justify-between items-center p-8 text-white">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xl">C</span>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">Coursera</h1>
                      <p className="text-blue-100">Course Certificate</p>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div>Certificate ID: {certificate.certId}</div>
                    <div>Verification: coursera.org/verify/{certificate.certId}</div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-center items-center text-center p-12 text-white">
                  <div className="mb-8">
                    <h2 className="text-lg font-light mb-2">This is to certify that</h2>
                    <h1 className="text-5xl font-bold mb-4">
                      {certificate.firstName} {certificate.lastName}
                    </h1>
                    <p className="text-xl font-light mb-6">has successfully completed</p>
                    <h3 className="text-3xl font-semibold mb-4 max-w-2xl">
                      {certificate.courseName}
                    </h3>
                  </div>

                  <div className="flex justify-center space-x-12 text-center">
                    <div>
                      <p className="text-sm text-blue-100 mb-1">Instructor</p>
                      <p className="font-semibold">{certificate.instructor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-100 mb-1">Completion Date</p>
                      <p className="font-semibold">{formatDate(certificate.completionDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-100 mb-1">Course Length</p>
                      <p className="font-semibold">{certificate.courseLength} weeks</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-8 text-center text-blue-100 text-sm">
                  <p>This certificate is awarded for the successful completion of the course requirements.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isPreview && (
                <button
                  onClick={handleEdit}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300 shadow-md"
                >
                  Edit Details
                </button>
              )}
              <button
                onClick={downloadPDF}
                disabled={isGenerating}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 shadow-md flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  "Download Certificate"
                )}
              </button>
              <button
                onClick={resetForm}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
              >
                Create New Certificate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseraCertificate;
