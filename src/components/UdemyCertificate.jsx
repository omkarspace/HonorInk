import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import CertificateForm from "./CertificateForm";
import { generateCertificateId, formatCertificateDate, exportToPDF, exportToImage, logger } from "@/lib/utils";
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
      label: "Course Length (hours)",
      type: "number",
      placeholder: "e.g., 12 (total hours)",
    },
    {
      name: "courseName",
      label: "Course Name",
      type: "textarea",
      placeholder: "e.g., Complete Web Development Bootcamp",
    },
    {
      name: "instructor",
      label: "Instructor Name",
      type: "text",
      placeholder: "e.g., Dr. Angela Yu",
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
    setIsGenerating(true);
    exportToImage("certificate", `udemy-certificate-${certificate.certId}.${format}`, format, 2)
      .catch((error) => {
        logger.error("Image export failed:", error);
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };

  const downloadPDF = () => {
    setIsGenerating(true);
    exportToPDF("certificate", `udemy-certificate-${certificate.certId}.pdf`)
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
              className="w-full max-w-[1280px] mx-auto overflow-hidden relative"
              style={{ aspectRatio: "1.414", fontFamily: "'Playfair Display', serif" }}
            >
              {/* Background */}
              <div className="absolute inset-0" style={{ backgroundColor: "#EAF4FB" }} />
              
              {/* Guilloche Border Pattern */}
              <div className="absolute inset-0" style={{
                border: "24px solid #4A9BB5",
                boxShadow: "inset 0 0 0 4px #4A9BB5, inset 0 0 0 8px #EAF4FB"
              }} />
              
              {/* Inner double border */}
              <div className="absolute inset-2 border border-[#2B6777]/20" />
              
              {/* Decorative guilloche pattern */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
                <pattern id="guilloche" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M0 10 Q5 0 10 10 T20 10" fill="none" stroke="#4A9BB5" strokeWidth="0.3"/>
                  <path d="M0 0 Q5 10 10 0 T20 0" fill="none" stroke="#4A9BB5" strokeWidth="0.3"/>
                </pattern>
                <rect x="0" y="0" width="100" height="100" fill="url(#guilloche)" />
              </svg>

              <div className="relative h-full p-12 lg:p-16 flex flex-col items-center justify-between" style={{ fontFamily: "'Playfair Display', serif" }}>
                {/* Header */}
                <div className="w-full flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src="/udemy_logo.png"
                      alt="Udemy"
                      className="h-10 w-auto"
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-[#1D6A72]/60 uppercase tracking-widest">Certificate No</p>
                    <p className="text-xs font-bold text-[#1D6A72]">{certificate.certId}</p>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-grow flex flex-col items-center justify-center text-center px-8">
                  <p className="text-[12px] tracking-[0.35em] text-[#888888] uppercase mb-10 font-light">
                    Certificate of Completion
                  </p>
                  
                  <h1 className="text-[42px] font-serif italic text-[#1D6A72] font-normal mb-8 max-w-3xl leading-tight">
                    {certificate.courseName}
                  </h1>
                  
                  <p className="text-[18px] text-[#444444] font-light mb-10" style={{ fontFamily: "'Lato', sans-serif" }}>
                    This is to certify that
                  </p>
                  
                  <h2 className="text-[70px] font-serif italic text-[#1D6A72] font-normal my-4" style={{ lineHeight: 1.1 }}>
                    {certificate.firstName} {certificate.lastName}
                  </h2>
                  
                  <p className="text-[18px] text-[#444444] font-light mb-2" style={{ fontFamily: "'Lato', sans-serif" }}>
                    successfully completed
                  </p>
                  
                  <p className="text-[22px] font-serif italic text-[#1A1A1A] font-bold mb-2">
                    {certificate.courseLength} hour{certificate.courseLength > 1 ? 's' : ''}
                  </p>
                  
                  <p className="text-[18px] text-[#444444] font-light mb-2" style={{ fontFamily: "'Lato', sans-serif" }}>
                    of <span className="italic font-normal">{certificate.courseName}</span> online course
                  </p>
                  
                  <p className="text-[18px] text-[#444444] font-light mb-16" style={{ fontFamily: "'Lato', sans-serif" }}>
                    on {formatCertificateDate(certificate.completionDate)}
                  </p>
                </div>

                {/* Signature Block */}
                <div className="flex justify-center items-center gap-16 w-full">
                  <div className="text-center">
                    <p className="text-2xl text-[#1D6A72] mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
                      {certificate.instructor}
                    </p>
                    <div className="w-40 h-px bg-[#1D6A72]/30 mx-auto mb-1" />
                    <p className="text-[10px] text-[#1D6A72]/60 uppercase tracking-widest">
                      Instructor
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xl text-[#1D6A72] italic font-normal mb-2">
                      {formatCertificateDate(certificate.completionDate)}
                    </p>
                    <div className="w-40 h-px bg-[#1D6A72]/30 mx-auto mb-1" />
                    <p className="text-[10px] text-[#1D6A72]/60 uppercase tracking-widest">
                      Date
                    </p>
                  </div>
                </div>

                {/* Udemy Logo and Seal */}
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-[#1D6A72]/30 text-xs">&</span>
                    <img
                      src="/udemy_logo.png"
                      alt="Udemy"
                      className="h-6 w-auto"
                    />
                  </div>
                  
                  {/* Seal / Badge - 88px diameter */}
                  <div className="flex flex-col items-center">
                    <div className="w-[88px] h-[88px] rounded-full border border-[#2BB5B8] flex items-center justify-center" 
                         style={{ background: 'linear-gradient(135deg, #EAF4FB 0%, #2BB5B8/10 100%)' }}>
                      <span className="text-[10px] text-[#1D6A72] font-light tracking-wider">#BeAble</span>
                    </div>
                  </div>
                  
                  {/* Verify URL */}
                  <div className="text-right">
                    <p className="text-[10px] text-[#1D6A72]/60 uppercase tracking-widest">Verify at</p>
                    <p className="text-xs text-[#1D6A72]">ude.my/{certificate.certId}</p>
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
    </>
  );
};

export default UdemyCertificate;