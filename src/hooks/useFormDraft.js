import { useState, useEffect, useCallback } from "react";
import { STORAGE_KEYS } from "@/lib/constants";
import { safeLocalStorage } from "@/lib/utils";

const useFormDraft = (platform) => {
  const storageKey = `${STORAGE_KEYS.FORM_DRAFT}-${platform}`;
  
  const [draft, setDraft] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = safeLocalStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const saveDraft = useCallback((data) => {
    const success = safeLocalStorage.setItem(storageKey, data);
    if (success) {
      setDraft(data);
    }
  }, [storageKey]);

  const clearDraft = useCallback(() => {
    const success = safeLocalStorage.removeItem(storageKey);
    if (success) {
      setDraft({});
    }
  }, [storageKey]);

  const loadDraft = useCallback(() => {
    return draft;
  }, [draft]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (Object.keys(draft).length > 0) {
        safeLocalStorage.setItem(storageKey, draft);
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