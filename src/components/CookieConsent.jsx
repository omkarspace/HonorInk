import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cookie, X, Settings, Check } from "lucide-react";
import { safeLocalStorage } from "@/lib/utils";

const COOKIE_CONSENT_KEY = "honorink_cookie_consent";

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState({
    necessary: true,
    analytics: false,
  });

  useEffect(() => {
    const storedConsent = safeLocalStorage.getItem(COOKIE_CONSENT_KEY);
    if (!storedConsent) {
      setIsVisible(true);
    } else {
      const parsed = JSON.parse(storedConsent);
      setConsent(parsed);
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent = { necessary: true, analytics: true };
    setConsent(fullConsent);
    safeLocalStorage.setItem(COOKIE_CONSENT_KEY, fullConsent);
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleAcceptNecessary = () => {
    const minimalConsent = { necessary: true, analytics: false };
    setConsent(minimalConsent);
    safeLocalStorage.setItem(COOKIE_CONSENT_KEY, minimalConsent);
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleSaveSettings = () => {
    safeLocalStorage.setItem(COOKIE_CONSENT_KEY, consent);
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleManageCookies = () => {
    setShowSettings(true);
  };

  const toggleAnalytics = () => {
    setConsent((prev) => ({ ...prev, analytics: !prev.analytics }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-4xl mx-auto overflow-hidden">
        {!showSettings ? (
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Cookie Preferences
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  We use cookies to enhance your browsing experience and analyze site traffic. 
                  By clicking Accept All, you consent to our use of cookies. 
                  You can manage your preferences or choose to accept only essential cookies.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Accept All
                  </Button>
                  <Button
                    onClick={handleAcceptNecessary}
                    variant="outline"
                  >
                    Accept Necessary Only
                  </Button>
                  <Button
                    onClick={handleManageCookies}
                    variant="ghost"
                    className="text-muted-foreground"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Cookies
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-4 text-sm">
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                Cookie Settings
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">Necessary Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Essential for the website to function. Cannot be disabled.
                  </p>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={consent.necessary}
                    disabled
                    className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">Analytics Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how visitors interact with our website.
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={toggleAnalytics}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      consent.analytics ? "bg-primary" : "bg-muted"
                    }`}
                    role="switch"
                    aria-checked={consent.analytics}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        consent.analytics ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleSaveSettings}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Save Preferences
              </Button>
              <Button
                onClick={() => setShowSettings(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CookieConsent;