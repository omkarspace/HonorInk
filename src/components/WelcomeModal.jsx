import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, GraduationCap, Award, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { safeLocalStorage } from "@/lib/utils";

const STORAGE_KEY = "honorink_welcome_shown";

const steps = [
  {
    icon: GraduationCap,
    title: "Choose a Platform",
    description: "Select Udemy, LinkedIn, or Coursera from the home page",
  },
  {
    icon: Award,
    title: "Fill in Details",
    description: "Enter your name, course name, and completion date",
  },
  {
    icon: CheckCircle,
    title: "Download",
    description: "Generate and download your professional certificate",
  },
];

function WelcomeModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = safeLocalStorage.getItem(STORAGE_KEY);
    if (!hasSeenWelcome) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (dontShowAgain) {
      safeLocalStorage.setItem(STORAGE_KEY, "true");
    }
  };

  const handleDontShowAgain = () => {
    setDontShowAgain(true);
    safeLocalStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
          aria-label="Close welcome modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary rounded-lg">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Welcome to HonorInk</h2>
              <p className="text-muted-foreground text-sm">Create professional certificates in seconds</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-primary" />
                      <h3 className="font-medium text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/udemy" onClick={handleClose} className="flex-1">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={handleDontShowAgain}
              className="flex-1"
            >
              Do not show again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeModal;