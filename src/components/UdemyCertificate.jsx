import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import CertificateForm from "./CertificateForm";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import { generateCertificateId } from "@/lib/utils";
import { CERTIFICATE_ID_PREFIX } from "@/lib/constants";
import SEO, { seoConfig } from "./SEO";

const UdemyCertificate = () => {
  const seo = seoConfig.udemy;
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

  const handleSubmit = (data) => {
    const certId = generateCertificateId(CERTIFICATE_ID_PREFIX.UDEMY);
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
    <>
      <SEO {...seo} />
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
              className="bg-white w-full max-w-[1123px] mx-auto shadow-2xl overflow-hidden relative"
              style={{ minHeight: "794px", aspectRatio: "1.414" }}
            >
              <div className="absolute inset-0 border-[20px] border-white" />
              <div className="absolute inset-2 border-[3px] border-[#E8E8E8]" />
              
              <div className="relative h-full p-12 lg:p-16 flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-6">
                    <img
                      src="/udemy_logo.png"
                      alt="Udemy Logo"
                      className="h-14 w-auto"
                    />
                    <div className="h-12 w-px bg-gray-300" />
                    <div>
                      <p className="text-sm text-[#1A1A1A]">Instructor</p>
                      <p className="text-lg font-bold text-[#1A1A1A]">{certificate.instructor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Certificate No:</p>
                    <p className="text-lg font-bold text-[#1A1A1A]">{certificate.certId}</p>
                    <p className="text-sm text-gray-500 mt-2">ude.my/{certificate.certId}</p>
                  </div>
                </div>

                {/* Decorative Line */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#A352F8] to-transparent mb-8" />

                {/* Main Content */}
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                  <p className="text-lg tracking-[0.3em] text-gray-500 uppercase mb-4">
                    Certificate of Completion
                  </p>
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1A1A1A] leading-tight max-w-4xl mb-8">
                    {certificate.courseName}
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl">
                    This is to certify that
                  </p>
                  <h2 className="text-5xl lg:text-6xl font-serif italic text-[#1A1A1A] my-6">
                    {certificate.firstName} {certificate.lastName}
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl">
                    has successfully completed the course
                  </p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end mt-8 pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <div className="w-48 h-px bg-[#1A1A1A] mb-2" />
                    <p className="text-sm font-bold text-[#1A1A1A]">{formatDate(certificate.completionDate)}</p>
                    <p className="text-xs text-gray-500">Date of Completion</p>
                  </div>
                  <div className="text-center">
                    <div className="w-48 h-px bg-[#1A1A1A] mb-2" />
                    <p className="text-sm font-bold text-[#1A1A1A]">{certificate.courseLength} Hours</p>
                    <p className="text-xs text-gray-500">Course Length</p>
                  </div>
                  <div className="text-center">
                    <div className="w-48 h-px bg-[#1A1A1A] mb-2" />
                    <p className="text-sm font-bold text-[#1A1A1A]">ude.my/{certificate.certId}</p>
                    <p className="text-xs text-gray-500">Verify Certificate</p>
                  </div>
                </div>

                {/* Corner Ornaments */}
                <div className="absolute top-8 left-8 w-16 h-16 opacity-20">
                  <svg viewBox="0 0 50 50" fill="none" className="w-full h-full">
                    <path d="M0 25C0 11.193 11.193 0 25 0" stroke="#000" strokeWidth="2"/>
                    <path d="M0 15C0 6.716 6.716 0 15 0" stroke="#000" strokeWidth="2"/>
                    <circle cx="25" cy="25" r="3" fill="#000"/>
                  </svg>
                </div>
                <div className="absolute top-8 right-8 w-16 h-16 opacity-20 rotate-90">
                  <svg viewBox="0 0 50 50" fill="none" className="w-full h-full">
                    <path d="M0 25C0 11.193 11.193 0 25 0" stroke="#000" strokeWidth="2"/>
                    <path d="M0 15C0 6.716 6.716 0 15 0" stroke="#000" strokeWidth="2"/>
                    <circle cx="25" cy="25" r="3" fill="#000"/>
                  </svg>
                </div>
                <div className="absolute bottom-8 left-8 w-16 h-16 opacity-20 -rotate-90">
                  <svg viewBox="0 0 50 50" fill="none" className="w-full h-full">
                    <path d="M0 25C0 11.193 11.193 0 25 0" stroke="#000" strokeWidth="2"/>
                    <path d="M0 15C0 6.716 6.716 0 15 0" stroke="#000" strokeWidth="2"/>
                    <circle cx="25" cy="25" r="3" fill="#000"/>
                  </svg>
                </div>
                <div className="absolute bottom-8 right-8 w-16 h-16 opacity-20 rotate-180">
                  <svg viewBox="0 0 50 50" fill="none" className="w-full h-full">
                    <path d="M0 25C0 11.193 11.193 0 25 0" stroke="#000" strokeWidth="2"/>
                    <path d="M0 15C0 6.716 6.716 0 15 0" stroke="#000" strokeWidth="2"/>
                    <circle cx="25" cy="25" r="3" fill="#000"/>
                  </svg>
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
    </>
  );
};

export default UdemyCertificate;
