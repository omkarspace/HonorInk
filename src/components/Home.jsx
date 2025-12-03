import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, CheckCircle } from "lucide-react";

const Home = () => {
  const certificates = [
    {
      to: "/udemy",
      title: "Udemy Certificate",
      description: "Generate professional Udemy-style certificates",
      icon: GraduationCap,
      color: "bg-primary",
      textColor: "text-primary-foreground",
    },
    {
      to: "/linkedin",
      title: "LinkedIn Certificate",
      description: "Create LinkedIn Learning certificates",
      icon: Award,
      color: "bg-secondary",
      textColor: "text-secondary-foreground",
    },
    {
      to: "/coursera",
      title: "Coursera Certificate",
      description: "Generate Coursera course certificates",
      icon: CheckCircle,
      color: "bg-accent",
      textColor: "text-accent-foreground",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"></div>
        <div className="relative container mx-auto px-4 py-12 sm:py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Professional
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-primary/80">
                Certificate Generator
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
              Create stunning, professional certificates in seconds. Choose from multiple platforms and customize your credentials with ease.
            </p>
          </div>
        </div>
      </div>

      {/* Certificate Options */}
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Choose Your Platform
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Select the certificate style that matches your learning platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {certificates.map((cert) => {
              const IconComponent = cert.icon;
              return (
                <Link
                  key={cert.to}
                  to={cert.to}
                  className="group block transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  <Card className="h-full bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-primary/20 overflow-hidden">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className={`p-4 rounded-full ${cert.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                          <IconComponent className={`w-8 h-8 ${cert.textColor}`} />
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {cert.title}
                          </h3>
                          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            {cert.description}
                          </p>
                        </div>

                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="inline-flex items-center text-primary font-medium">
                            Get Started
                            <svg
                              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-muted/30 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Why Choose HonorInk?
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg">
                Professional certificates that make an impact
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground text-sm">Generate certificates in seconds with our streamlined process</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Professional Quality</h3>
                <p className="text-muted-foreground text-sm">High-resolution PDFs and PNGs that look great everywhere</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Easy to Use</h3>
                <p className="text-muted-foreground text-sm">Simple forms and instant downloads with no complex setup</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground text-sm sm:text-base">
              Create professional certificates with HonorInk • Built with modern web technologies
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
