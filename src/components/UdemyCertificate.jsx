import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import CertificateForm from "./CertificateForm";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

const UdemyCertificate = () => {
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
    setIsPreview(true);
  };

  const handleEdit = () => {
    setIsPreview(false);
  };

  const resetForm = () => {
    setCertificate(null);
    setIsPreview(false);
  };

  const exportAsImage = (format = 'png') => {
    const element = document.getElementById("certificate");
    if (!element) {
      console.error("Certificate element not found!");
      return;
    }

    setIsGenerating(true);

    html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: null,
    }).then((canvas) => {
      const link = document.createElement('a');
      link.download = `udemy-certificate-${certificate.certId}.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
      setIsGenerating(false);
    }).catch((error) => {
      console.error("Image export failed:", error);
      setIsGenerating(false);
    });
  };

  const downloadPDF = () => {
    const element = document.getElementById("certificate");
    if (!element) {
      console.error("Certificate element not found!");
      return;
    }

    const opt = {
      margin: 0,
      filename: `udemy-certificate-${certificate.certId}.pdf`,
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
    <div className="min-h-screen p-6 bg-background">
      <Link
        to="/"
        className="fixed top-6 left-6 text-muted-foreground hover:text-primary transition duration-300"
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
          <div className="max-w-2xl mx-auto">
            <CertificateForm
              onSubmit={handleSubmit}
              fields={fields}
              platform="Udemy"
            />
          </div>
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
                  <div className="flex justify-between items-start pt-6 px-4 sm:pt-8 sm:px-6 lg:pt-12 lg:px-8 mb-6 sm:mb-8 lg:mb-12">
                    <img
                      src="/udemy_logo.png"
                      alt="Udemy Logo"
                      className="h-10 sm:h-12 lg:h-16 w-auto"
                    />
                    <div className="text-right text-xs sm:text-sm text-[#908E8D] leading-tight">
                      <div className="mb-1">
                        Certificate No:{" "}
                        <span className="font-semibold">
                          {certificate.certId}
                        </span>
                      </div>
                      <div className="mb-1">
                        Certificate URL:{" "}
                        <span className="font-semibold">
                          ude.my/{certificate.certId}
                        </span>
                      </div>
                      <div>
                        Reference Number:{" "}
                        <span className="font-semibold">0004</span>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="flex-grow flex flex-col px-4 sm:px-6 lg:px-8">
                    <div className="flex-grow">
                      <h3 className="text-xs sm:text-sm lg:text-base font-bold text-[#6F7681] tracking-wider uppercase mb-2 sm:mb-4 lg:mb-6">
                        Certificate of Completion
                      </h3>
                      <h1 className="certificate-name text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1D1B1C] leading-tight max-w-4xl mb-3 sm:mb-4 lg:mb-6">
                        {certificate.courseName}
                      </h1>
                      <p className="text-xs sm:text-sm lg:text-base text-[#1C181A]">
                        Instructor:{" "}
                        <span className="font-bold">
                          {certificate.instructor}
                        </span>
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pb-6 sm:pb-8 lg:pb-12">
                      <h2 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1C1C1C] mb-2 sm:mb-3 lg:mb-4 xl:mb-6 leading-tight">
                        {certificate.firstName} {certificate.lastName}
                      </h2>
                      <p className="text-xs sm:text-sm lg:text-base text-[#1C1C1C] mb-1 sm:mb-2">
                        Date:{" "}
                        <span className="font-semibold">
                          {formatDate(certificate.completionDate)}
                        </span>
                      </p>
                      <p className="text-xs sm:text-sm lg:text-base text-[#1C1C1C]">
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isPreview && (
                <Button
                  onClick={handleEdit}
                  variant="secondary"
                >
                  Edit Details
                </Button>
              )}
              <div className="flex gap-4">
                <Button
                  onClick={downloadPDF}
                  disabled={isGenerating}
                  className="flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    "Download PDF"
                  )}
                </Button>
                <Button
                  onClick={() => exportAsImage('png')}
                  disabled={isGenerating}
                  variant="outline"
                >
                  Export PNG
                </Button>
              </div>
              <Button
                onClick={resetForm}
                variant="outline"
              >
                Create New Certificate
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UdemyCertificate;
