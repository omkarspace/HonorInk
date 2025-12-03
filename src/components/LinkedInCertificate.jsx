import { useState } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { Loader } from "lucide-react";
=======
>>>>>>> e501412cee8a8d731fef59835af1ee644c96d280
import CertificateForm from "./CertificateForm";
import html2pdf from "html2pdf.js";

const LinkedInCertificate = () => {
  const [certificate, setCertificate] = useState(null);
<<<<<<< HEAD
  const [isPreview, setIsPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
=======
>>>>>>> e501412cee8a8d731fef59835af1ee644c96d280

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

  const generateCertificateId = () => {
    return "LI-" + Math.random().toString(36).substr(2, 12).toUpperCase();
  };

  const handleSubmit = (data) => {
    const certId = generateCertificateId();
    setCertificate({ ...data, certId });
<<<<<<< HEAD
    setIsPreview(true);
  };

  const handleEdit = () => {
    setIsPreview(false);
  };

  const resetForm = () => {
    setCertificate(null);
    setIsPreview(false);
=======
>>>>>>> e501412cee8a8d731fef59835af1ee644c96d280
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

<<<<<<< HEAD
    setIsGenerating(true);
=======
    const downloadBtn = document.getElementById("downloadBtn");
    downloadBtn.disabled = true;
    downloadBtn.innerText = "Generating PDF...";
>>>>>>> e501412cee8a8d731fef59835af1ee644c96d280

    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
<<<<<<< HEAD
        setIsGenerating(false);
      })
      .catch((error) => {
        console.error("PDF generation failed:", error);
        setIsGenerating(false);
=======
        downloadBtn.disabled = false;
        downloadBtn.innerText = "Download Certificate";
>>>>>>> e501412cee8a8d731fef59835af1ee644c96d280
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
<<<<<<< HEAD
          <div className="space-y-8">
            <div
              id="certificate"
              className="certificate-container bg-white w-full max-w-[1056px] aspect-w-16 aspect-h-9 mx-auto rounded-lg shadow-lg overflow-hidden"
=======
          <div className="space-y-6">
            <div
              id="certificate"
              className="certificate-container bg-white w-[1056px] h-[748px] mx-auto rounded-lg shadow-lg overflow-hidden"
>>>>>>> e501412cee8a8d731fef59835af1ee644c96d280
              style={{
                backgroundImage: 'url("/linkedin_background.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
<<<<<<< HEAD
              <div className="inner-white-space bg-white w-full h-full flex items-center justify-center p-6 sm:p-8 lg:p-12">
                <div className="text-center max-w-4xl">
                  <img
                    src="/linkedin-learning.png"
                    alt="LinkedIn Learning"
                    className="h-10 sm:h-12 lg:h-16 mb-4 sm:mb-6 mx-auto"
                  />
                  <h1 className="certificate-name text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6 leading-tight">
                    {certificate.courseName}
                  </h1>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-light text-gray-600 mb-4 sm:mb-6 lg:mb-8 leading-relaxed px-4 sm:px-6">
=======
              <div className="inner-white-space bg-white w-full h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <img
                    src="/linkedin-learning.png"
                    alt="LinkedIn Learning"
                    className="h-12 mb-6 mx-auto"
                  />
                  <h1 className="text-5xl font-serif font-bold text-gray-800 mb-4">
                    {certificate.courseName}
                  </h1>
                  <h2 className="text-xl font-light text-gray-600 mb-6">
>>>>>>> e501412cee8a8d731fef59835af1ee644c96d280
                    This certifies that{" "}
                    <span className="font-semibold">
                      {certificate.firstName} {certificate.lastName}
                    </span>{" "}
                    has successfully completed the course.
                  </h2>
<<<<<<< HEAD
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 lg:mb-8">
                    <p className="text-gray-500 text-base sm:text-lg lg:text-xl">
                      Completed on:{" "}
                      <span className="text-gray-700 font-medium">
                        {formatDate(certificate.completionDate)}
                      </span>{" "}
                      at {certificate.courseCompleteTime} UTC
                    </p>
                    <p className="text-gray-500 text-base sm:text-lg lg:text-xl">
                      Duration:{" "}
                      <span className="text-gray-700 font-medium">
                        {certificate.courseLength}
                      </span>
                    </p>
                  </div>
                  <p className="text-gray-600 text-base sm:text-lg lg:text-xl mb-3 sm:mb-4 lg:mb-6 font-medium">
                    Skills Covered: {certificate.skillCovered}
                  </p>
                  <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
=======
                  <p className="text-gray-500 text-lg mb-4">
                    Completed on:{" "}
                    <span className="text-gray-700 font-medium">
                      {formatDate(certificate.completionDate)}
                    </span>{" "}
                    at {certificate.courseCompleteTime} UTC
                  </p>
                  <p className="text-gray-500 text-lg mb-8">
                    Duration:{" "}
                    <span className="text-gray-700 font-medium">
                      {certificate.courseLength}
                    </span>
                  </p>
                  <p className="text-gray-600 mb-4">
                    <strong>Skills Covered:</strong> {certificate.skillCovered}
                  </p>
                  <p className="text-gray-400 text-sm">
>>>>>>> e501412cee8a8d731fef59835af1ee644c96d280
                    Certificate ID: {certificate.certId}
                  </p>
                </div>
              </div>
            </div>

<<<<<<< HEAD
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
=======
            <button
              id="downloadBtn"
              onClick={downloadPDF}
              className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 mx-auto block"
            >
              Download Certificate
            </button>
>>>>>>> e501412cee8a8d731fef59835af1ee644c96d280
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInCertificate;
