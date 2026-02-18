import { useEffect } from "react";

interface JsonLdSchema {
  [key: string]: unknown;
}

interface PageSEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  jsonLd?: JsonLdSchema | JsonLdSchema[];
}

const BASE_URL = "https://www.yvoo.io";

const PageSEO = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogType = "website",
  jsonLd,
}: PageSEOProps) => {
  useEffect(() => {
    // Title
    document.title = title;

    // Helper to set or create a meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    setMeta("property", "og:title", ogTitle || title);
    setMeta("property", "og:description", ogDescription || description);
    setMeta("property", "og:type", ogType);
    if (canonical) {
      setMeta("property", "og:url", `${BASE_URL}${canonical}`);
    }

    // Canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", `${BASE_URL}${canonical}`);
    }

    // JSON-LD
    const scriptId = "page-seo-jsonld";
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = scriptId;
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [title, description, canonical, ogTitle, ogDescription, ogType, jsonLd]);

  return null;
};

export default PageSEO;
