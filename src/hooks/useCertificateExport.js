import { useState, useCallback } from "react";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import { PDF_OPTIONS, PDF_FORMATS, EXPORT_FORMATS } from "@/lib/constants";

const useCertificateExport = (certificateId, platform = "certificate") => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const exportAsImage = useCallback(async (elementId, format = EXPORT_FORMATS.PNG) => {
    const element = document.getElementById(elementId);
    if (!element) {
      const err = new Error("Certificate element not found!");
      console.error(err);
      setError(err);
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const canvas = await html2canvas(element, {
        scale: PDF_OPTIONS.HTML2CANVAS_SCALE,
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
      });

      const link = document.createElement("a");
      link.download = `${platform}-certificate-${certificateId}.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
    } catch (err) {
      console.error("Image export failed:", err);
      setError(err);
    } finally {
      setIsGenerating(false);
    }
  }, [certificateId, platform]);

  const downloadPDF = useCallback(async (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) {
      const err = new Error("Certificate element not found!");
      console.error(err);
      setError(err);
      return;
    }

    const opt = {
      margin: PDF_OPTIONS.MARGIN,
      filename: `${platform}-certificate-${certificateId}.pdf`,
      image: { type: PDF_FORMATS.IMAGE_TYPE, quality: PDF_OPTIONS.IMAGE_QUALITY },
      html2canvas: {
        scale: PDF_OPTIONS.HTML2CANVAS_SCALE,
        useCORS: true,
        letterRendering: true,
        windowWidth: PDF_OPTIONS.WINDOW_WIDTH,
        dpi: PDF_OPTIONS.DPI,
        logging: false,
        removeContainer: true,
      },
      jsPDF: {
        unit: PDF_FORMATS.UNIT,
        format: PDF_FORMATS.FORMAT,
        orientation: PDF_FORMATS.ORIENTATION,
        compress: true,
        precision: 16,
        putOnlyUsedFonts: true,
      },
      pagebreak: { mode: "avoid-all" },
    };

    setIsGenerating(true);
    setError(null);

    try {
      await html2pdf().from(element).set(opt).save();
    } catch (err) {
      console.error("PDF generation failed:", err);
      setError(err);
    } finally {
      setIsGenerating(false);
    }
  }, [certificateId, platform]);

  const reset = useCallback(() => {
    setError(null);
  }, []);

  return {
    isGenerating,
    error,
    exportAsImage,
    downloadPDF,
    reset,
  };
};

export default useCertificateExport;