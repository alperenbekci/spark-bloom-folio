
type TranslationKey = string;

interface Translations {
  [key: string]: {
    [key: TranslationKey]: string;
  };
}

// Define translations
const translations: Translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    
    // Home page
    'home.title': 'Creative Developer & Designer',
    'home.subtitle': 'I build beautiful digital experiences that delight users',
    'home.cta': 'View My Work',
    'home.contact': 'Get in Touch',
    
    // About page
    'about.title': 'About Me',
    'about.subtitle': 'My journey as a developer',
    'about.intro': 'I\'m a full-stack developer and designer with a passion for creating elegant, efficient solutions to complex problems.',
    'about.skills': 'My Skills',
    'about.tools': 'Tools & Technologies',
    
    // Projects page
    'projects.title': 'My Projects',
    'projects.subtitle': 'Selected works',
    'projects.viewAll': 'View All Projects',
    'projects.viewDetails': 'View Details',
    
    // Blog page
    'blog.title': 'Blog',
    'blog.subtitle': 'Thoughts and tutorials',
    'blog.readMore': 'Read More',
    
    // Contact page
    'contact.title': 'Contact Me',
    'contact.subtitle': 'Let\'s work together',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.success': 'Message sent successfully!',
    'contact.error': 'Error sending message. Please try again.',
  },
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.about': 'Hakkımda',
    'nav.projects': 'Projeler',
    'nav.blog': 'Blog',
    'nav.contact': 'İletişim',
    
    // Home page
    'home.title': 'Yaratıcı Geliştirici & Tasarımcı',
    'home.subtitle': 'Kullanıcıları mutlu eden güzel dijital deneyimler geliştiriyorum',
    'home.cta': 'Çalışmalarımı Gör',
    'home.contact': 'İletişime Geç',
    
    // About page
    'about.title': 'Hakkımda',
    'about.subtitle': 'Bir geliştirici olarak yolculuğum',
    'about.intro': 'Karmaşık sorunlara zarif ve verimli çözümler üretme tutkusuna sahip bir full-stack geliştirici ve tasarımcıyım.',
    'about.skills': 'Yeteneklerim',
    'about.tools': 'Araçlar & Teknolojiler',
    
    // Projects page
    'projects.title': 'Projelerim',
    'projects.subtitle': 'Seçilmiş çalışmalar',
    'projects.viewAll': 'Tüm Projeleri Gör',
    'projects.viewDetails': 'Detayları Gör',
    
    // Blog page
    'blog.title': 'Blog',
    'blog.subtitle': 'Düşünceler ve öğreticiler',
    'blog.readMore': 'Daha Fazla Oku',
    
    // Contact page
    'contact.title': 'İletişim',
    'contact.subtitle': 'Birlikte çalışalım',
    'contact.name': 'İsim',
    'contact.email': 'E-posta',
    'contact.message': 'Mesaj',
    'contact.send': 'Mesaj Gönder',
    'contact.success': 'Mesaj başarıyla gönderildi!',
    'contact.error': 'Mesaj gönderilirken hata oluştu. Lütfen tekrar deneyin.',
  },
};

// Helper function to get text
export function getText(key: TranslationKey, language: 'en' | 'tr'): string {
  return translations[language][key] || key;
}
