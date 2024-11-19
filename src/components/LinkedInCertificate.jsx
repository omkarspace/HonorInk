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
      placeholder: "e.g., Python , React.js ",
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
    <div className="min-h-screen p-6">
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
            platform="LinkedIn"
          />
        ) : (
          <div className="space-y-6">
            <div
              id="certificate"
              className="certificate-container bg-white w-[1056px] h-[748px] mx-auto"
              
            >
              
              <div className="border-[16px]  border-gray-200 h-full">
                <div className="p-16 h-full  flex flex-col">
                  <div className="flex justify-center items-start ">
                    <img
                      src="/linkedin-learning.png"
                      alt="LinkedIn Learning"
                      className="h-12 object-contain"
                    />
                  </div>

                  <h1 className="text-5xl font-thin text-gray-900 text-center  max-w-4xl ">
                    {certificate.courseName}
                  </h1>

                  <div className="text-center flex flex-col ">
                    <h2 className="text-2xl text-gray-700 mt-10">
                      Course completed by {certificate.firstName}{" "}
                      {certificate.lastName}
                    </h2>

                    <div className="text-xl text-center text-gray-700  ">
                      <p className="text-2xl text-gray-700 mb-10">
                        <span className="mr-2">
                          {formatDate(certificate.completionDate)}
                        </span>
                        <span className="mt-1">
                          at {certificate.courseCompleteTime} UTC
                        </span>
                        <span className="ml-1">•</span>

                        <span className="ml-1">{certificate.courseLength}</span>
                      </p>
                    </div>

                    <div className="text-gray-700 mt-5  ">
                      <p className=" text-2xl text-gray-700 mb-10 text-center ">
                        Top skills covered
                      </p>
                      <div className="parent flex justify-center">
                        <div className="start flex items-center gap-3 sm:gap-5">
                          <div className="items-center sm:px-5 sm:py-2 border-[2px] border-zinc-900 font-light text-sm sm:text-md uppercase rounded-full">
                            {certificate.skillCovered}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Certificate ID: {certificate.certId}
                    </div>
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

export default LinkedInCertificate;
