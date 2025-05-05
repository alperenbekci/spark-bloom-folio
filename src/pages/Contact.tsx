
import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import FloatingShapes from "@/components/FloatingShapes";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useStore } from "@/store/useStore";
import { getText } from "@/lib/i18n";

export default function Contact() {
  const { language } = useStore();
  
  useEffect(() => {
    // Animate elements
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-info-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
        }
      );
      
      gsap.fromTo(
        ".contact-form",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
        }
      );
      
      gsap.fromTo(
        ".social-btn",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.6,
        }
      );
    });
    
    return () => ctx.revert();
  }, []);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20">
        <FloatingShapes />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {getText("contact.title", language)}
            </h1>
            <p className="text-xl text-foreground/80">
              {getText("contact.subtitle", language)}
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {language === "en" ? "Get in Touch" : "İletişime Geçin"}
              </h2>
              <p className="text-foreground/80 mb-8">
                {language === "en"
                  ? "Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you! Fill out the form or reach out directly through any of these channels."
                  : "Aklınızda bir proje mi var veya potansiyel bir işbirliğini mi görüşmek istiyorsunuz? Sizden haber almak isterim! Formu doldurun veya bu kanallardan herhangi biri aracılığıyla doğrudan iletişime geçin."}
              </p>
              
              <div className="space-y-6">
                <div className="contact-info-item flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      {language === "en" ? "Email" : "E-posta"}
                    </h3>
                    <p className="text-foreground/80">hello@example.com</p>
                  </div>
                </div>
                
                <div className="contact-info-item flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      {language === "en" ? "Phone" : "Telefon"}
                    </h3>
                    <p className="text-foreground/80">+90 555 123 4567</p>
                  </div>
                </div>
                
                <div className="contact-info-item flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      {language === "en" ? "Location" : "Konum"}
                    </h3>
                    <p className="text-foreground/80">Istanbul, Turkey</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-lg font-medium mb-4">
                  {language === "en" ? "Connect with me" : "Benimle bağlantı kurun"}
                </h3>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full social-btn"
                    onClick={() => window.open("https://github.com", "_blank")}
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full social-btn"
                    onClick={() => window.open("https://linkedin.com", "_blank")}
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full social-btn"
                    onClick={() => window.open("https://twitter.com", "_blank")}
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="contact-form">
              <div className="bg-background border border-border rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">
                  {language === "en" ? "Send a Message" : "Mesaj Gönder"}
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section (would be replaced with an actual map in a real app) */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="aspect-[16/9] w-full bg-background/50 border border-border rounded-xl overflow-hidden">
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <p className="text-foreground/60">
                {language === "en" ? "Map placeholder" : "Harita yer tutucusu"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
