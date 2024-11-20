import { useState } from "react";
import { Link } from "react-router-dom";
import CertificateForm from "./CertificateForm";
import html2pdf from "html2pdf.js";

const LinkedInCertificate = () => {
  const [certificate, setCertificate] = useState(null);

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

    const downloadBtn = document.getElementById("downloadBtn");
    downloadBtn.disabled = true;
    downloadBtn.innerText = "Generating PDF...";

    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        downloadBtn.disabled = false;
        downloadBtn.innerText = "Download Certificate";
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
          <div className="space-y-6">
            <div
              id="certificate"
              className="certificate-container bg-white w-[1056px] h-[748px] mx-auto rounded-lg shadow-lg overflow-hidden"
              style={{
                backgroundImage: 'url("/linkedin_background.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
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
                    This certifies that{" "}
                    <span className="font-semibold">
                      {certificate.firstName} {certificate.lastName}
                    </span>{" "}
                    has successfully completed the course.
                  </h2>
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
                    Certificate ID: {certificate.certId}
                  </p>
                </div>
              </div>
            </div>

            <button
              id="downloadBtn"
              onClick={downloadPDF}
              className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 mx-auto block"
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
