import { useState, useEffect } from 'react';

export type Language = 'en' | 'es' | 'pt' | 'zh';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home',
    es: 'Inicio',
    pt: 'Início',
    zh: '首页'
  },
  'nav.services': {
    en: 'Services',
    es: 'Servicios',
    pt: 'Serviços',
    zh: '服务'
  },
  'nav.about': {
    en: 'About',
    es: 'Nosotros',
    pt: 'Sobre',
    zh: '关于'
  },
  'nav.contact': {
    en: 'Contact',
    es: 'Contacto',
    pt: 'Contato',
    zh: '联系'
  },

  // Hero Section
  'hero.title': {
    en: 'High Value in Privacy & Compliance',
    es: 'Alto Valor en Privacidad y Cumplimiento',
    pt: 'Alto Valor em Privacidade e Conformidade',
    zh: '隐私与合规的高价值'
  },
  'hero.subtitle': {
    en: 'Your trusted partner for data compliance, human rights audits, and legal protection in the digital age.',
    es: 'Su socio de confianza para el cumplimiento de datos, auditorías de derechos humanos y protección legal en la era digital.',
    pt: 'Seu parceiro confiável para conformidade de dados, auditorias de direitos humanos e proteção legal na era digital.',
    zh: '您在数字时代数据合规、人权审计和法律保护的可信合作伙伴。'
  },
  'hero.cta.primary': {
    en: 'Explore Services',
    es: 'Explorar Servicios',
    pt: 'Explorar Serviços',
    zh: '探索服务'
  },
  'hero.cta.secondary': {
    en: 'Be Compliant',
    es: 'Sea Conforme',
    pt: 'Seja Conforme',
    zh: '保持合规'
  },

  // Services Section
  'services.title': {
    en: 'Our Services',
    es: 'Nuestros Servicios',
    pt: 'Nossos Serviços',
    zh: '我们的服务'
  },
  'services.subtitle': {
    en: 'Comprehensive solutions for your compliance and legal needs',
    es: 'Soluciones integrales para sus necesidades de cumplimiento y legales',
    pt: 'Soluções abrangentes para suas necessidades de conformidade e legais',
    zh: '为您的合规和法律需求提供全面解决方案'
  },

  // Service Cards
  'service.data-compliance.title': {
    en: 'Data Compliance & Quality Audits',
    es: 'Auditorías de Cumplimiento y Calidad de Datos',
    pt: 'Auditorias de Conformidade e Qualidade de Dados',
    zh: '数据合规与质量审计'
  },
  'service.data-compliance.description': {
    en: 'Elevate your data integrity with our comprehensive audits. We ensure your information meets and exceeds legal standards.',
    es: 'Eleve la integridad de sus datos con nuestras auditorías integrales. Aseguramos que su información cumpla y supere los estándares legales.',
    pt: 'Eleve a integridade dos seus dados com nossas auditorias abrangentes. Garantimos que suas informações atendam e superem os padrões legais.',
    zh: '通过我们全面的审计提升您的数据完整性。我们确保您的信息符合并超越法律标准。'
  },

  'service.human-rights.title': {
    en: 'Human Rights & Compliance Audits',
    es: 'Auditorías de Derechos Humanos y Cumplimiento',
    pt: 'Auditorias de Direitos Humanos e Conformidade',
    zh: '人权与合规审计'
  },
  'service.human-rights.description': {
    en: 'Champion ethical business practices with our human rights compliance audits. Navigate complex regulations with confidence.',
    es: 'Defienda prácticas comerciales éticas con nuestras auditorías de cumplimiento de derechos humanos. Navegue por regulaciones complejas con confianza.',
    pt: 'Defenda práticas comerciais éticas com nossas auditorias de conformidade de direitos humanos. Navegue por regulamentações complexas com confiança.',
    zh: '通过我们的人权合规审计倡导道德商业实践。自信地应对复杂法规。'
  },

  'service.software-contracts.title': {
    en: 'Software Contracts & Licensing',
    es: 'Contratos de Software y Licencias',
    pt: 'Contratos de Software e Licenciamento',
    zh: '软件合同与许可'
  },
  'service.software-contracts.description': {
    en: 'Safeguard your digital assets with expert contract crafting. Protect your intellectual property with robust agreements.',
    es: 'Proteja sus activos digitales con la elaboración experta de contratos. Proteja su propiedad intelectual con acuerdos sólidos.',
    pt: 'Proteja seus ativos digitais com elaboração especializada de contratos. Proteja sua propriedade intelectual com acordos robustos.',
    zh: '通过专业合同制定保护您的数字资产。用强有力的协议保护您的知识产权。'
  },

  'service.legal-advisory.title': {
    en: 'Legal Advisory in Tech & Data',
    es: 'Asesoría Legal en Tecnología y Datos',
    pt: 'Consultoria Jurídica em Tecnologia e Dados',
    zh: '技术与数据法律咨询'
  },
  'service.legal-advisory.description': {
    en: 'Navigate the complex intersection of technology and law with our specialized advisory services.',
    es: 'Navegue por la compleja intersección de la tecnología y la ley con nuestros servicios de asesoría especializados.',
    pt: 'Navegue pela complexa interseção de tecnologia e direito com nossos serviços de consultoria especializados.',
    zh: '通过我们的专业咨询服务应对技术与法律的复杂交集。'
  },

  'service.data-privacy.title': {
    en: 'Data Privacy & Privacy Policies',
    es: 'Privacidad de Datos y Políticas de Privacidad',
    pt: 'Privacidade de Dados e Políticas de Privacidade',
    zh: '数据隐私与隐私政策'
  },
  'service.data-privacy.description': {
    en: 'Build trust with ironclad privacy protection. Our tailored policies ensure regulatory compliance.',
    es: 'Construya confianza con protección de privacidad sólida. Nuestras políticas personalizadas aseguran el cumplimiento regulatorio.',
    pt: 'Construa confiança com proteção de privacidade sólida. Nossas políticas personalizadas garantem conformidade regulatória.',
    zh: '通过坚实的隐私保护建立信任。我们的定制政策确保法规合规。'
  },

  'service.training.title': {
    en: 'Training & Awareness Initiatives',
    es: 'Iniciativas de Capacitación y Concientización',
    pt: 'Iniciativas de Treinamento e Conscientização',
    zh: '培训与意识提升计划'
  },
  'service.training.description': {
    en: 'Empower your team with knowledge. Transform compliance from a checklist to a culture.',
    es: 'Empodere a su equipo con conocimiento. Transforme el cumplimiento de una lista de verificación a una cultura.',
    pt: 'Capacite sua equipe com conhecimento. Transforme conformidade de uma lista de verificação para uma cultura.',
    zh: '用知识赋能您的团队。将合规从清单转变为文化。'
  },

  // Team Section
  'team.title': {
    en: 'Our Expert Team',
    es: 'Nuestro Equipo Experto',
    pt: 'Nossa Equipe Especializada',
    zh: '我们的专家团队'
  },
  'team.subtitle': {
    en: 'Meet the professionals dedicated to your compliance success',
    es: 'Conozca a los profesionales dedicados a su éxito en cumplimiento',
    pt: 'Conheça os profissionais dedicados ao seu sucesso em conformidade',
    zh: '认识致力于您合规成功的专业人士'
  },

  // Team Members
  'team.estefania.name': {
    en: 'Dr. Estefanía Cuello',
    es: 'Dra. Estefanía Cuello',
    pt: 'Dra. Estefanía Cuello',
    zh: '埃斯特法尼亚·奎洛博士'
  },
  'team.estefania.role': {
    en: 'Geopolitical & Legal Compliance Advisor',
    es: 'Asesora Geopolítica y de Cumplimiento Legal',
    pt: 'Consultora em Conformidade Geopolítica e Legal',
    zh: '地缘政治与法律合规顾问'
  },

  'team.ariel.name': {
    en: 'Dr. Ariel Onnis',
    es: 'Dr. Ariel Onnis',
    pt: 'Dr. Ariel Onnis',
    zh: '阿里尔·奥尼斯博士'
  },
  'team.ariel.role': {
    en: 'Legal Tech & Data Compliance',
    es: 'Tecnología Legal y Cumplimiento de Datos',
    pt: 'Tecnologia Jurídica e Conformidade de Dados',
    zh: '法律技术与数据合规'
  },

  'team.flor.name': {
    en: 'Mg. Flor Vargas',
    es: 'Mg. Flor Vargas',
    pt: 'Mg. Flor Vargas',
    zh: '弗洛尔·巴尔加斯硕士'
  },
  'team.flor.role': {
    en: 'Human Rights Audits Specialist',
    es: 'Especialista en Auditorías de Derechos Humanos',
    pt: 'Especialista em Auditorias de Direitos Humanos',
    zh: '人权审计专家'
  },

  // Contact Section
  'contact.title': {
    en: 'Get in Touch',
    es: 'Póngase en Contacto',
    pt: 'Entre em Contato',
    zh: '联系我们'
  },
  'contact.subtitle': {
    en: 'Ready to ensure your compliance? Let\'s discuss your needs.',
    es: '¿Listo para asegurar su cumplimiento? Discutamos sus necesidades.',
    pt: 'Pronto para garantir sua conformidade? Vamos discutir suas necessidades.',
    zh: '准备确保您的合规性？让我们讨论您的需求。'
  },
  'contact.cta': {
    en: 'Contact Us',
    es: 'Contáctanos',
    pt: 'Contate-nos',
    zh: '联系我们'
  },

  // Footer
  'footer.description': {
    en: 'Your legal and data compliance advisor, ensuring your business stays protected and aligned with regulations.',
    es: 'Su asesor legal y de cumplimiento de datos, asegurando que su negocio se mantenga protegido y alineado con las regulaciones.',
    pt: 'Seu consultor jurídico e de conformidade de dados, garantindo que seu negócio permaneça protegido e alinhado com as regulamentações.',
    zh: '您的法律和数据合规顾问，确保您的业务受到保护并符合法规。'
  },
  'footer.links': {
    en: 'Useful Links',
    es: 'Enlaces Útiles',
    pt: 'Links Úteis',
    zh: '有用链接'
  },
  'footer.legal': {
    en: 'Legal',
    es: 'Legal',
    pt: 'Legal',
    zh: '法律'
  },
  'footer.contact': {
    en: 'Contact Us',
    es: 'Contáctanos',
    pt: 'Contate-nos',
    zh: '联系我们'
  },
  'footer.rights': {
    en: 'All rights reserved.',
    es: 'Todos los derechos reservados.',
    pt: 'Todos os direitos reservados.',
    zh: '版权所有。'
  }
};

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('certainty-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('certainty-language', currentLanguage);
  }, [currentLanguage]);

  const t = (key: string): string => {
    return translations[key]?.[currentLanguage] || key;
  };

  const changeLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  return {
    currentLanguage,
    changeLanguage,
    t
  };
};

export const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' }
];