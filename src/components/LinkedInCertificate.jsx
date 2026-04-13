import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import CertificateForm from "./CertificateForm";
import { generateCertificateId, formatCertificateDate, exportToPDF, logger } from "@/lib/utils";
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
      placeholder: "e.g., John",
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "e.g., Doe",
    },
    {
      name: "completionDate",
      label: "Completion Date",
      type: "date",
      placeholder: "When did you complete the course?",
    },
    {
      name: "courseLength",
      label: "Course Length",
      type: "text",
      placeholder: "e.g., 1h 30m or 90 minutes",
    },
    {
      name: "courseName",
      label: "Course Name",
      type: "text",
      placeholder: "e.g., Python Essential Training",
    },
    {
      name: "courseCompleteTime",
      label: "Course Complete Time",
      type: "text",
      placeholder: "e.g., 06:39AM (when you finished)",
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
    setIsGenerating(true);
    exportToPDF("certificate", `linkedin-certificate-${certificate.certId}.pdf`, {
      html2canvas: { scale: 2 },
    })
      .catch((error) => {
        logger.error("PDF generation failed:", error);
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };

  return (
    <>
      <SEO {...seo} />
      <div className="min-h-screen p-6 bg-gray-100">
      <Link
        to="/"
        className="fixed top-6 left-6 text-blue-600 hover:text-blue-400 transition duration-300"
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
              <div className="absolute inset-0 bg-white/80" />
              <div className="relative h-full p-12 lg:p-16 flex flex-col justify-between">
                <div className="text-center">
                  <img
                    src="/linkedin-learning.png"
                    alt="LinkedIn Learning"
                    className="mx-auto h-14 mb-4"
                  />
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500 mb-2">
                    LinkedIn Learning
                  </p>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight max-w-4xl mx-auto">
                    {certificate.courseName}
                  </h1>
                  <p className="mt-4 text-sm uppercase tracking-[0.4em] text-slate-500">
                    Professional Certificate
                  </p>
                </div>

                <div className="mt-14 text-center">
                  <p className="text-lg text-slate-600 mb-2">
                    Learning Path completed by
                  </p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 leading-tight">
                    {certificate.firstName} {certificate.lastName}
                  </p>
                  <p className="text-base md:text-lg text-slate-600">
                    {formatCertificateDate(certificate.completionDate)} at {certificate.courseCompleteTime} UTC • {certificate.courseLength}
                  </p>
                </div>

                <div className="mt-12 text-center">
                  <p className="uppercase tracking-[0.4em] text-xs text-slate-500 mb-4">
                    Top skills covered
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {certificate.skillCovered
                      .split(",")
                      .map((skill) => skill.trim())
                      .filter(Boolean)
                      .slice(0, 5)
                      .map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex min-w-[11rem] items-center justify-center rounded-full border border-slate-300 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="mt-auto pt-10 border-t border-slate-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8">
                    <div className="text-center md:text-left">
                      <p className="text-2xl font-semibold text-slate-900 font-serif">Dan Bolata</p>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-500 mt-1">
                        Head of Content Strategy, Learning
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-3 md:items-end">
                      <img src="/linkedin_stamp.png" alt="Learning Path Completion badge" className="h-14 w-auto" />
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Learning Path Completion
                      </span>
                    </div>
                  </div>
                  <p className="mt-6 text-center text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">
                    Certificate ID: {certificate.certId}
                  </p>
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
