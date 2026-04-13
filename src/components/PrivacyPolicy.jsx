import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Mail, ArrowLeft } from "lucide-react";
import SEO from "./SEO";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Introduction",
      content: (
        <p>
          HonorInk (the Service) respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and certificate generation services.
        </p>
      ),
    },
    {
      title: "2. Information We Collect",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
            <p className="text-muted-foreground">
              Name, email address, and certificate details (course name, completion date, instructor name) that you voluntarily provide when generating certificates.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Automatically Collected Information</h3>
            <p className="text-muted-foreground">
              IP address, browser type, operating system, and usage data collected via cookies and analytics tools.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "3. How We Use Your Information",
      content: (
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>To provide and improve our certificate generation services</li>
          <li>To communicate with you about your certificates</li>
          <li>To analyze usage patterns and enhance user experience</li>
          <li>To comply with legal obligations</li>
        </ul>
      ),
    },
    {
      title: "4. Cookies and Tracking Technologies",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            We use cookies and similar tracking technologies to track activity on our service and hold certain information.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Essential Cookies</h4>
              <p className="text-sm text-muted-foreground">Required for basic site functionality and theme preferences.</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Analytics Cookies</h4>
              <p className="text-sm text-muted-foreground">Help us understand how visitors use our site.</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            You can manage cookie preferences through our Cookie Consent banner or your browser settings.
          </p>
        </div>
      ),
    },
    {
      title: "5. Data Sharing and Disclosure",
      content: (
        <p className="text-muted-foreground">
          We do not sell, trade, or otherwise transfer your personal information to outside parties, except as required by law or for service provision (e.g., payment processors, hosting services). We may share anonymized, aggregated data for analytics purposes.
        </p>
      ),
    },
    {
      title: "6. Data Security",
      content: (
        <p className="text-muted-foreground">
          We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
        </p>
      ),
    },
    {
      title: "7. Your Rights",
      content: (
        <div className="space-y-2 text-muted-foreground">
          <p>Under GDPR (EU users) and similar regulations, you may have the right to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Access your personal data</li>
            <li>Request correction or deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request transfer of your data</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, contact us at{" "}
            <a href="mailto:support@honorink.app" className="text-primary hover:underline">
              support@honorink.app
            </a>
          </p>
        </div>
      ),
    },
    {
      title: "8. Children's Privacy",
      content: (
        <p className="text-muted-foreground">
          Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
        </p>
      ),
    },
    {
      title: "9. Third-Party Links",
      content: (
        <p className="text-muted-foreground">
          Our service may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to read their privacy policies.
        </p>
      ),
    },
    {
      title: "10. Changes to This Policy",
      content: (
        <p className="text-muted-foreground">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the date. You should check this page periodically for changes.
        </p>
      ),
    },
    {
      title: "11. Contact Us",
      content: (
        <div className="space-y-2">
          <p className="text-muted-foreground">
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <a href="mailto:support@honorink.app" className="flex items-center gap-2 text-primary hover:underline">
              <Mail className="w-4 h-4" />
              support@honorink.app
            </a>
          </div>
        </div>
      ),
    },
  ];

  const lastUpdated = "April 13, 2026";

  return (
    <>
      <SEO title="Privacy Policy - HonorInk" />
      <div className="min-h-screen bg-background py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Privacy Policy</h1>
                <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
              </div>
            </div>

            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="space-y-8">
                  {sections.map((section, index) => (
                    <div key={index}>
                      <h2 className="text-lg font-semibold text-foreground mb-3">{section.title}</h2>
                      <div className="text-muted-foreground">{section.content}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link to="/contact" className="text-primary hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;