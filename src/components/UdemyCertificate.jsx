import React, { useState } from "react";
import { Link } from "react-router-dom";
import CertificateForm from "./CertificateForm";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const UdemyCertificate = () => {
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
      label: "Course Length (hours)",
      type: "number",
      placeholder: "e.g., 12",
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
    return "UC-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleSubmit = (data) => {
    const certId = generateCertificateId();
    setCertificate({ ...data, certId });
  };

  const downloadPDF = () => {
    const element = document.getElementById("certificate");
    if (!element) {
      console.error("Certificate element not found!");
      return;
    }

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "pt", [1056, 748]);
      pdf.addImage(imgData, "PNG", 0, 0, 1056, 748);
      pdf.save("Udemy-Certificate.pdf");
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
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-gray-200">
      <Link
        to="/"
        className="fixed top-6 left-6 text-gray-700 hover:text-blue-500 transition duration-300"
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
            platform="Udemy"
          />
        ) : (
          <div className="space-y-8">
            <div
              id="certificate"
              className="bg-[#FBF9FA] w-full max-w-[1056px] aspect-w-16 aspect-h-9 mx-auto shadow-lg  overflow-hidden border border-gray-300"
            >
              <div className="relative h-full">
                {/* Border Pattern */}
                <div className="absolute inset-0 border-[24px] border-white" />
                <div className="p-4 sm:p-8 lg:p-12 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between mt-6 ml-4 mr-4 sm:mt-8 items-center mb-8 sm:mb-16">
                    <img
                      src="/udemy_logo.png"
                      alt="Udemy Logo"
                      className="h-12 sm:h-15 "
                    />
                    <div className="text-right text-xs sm:text-sm text-[#908E8D]">
                      <div>Certificate No: <span className="font-semibold">{certificate.certId}</span></div>
                      <div>Certificate URL: <span className="font-semibold">ude.my/{certificate.certId}</span></div>
                      <div>Reference Number: <span className="font-semibold">0004</span></div>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="text-left flex-grow flex flex-col">
                    <h3 className="text-sm sm:text-lg font-bold text-[#6F7681] tracking-wider uppercase">
                      Certificate of Completion
                    </h3>
                    <h1 className="certificate-name text-4xl sm:text-6xl font-bold text-[#1D1B1C] leading-tight max-w-4xl">
                      {certificate.courseName}
                    </h1>
                    <p className="text-sm sm:text-lg text-[#1C181A] mt-4">
                      Instructors:{" "}
                      <span className="font-bold">{certificate.instructor}</span>
                    </p>

                    {/* Footer */}
                    <div className="mt-auto pt-16 sm:pt-32">
                      <h2 className="text-3xl sm:text-5xl font-bold text-[#1C1C1C] mb-4 sm:mb-6">
                        {certificate.firstName} {certificate.lastName}
                      </h2>
                      <p className="text-sm sm:text-lg text-[#1C1C1C] mb-2 sm:mb-3">
                        Date:{" "}
                        <span className="font-semibold">
                          {formatDate(certificate.completionDate)}
                        </span>
                      </p>
                      <p className="text-sm sm:text-lg text-[#1C1C1C]">
                        Length:{" "}
                        <span className="font-semibold">
                          {certificate.courseLength} total hours
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <button
              id="downloadBtn"
              onClick={downloadPDF}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 w-full max-w-md mx-auto block shadow-md"
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
