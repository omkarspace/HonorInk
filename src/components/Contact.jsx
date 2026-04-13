import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageSquare, Bug, CheckCircle2, AlertCircle } from "lucide-react";
import SEO from "./SEO";

const contactTypes = [
  { value: "general", label: "General Inquiry", icon: MessageSquare },
  { value: "bug", label: "Bug Report", icon: Bug },
  { value: "support", label: "Technical Support", icon: Mail },
];

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [contactType, setContactType] = useState("general");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "bug") {
      setContactType("bug");
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (isSubmitted) {
    return (
      <>
        <SEO title="Thank You - HonorInk" />
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Thank You!</h2>
              <p className="text-muted-foreground mb-6">
                We received your message and will get back to you shortly.
              </p>
              <Button onClick={() => setIsSubmitted(false)} variant="outline">
                Send Another Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Contact - HonorInk" />
      <div className="min-h-screen bg-background py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Contact Us
              </h1>
              <p className="text-muted-foreground text-lg">
                Have a question or feedback? We would love to hear from you.
              </p>
            </div>

            <Card>
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-foreground">What is this about?</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {contactTypes.map((type) => {
                        const IconComponent = type.icon;
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setContactType(type.value)}
                            className={`p-3 rounded-lg border transition-all duration-200 flex flex-col items-center gap-2 ${
                              contactType === type.value
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border text-muted-foreground hover:border-primary/50"
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                            <span className="text-sm font-medium">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">
                        Your Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`bg-background border ${
                          errors.name ? "border-destructive" : "border-border"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`bg-background border ${
                          errors.email ? "border-destructive" : "border-border"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-foreground">
                      Subject <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={contactType === "bug" ? "Brief description of the issue" : "What is this about?"}
                      className={`bg-background border ${
                        errors.subject ? "border-destructive" : "border-border"
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder={
                        contactType === "bug"
                          ? "Please describe the issue in detail: What happened, what you expected, and any error messages."
                          : "Tell us more about your inquiry..."
                      }
                      className={`bg-background border resize-none ${
                        errors.message ? "border-destructive" : "border-border"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </div>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <p className="text-center text-muted-foreground text-sm mt-8">
              Or email us directly at{" "}
              <a href="mailto:support@honorink.app" className="text-primary hover:underline">
                support@honorink.app
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;