import { useEffect } from "react";

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription, 
  ogImage,
  canonical,
  noIndex = false
}) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const metaTags = {
      title: title || "",
      description: description || "",
      keywords: keywords || "",
      ogTitle: ogTitle || title || "",
      ogDescription: ogDescription || description || "",
      ogImage: ogImage || "",
      canonical: canonical || "",
    };

    const updateMetaTag = (name, content, attribute = "name") => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element && content) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      if (element && content) {
        element.setAttribute("content", content);
      }
    };

    updateMetaTag("title", metaTags.title, "property");
    updateMetaTag("description", metaTags.description);
    updateMetaTag("keywords", metaTags.keywords);
    updateMetaTag("og:title", metaTags.ogTitle, "property");
    updateMetaTag("og:description", metaTags.ogDescription, "property");
    updateMetaTag("og:image", metaTags.ogImage, "property");
    updateMetaTag("twitter:title", metaTags.ogTitle, "name");
    updateMetaTag("twitter:description", metaTags.ogDescription, "name");
    updateMetaTag("twitter:image", metaTags.ogImage, "name");

    if (noIndex) {
      updateMetaTag("robots", "noindex, nofollow");
      updateMetaTag("googlebot", "noindex, nofollow", "name");
    } else {
      updateMetaTag("robots", "index, follow");
      updateMetaTag("googlebot", "index, follow", "name");
    }

    if (metaTags.canonical) {
      let canonicalLink = document.querySelector("link[rel='canonical']");
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", metaTags.canonical);
    }

    return () => {
      const defaultTitle = "HonorInk - Create Custom Learning Certificates";
      document.title = defaultTitle;
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, canonical, noIndex]);

  return null;
};

export default SEO;

export const seoConfig = {
  home: {
    title: "HonorInk - Create Custom Learning Certificates | Free Certificate Generator",
    description: "Generate professional-looking completion certificates for Udemy, LinkedIn, and Coursera courses. Create, customize, and download certificates instantly for free.",
    keywords: "certificate generator, completion certificate, udemy certificate, linkedin certificate, coursera certificate, course completion, certificate maker",
  },
  udemy: {
    title: "Udemy Certificate Generator - Create Free Completion Certificates | HonorInk",
    description: "Generate authentic-looking Udemy course completion certificates. Add your name, course details, and download as PDF or image for free.",
    keywords: "udemy certificate, udemy completion certificate, udemy course certificate, free udemy certificate, completion certificate generator",
  },
  linkedin: {
    title: "LinkedIn Certificate Generator - Add to Profile | HonorInk",
    description: "Create LinkedIn Learning course completion certificates. Download and add directly to your LinkedIn profile to showcase your skills.",
    keywords: "linkedin certificate, linkedin learning certificate, linkedin completion, add certificate to linkedin",
  },
  coursera: {
    title: "Coursera Certificate Generator - Create Completion Certificates | HonorInk",
    description: "Generate professional Coursera course completion certificates. Add verify link and download in PDF or image format.",
    keywords: "coursera certificate, coursera completion, coursera course certificate, verify coursera certificate",
  },
  notFound: {
    title: "Page Not Found | HonorInk",
    noIndex: true,
  },
};