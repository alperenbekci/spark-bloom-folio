
import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Progress } from "@/components/ui/progress";
import gsap from "gsap";
import { useStore } from "@/store/useStore";
import { getText } from "@/lib/i18n";
import FloatingShapes from "@/components/FloatingShapes";

export default function About() {
  const { language } = useStore();
  
  useEffect(() => {
    // Animate elements on scroll
    const ctx = gsap.context(() => {
      // Animate timeline items
      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
          }
        );
      });
      
      // Animate skills progress
      gsap.utils.toArray<HTMLElement>(".skill-progress").forEach((skill) => {
        const progressBar = skill.querySelector(".progress-bar");
        const targetValue = skill.getAttribute("data-value") || "0";
        
        if (progressBar) {
          gsap.fromTo(
            progressBar,
            { width: "0%" },
            {
              width: targetValue,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: skill,
                start: "top 90%",
              },
            }
          );
        }
      });
      
      // Animate tools
      gsap.utils.toArray<HTMLElement>(".tool-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: ".tools-section",
              start: "top 75%",
            },
          }
        );
      });
    });
    
    return () => ctx.revert();
  }, []);
  
  // Skill data
  const skills = [
    { name: "Front-end Development", value: 95 },
    { name: "Back-end Development", value: 85 },
    { name: "UI/UX Design", value: 90 },
    { name: "Mobile Development", value: 80 },
    { name: "DevOps", value: 75 },
  ];
  
  // Timeline data
  const timeline = [
    {
      year: "2023 - Present",
      title: language === "en" ? "Senior Developer" : "Kıdemli Geliştirici",
      company: "Tech Innovations Inc.",
      description:
        language === "en"
          ? "Leading a team of developers in creating web and mobile applications for clients across various industries."
          : "Çeşitli sektörlerdeki müşteriler için web ve mobil uygulamalar oluşturan bir geliştirici ekibine liderlik etmek.",
    },
    {
      year: "2020 - 2023",
      title: language === "en" ? "Full Stack Developer" : "Full Stack Geliştirici",
      company: "Digital Solutions Co.",
      description:
        language === "en"
          ? "Built scalable web applications using React, Node.js, and GraphQL. Implemented CI/CD pipelines and containerization."
          : "React, Node.js ve GraphQL kullanarak ölçeklenebilir web uygulamaları geliştirdim. CI/CD pipelines ve konteynerleştirme uyguladım.",
    },
    {
      year: "2018 - 2020",
      title: language === "en" ? "Front-end Developer" : "Front-end Geliştirici",
      company: "Creative Web Agency",
      description:
        language === "en"
          ? "Developed responsive websites and web applications for various clients using modern JavaScript frameworks."
          : "Modern JavaScript frameworklerini kullanarak çeşitli müşteriler için duyarlı web siteleri ve web uygulamaları geliştirdim.",
    },
    {
      year: "2016 - 2018",
      title: language === "en" ? "Junior Developer" : "Junior Geliştirici",
      company: "StartUp Labs",
      description:
        language === "en"
          ? "Started my journey in web development working on small projects and learning the fundamentals of web technologies."
          : "Web geliştirme yolculuğuma küçük projeler üzerinde çalışarak ve web teknolojilerinin temellerini öğrenerek başladım.",
    },
  ];
  
  // Tools data
  const tools = [
    { name: "VS Code", icon: "💻" },
    { name: "GitHub", icon: "🐙" },
    { name: "Docker", icon: "🐳" },
    { name: "Figma", icon: "🎨" },
    { name: "Jira", icon: "📋" },
    { name: "Slack", icon: "💬" },
    { name: "Webstorm", icon: "🔧" },
    { name: "Postman", icon: "📮" },
    { name: "Notion", icon: "📝" },
  ];
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20">
        <FloatingShapes />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {getText("about.title", language)}
            </h1>
            <p className="text-xl text-foreground/80 mb-6">
              {getText("about.subtitle", language)}
            </p>
            <p className="text-lg mb-8">
              {getText("about.intro", language)}
            </p>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <SectionHeading
            title={language === "en" ? "My Journey" : "Yolculuğum"}
            subtitle={
              language === "en"
                ? "A timeline of my professional experience"
                : "Profesyonel deneyimimin bir zaman çizelgesi"
            }
          />
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border mx-6 md:mx-0 md:-translate-x-0.5"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className="timeline-item relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-x-8"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-0 w-12 md:w-auto md:-translate-x-1/2 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-primary shadow-glow-sm"></div>
                  </div>
                  
                  {/* Content */}
                  <div
                    className={`p-6 bg-background rounded-lg border border-border shadow-sm ${
                      index % 2 === 0 ? "md:text-right md:mr-4" : "md:ml-4 md:col-start-2"
                    }`}
                  >
                    <div className="text-sm font-medium text-primary mb-1">{item.year}</div>
                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                    <div className="text-sm text-foreground/70 mb-3">{item.company}</div>
                    <p className="text-foreground/80">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            title={getText("about.skills", language)}
            subtitle={
              language === "en"
                ? "My areas of expertise and proficiency"
                : "Uzmanlık ve yeterlilik alanlarım"
            }
          />
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Skills */}
            <div className="space-y-8">
              {skills.map((skill, index) => (
                <div key={index} className="skill-progress" data-value={`${skill.value}%`}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-foreground/70">{skill.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="progress-bar h-full bg-primary rounded-full"
                      style={{ width: `${skill.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right Column - About Me */}
            <div>
              <h3 className="text-2xl font-medium mb-4">
                {language === "en" ? "Who I Am" : "Ben Kimim"}
              </h3>
              <div className="space-y-4 text-foreground/80">
                <p>
                  {language === "en"
                    ? "I'm a passionate full-stack developer with over 6 years of experience in creating web and mobile applications. I specialize in React, Node.js, and modern JavaScript frameworks."
                    : "Web ve mobil uygulamalar oluşturma konusunda 6 yıldan fazla deneyime sahip tutkulu bir full-stack geliştiriciyim. React, Node.js ve modern JavaScript frameworklerinde uzmanım."}
                </p>
                <p>
                  {language === "en"
                    ? "My approach combines technical expertise with an eye for design, ensuring that the products I build are not only functional but also aesthetically pleasing and user-friendly."
                    : "Yaklaşımım, teknik uzmanlığı tasarım anlayışıyla birleştirerek, oluşturduğum ürünlerin sadece işlevsel değil, aynı zamanda estetik açıdan da hoş ve kullanıcı dostu olmasını sağlar."}
                </p>
                <p>
                  {language === "en"
                    ? "I'm constantly learning and staying up-to-date with the latest technologies and best practices in web development. I believe in writing clean, maintainable code and following principles like DRY and SOLID."
                    : "Sürekli olarak öğreniyor ve web geliştirmedeki en son teknolojiler ve en iyi uygulamalarla güncel kalıyorum. Temiz, bakımı kolay kod yazmaya ve DRY ve SOLID gibi prensipleri takip etmeye inanıyorum."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tools Section */}
      <section className="tools-section section-padding bg-muted/30">
        <div className="container-custom">
          <SectionHeading
            title={getText("about.tools", language)}
            subtitle={
              language === "en"
                ? "The tools and technologies I use daily"
                : "Günlük olarak kullandığım araçlar ve teknolojiler"
            }
            center
          />
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="tool-item flex flex-col items-center justify-center p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors text-center"
              >
                <div className="text-3xl mb-2">{tool.icon}</div>
                <span className="text-sm font-medium">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
