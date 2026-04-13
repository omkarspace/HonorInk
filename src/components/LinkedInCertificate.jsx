import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import CertificateForm from "./CertificateForm";
import html2pdf from "html2pdf.js";
import { generateCertificateId } from "@/lib/utils";
import { CERTIFICATE_ID_PREFIX } from "@/lib/constants";
import SEO, { seoConfig } from "./SEO";

const LinkedInCertificate = () => {
  const seo = seoConfig.linkedin;
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
      label: "Course Length",
      type: "text",
      placeholder: "e.g., 1 hour 30 minutes",
    },
    {
      name: "courseName",
      label: "Course Name",
      type: "text",
      placeholder: "Enter the course name",
    },
    {
      name: "courseCompleteTime",
      label: "Course Complete Time",
      type: "text",
      placeholder: "e.g., 06:39AM ",
    },
    {
      name: "skillCovered",
      label: "Skill Covered in Course",
      type: "text",
      placeholder: "e.g., Python, React.js",
    },
  ];

  const handleSubmit = (data) => {
    const certId = generateCertificateId(CERTIFICATE_ID_PREFIX.LINKEDIN);
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

    const opt = {
      margin: 0,
      filename: `linkedin-certificate-${certificate.certId}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 4,
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
    <>
      <SEO {...seo} />
      <div className="min-h-screen p-6 bg-gray-100">
      <Link
        to="/"
        className="fixed top-6 left-6 text-blue-600 hover:text-blue-400 transition duration-300"
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
            platform="LinkedIn"
          />
        ) : (
          <div className="space-y-8">
            <div
              id="certificate"
              className="certificate-container bg-white w-full max-w-[1123px] mx-auto shadow-2xl overflow-hidden relative"
              style={{ minHeight: "794px", aspectRatio: "1.414" }}
            >
              <div className="absolute inset-0" style={{ backgroundImage: 'url("/linkedin_background.png")', backgroundSize: "cover", backgroundPosition: "center" }} />
              
              <div className="relative h-full p-12 lg:p-16 flex flex-col" style={{ background: "rgba(255,255,255,0.95)" }}>
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <img
                    src="/linkedin_sign.png"
                    alt="LinkedIn"
                    className="h-12 w-auto"
                  />
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#0A66C2]">Certificate ID</p>
                    <p className="text-lg text-gray-800">{certificate.certId}</p>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                  <img
                    src="/linkedin-learning.png"
                    alt="LinkedIn Learning"
                    className="h-16 mb-8 mx-auto"
                  />
                  
                  <p className="text-lg tracking-[0.2em] text-gray-500 uppercase mb-4">
                    Certificate of Completion
                  </p>
                  
                  <h1 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] leading-tight max-w-4xl mb-8">
                    {certificate.courseName}
                  </h1>
                  
                  <p className="text-xl text-gray-600 mb-2">
                    This certifies that
                  </p>
                  <h2 className="text-4xl lg:text-5xl font-serif text-[#1A1A1A] mb-2">
                    {certificate.firstName} {certificate.lastName}
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    has successfully completed the course
                  </p>
                  
                  <div className="grid grid-cols-3 gap-8 mt-8 text-center">
                    <div>
                      <p className="text-sm text-gray-500">Completed On</p>
                      <p className="text-lg font-bold text-gray-800">{formatDate(certificate.completionDate)}</p>
                      <p className="text-sm text-gray-500">{certificate.courseCompleteTime} UTC</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="text-lg font-bold text-gray-800">{certificate.courseLength}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Skills Covered</p>
                      <p className="text-lg font-bold text-gray-800">{certificate.skillCovered}</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-8 border-t border-gray-200">
                  <div className="flex justify-center items-center gap-2">
                    <img src="/linkedin_stamp.png" alt="LinkedIn" className="h-8 w-8" />
                    <span className="text-gray-500">Learn on LinkedIn</span>
                  </div>
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
    </>
  );
};

export default LinkedInCertificate;
