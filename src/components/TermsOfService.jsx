import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, AlertTriangle, Copyright, ArrowLeft } from "lucide-react";
import SEO from "./SEO";

const TermsOfService = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: (
        <p className="text-muted-foreground">
          By accessing and using HonorInk (the Service), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.
        </p>
      ),
    },
    {
      title: "2. Description of Service",
      content: (
        <p className="text-muted-foreground">
          HonorInk provides a web-based platform for generating professional-style certificates for educational courses completed on platforms like Udemy, LinkedIn Learning, and Coursera. The service allows users to input their course information and generate downloadable certificate images and PDFs.
        </p>
      ),
    },
    {
      title: "3. User Obligations",
      content: (
        <div className="space-y-3 text-muted-foreground">
          <p>You agree to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Provide accurate and complete information when generating certificates</li>
            <li>Use the service only for lawful purposes</li>
            <li>Not attempt to gain unauthorized access to any part of the service</li>
            <li>Not use the service in any way that could damage, disable, or impair the service</li>
            <li>Not reproduce, duplicate, copy, sell, or resell any part of the service</li>
          </ul>
        </div>
      ),
    },
    {
      title: "4. Intellectual Property Rights",
      content: (
        <div className="space-y-3 text-muted-foreground">
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Copyright className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-foreground">Certificate Templates</h4>
                <p className="text-sm mt-1">
                  The certificate template designs and layouts are the intellectual property of HonorInk. Users may generate certificates for personal use.
                </p>
              </div>
            </div>
          </div>
          <p>
            The certificate designs are for demonstration and personalization purposes only. They are not affiliated with, endorsed by, or connected to Udemy, LinkedIn, Coursera, or any other platform. Generated certificates should be used responsibly and not misrepresented as official credentials.
          </p>
        </div>
      ),
    },
    {
      title: "5. Disclaimer of Warranties",
      content: (
        <div className="space-y-3 text-muted-foreground">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-yellow-800 dark:text-yellow-200">Important Notice</p>
                <p className="text-sm mt-1">
                  Generated certificates are for personal, non-commercial use only and do not constitute official credentials from any educational institution or platform.
                </p>
              </div>
            </div>
          </div>
          <p>
            THE SERVICE IS PROVIDED ON AN AS IS AND AS AVAILABLE BASIS. HONORINK MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
          </p>
        </div>
      ),
    },
    {
      title: "6. Limitation of Liability",
      content: (
        <p className="text-muted-foreground">
          IN NO EVENT SHALL HONORINK, ITS OFFICERS, DIRECTORS, OR EMPLOYEES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU, IF ANY, FOR ACCESSING THE SERVICE.
        </p>
      ),
    },
    {
      title: "7. User Generated Content",
      content: (
        <p className="text-muted-foreground">
          You are solely responsible for the content you input when using our certificate generator, including names, course titles, dates, and other information. You represent and warrant that you have the right to use such content and that it does not infringe upon the rights of any third party.
        </p>
      ),
    },
    {
      title: "8. Termination",
      content: (
        <p className="text-muted-foreground">
          We reserve the right to terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including breach of these Terms of Service. Upon termination, your right to use the Service will immediately cease.
        </p>
      ),
    },
    {
      title: "9. Governing Law",
      content: (
        <p className="text-muted-foreground">
          These Terms shall be governed by and construed in accordance with applicable laws, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the appropriate jurisdiction.
        </p>
      ),
    },
    {
      title: "10. Changes to Terms",
      content: (
        <p className="text-muted-foreground">
          We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on this page. Your continued use of the Service after such changes constitutes acceptance of the new Terms.
        </p>
      ),
    },
    {
      title: "11. Contact Information",
      content: (
        <div className="space-y-2">
          <p className="text-muted-foreground">
            For questions about these Terms of Service, please contact us:
          </p>
          <a
            href="mailto:support@honorink.app"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            support@honorink.app
          </a>
        </div>
      ),
    },
  ];

  const lastUpdated = "April 13, 2026";

  return (
    <>
      <SEO title="Terms of Service - HonorInk" />
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
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Terms of Service</h1>
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
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
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

export default TermsOfService;