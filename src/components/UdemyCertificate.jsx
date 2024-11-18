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
      type: "float",
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
    <div className="min-h-screen p-6 bg-gray-100">
      <Link
        to="/"
        className="fixed top-6 left-6 text-white hover:text-blue-400 transition duration-300"
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
          <div className="space-y-6">
            <div
              id="certificate"
              className="relative bg-[#F8F9FB] w-[1056px] h-[748px] mx-auto shadow-lg"
            >
              <div className="p-12 h-full flex flex-col">
                <div className="flex justify-between items-start mb-16">
                  <img
                    src="/udemy_logo.png"
                    alt="Udemy"
                    className="h-12"
                  />
                  <div className="text-right text-sm text-[#6A6F73]">
                    <div>Certificate no: {certificate.certId}</div>
                    <div>Certificate url: ude.my/{certificate.certId}</div>
                    <div>Reference Number: 0004</div>
                  </div>
                </div>

                <div className="text-left flex-grow flex flex-col">
                  <h3 className="text-lg font-bold text-[#6A6F73] mb-8 tracking-wider">
                    CERTIFICATE OF COMPLETION
                  </h3>
                  <h1 className="text-[52px] font-bold text-[#1C1D1F] mb-6 leading-tight max-w-4xl">
                    {certificate.courseName}
                  </h1>
                  <p className="text-lg text-[#1C1D1F]">
                    Instructors{" "}
                    <span className="font-bold">
                      {certificate.instructor}
                    </span>
                  </p>

                  <div className="mt-auto pt-32">
                    <h2 className="text-5xl font-bold text-[#1C1D1F] mb-6">
                      {certificate.firstName} {certificate.lastName}
                    </h2>
                    <p className="text-lg text-[#1C1D1F] mb-3">
                      Date{" "}
                      <span className="font-bold ml-2">
                        {formatDate(certificate.completionDate)}
                      </span>
                    </p>
                    <p className="text-lg text-[#1C1D1F]">
                      Length{" "}
                      <span className="font-bold ml-2">
                        {certificate.courseLength} total hours
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              id="downloadBtn"
              onClick={downloadPDF}
              className="bg-[#1C1D1F] text-white px-6 py-3 rounded-md hover:bg-[#2D2F31] transition duration-300 w-full max-w-md mx-auto block"
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
