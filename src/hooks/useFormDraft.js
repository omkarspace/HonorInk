import { useState, useEffect, useCallback } from "react";
import { STORAGE_KEYS } from "@/lib/constants";

const useFormDraft = (platform) => {
  const storageKey = `${STORAGE_KEYS.FORM_DRAFT}-${platform}`;
  
  const [draft, setDraft] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const saveDraft = useCallback((data) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      setDraft(data);
    } catch (err) {
      console.error("Failed to save draft:", err);
    }
  }, [storageKey]);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
      setDraft({});
    } catch (err) {
      console.error("Failed to clear draft:", err);
    }
  }, [storageKey]);

  const loadDraft = useCallback(() => {
    return draft;
  }, [draft]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (Object.keys(draft).length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(draft));
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [draft, storageKey]);

  return {
    draft,
    saveDraft,
    clearDraft,
    loadDraft,
  };
};

export default useFormDraft;