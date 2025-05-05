
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { useStore } from "@/store/useStore";
import { getText } from "@/lib/i18n";

export default function Footer() {
  const { language } = useStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-heading font-bold">
              Portfolio
            </Link>
            <p className="mt-4 text-sm text-foreground/70 max-w-md">
              {language === "en" 
                ? "I'm a full-stack developer and designer focused on creating clean and user-friendly experiences."
                : "Temiz ve kullanıcı dostu deneyimler yaratmaya odaklanan bir full-stack geliştirici ve tasarımcıyım."}
            </p>
            <div className="mt-6 flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">
              {language === "en" ? "Links" : "Bağlantılar"}
            </h3>
            <ul className="space-y-3">
              {[
                { path: "/", label: "nav.home" },
                { path: "/about", label: "nav.about" },
                { path: "/projects", label: "nav.projects" },
                { path: "/blog", label: "nav.blog" },
                { path: "/contact", label: "nav.contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-foreground/70 hover:text-primary transition-colors"
                  >
                    {getText(link.label, language)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">
              {language === "en" ? "Contact" : "İletişim"}
            </h3>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>hello@example.com</li>
              <li>+90 555 123 4567</li>
              <li>Istanbul, Turkey</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60">
            © {currentYear} Portfolio. {language === "en" ? "All rights reserved." : "Tüm hakları saklıdır."}
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6 text-sm text-foreground/60">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              {language === "en" ? "Privacy Policy" : "Gizlilik Politikası"}
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              {language === "en" ? "Terms of Service" : "Kullanım Şartları"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
