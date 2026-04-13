import { useState, useCallback } from "react";
import { exportToPDF, exportToImage, logger } from "@/lib/utils";

const useCertificateExport = (certificateId, platform = "certificate") => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const exportAsImage = useCallback(async (elementId, format = "png") => {
    setIsGenerating(true);
    setError(null);

    try {
      await exportToImage(elementId, `${platform}-certificate-${certificateId}.${format}`, format, 2);
    } catch (err) {
      logger.error("Image export failed:", err);
      setError(err);
    } finally {
      setIsGenerating(false);
    }
  }, [certificateId, platform]);

  const downloadPDF = useCallback(async (elementId) => {
    setIsGenerating(true);
    setError(null);

    try {
      await exportToPDF(elementId, `${platform}-certificate-${certificateId}.pdf`);
    } catch (err) {
      logger.error("PDF generation failed:", err);
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
