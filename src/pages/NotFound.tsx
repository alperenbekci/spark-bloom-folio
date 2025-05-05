
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { useStore } from "@/store/useStore";

export default function NotFound() {
  const { language } = useStore();
  
  return (
    <Layout>
      <div className="h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4">
        <h1 className="text-8xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-6">
          {language === "en" ? "Page Not Found" : "Sayfa Bulunamadı"}
        </h2>
        <p className="text-foreground/70 text-center max-w-md mb-8">
          {language === "en"
            ? "The page you're looking for doesn't exist or has been moved."
            : "Aradığınız sayfa mevcut değil veya taşındı."}
        </p>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === "en" ? "Back to Home" : "Ana Sayfaya Dön"}
          </Link>
        </Button>
      </div>
    </Layout>
  );
}
