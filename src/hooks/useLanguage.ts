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
  'nav.news': {
    en: 'News',
    es: 'Noticias',
    pt: 'Notícias',
    zh: '新闻'
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

  // Service Cards - Data Compliance
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
  'service.data-compliance.details': {
    en: 'Our data compliance services include comprehensive data mapping, privacy impact assessments, GDPR compliance audits, data retention policy development, and ongoing monitoring systems. We help organizations establish robust data governance frameworks that protect both business interests and individual privacy rights.',
    es: 'Nuestros servicios de cumplimiento de datos incluyen mapeo integral de datos, evaluaciones de impacto de privacidad, auditorías de cumplimiento GDPR, desarrollo de políticas de retención de datos y sistemas de monitoreo continuo. Ayudamos a las organizaciones a establecer marcos sólidos de gobernanza de datos que protejan tanto los intereses comerciales como los derechos de privacidad individual.',
    pt: 'Nossos serviços de conformidade de dados incluem mapeamento abrangente de dados, avaliações de impacto de privacidade, auditorias de conformidade GDPR, desenvolvimento de políticas de retenção de dados e sistemas de monitoramento contínuo. Ajudamos organizações a estabelecer estruturas robustas de governança de dados que protegem tanto interesses comerciais quanto direitos de privacidade individual.',
    zh: '我们的数据合规服务包括全面的数据映射、隐私影响评估、GDPR合规审计、数据保留政策制定和持续监控系统。我们帮助组织建立强大的数据治理框架，保护商业利益和个人隐私权。'
  },
  'service.data-compliance.benefits': {
    en: '• Reduced legal risks and potential fines • Enhanced customer trust and brand reputation • Streamlined data processes and governance • Competitive advantage through compliance excellence • Peace of mind with expert guidance',
    es: '• Reducción de riesgos legales y multas potenciales • Mayor confianza del cliente y reputación de marca • Procesos de datos optimizados y gobernanza • Ventaja competitiva a través de la excelencia en cumplimiento • Tranquilidad con orientación experta',
    pt: '• Riscos legais reduzidos e multas potenciais • Maior confiança do cliente e reputação da marca • Processos de dados simplificados e governança • Vantagem competitiva através da excelência em conformidade • Tranquilidade com orientação especializada',
    zh: '• 降低法律风险和潜在罚款 • 增强客户信任和品牌声誉 • 简化数据流程和治理 • 通过合规卓越获得竞争优势 • 专家指导带来的安心'
  },

  // Service Cards - Human Rights
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
  'service.human-rights.details': {
    en: 'We conduct thorough human rights due diligence assessments, supply chain audits, workplace compliance reviews, and stakeholder engagement processes. Our team helps organizations identify, prevent, and mitigate adverse human rights impacts while building sustainable business practices.',
    es: 'Realizamos evaluaciones exhaustivas de debida diligencia en derechos humanos, auditorías de cadena de suministro, revisiones de cumplimiento laboral y procesos de participación de partes interesadas. Nuestro equipo ayuda a las organizaciones a identificar, prevenir y mitigar impactos adversos en derechos humanos mientras construyen prácticas comerciales sostenibles.',
    pt: 'Conduzimos avaliações completas de due diligence em direitos humanos, auditorias de cadeia de suprimentos, revisões de conformidade no local de trabalho e processos de engajamento de stakeholders. Nossa equipe ajuda organizações a identificar, prevenir e mitigar impactos adversos aos direitos humanos enquanto constroem práticas comerciais sustentáveis.',
    zh: '我们进行全面的人权尽职调查评估、供应链审计、工作场所合规审查和利益相关者参与流程。我们的团队帮助组织识别、预防和减轻不利的人权影响，同时建立可持续的商业实践。'
  },
  'service.human-rights.benefits': {
    en: '• Enhanced corporate reputation and stakeholder trust • Reduced operational and reputational risks • Improved employee satisfaction and retention • Stronger supplier relationships • Compliance with international standards',
    es: '• Mayor reputación corporativa y confianza de las partes interesadas • Reducción de riesgos operacionales y reputacionales • Mejor satisfacción y retención de empleados • Relaciones más sólidas con proveedores • Cumplimiento con estándares internacionales',
    pt: '• Reputação corporativa aprimorada e confiança dos stakeholders • Riscos operacionais e reputacionais reduzidos • Maior satisfação e retenção de funcionários • Relacionamentos mais fortes com fornecedores • Conformidade com padrões internacionais',
    zh: '• 增强企业声誉和利益相关者信任 • 降低运营和声誉风险 • 提高员工满意度和留存率 • 加强供应商关系 • 符合国际标准'
  },

  // Service Cards - Software Contracts
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
  'service.software-contracts.details': {
    en: 'Our software contract services cover SaaS agreements, licensing terms, end-user agreements, API terms of service, data processing agreements, and intellectual property protection. We ensure your software business is legally protected while maintaining user-friendly terms.',
    es: 'Nuestros servicios de contratos de software cubren acuerdos SaaS, términos de licencia, acuerdos de usuario final, términos de servicio de API, acuerdos de procesamiento de datos y protección de propiedad intelectual. Aseguramos que su negocio de software esté legalmente protegido mientras mantiene términos amigables para el usuario.',
    pt: 'Nossos serviços de contratos de software cobrem acordos SaaS, termos de licenciamento, acordos de usuário final, termos de serviço de API, acordos de processamento de dados e proteção de propriedade intelectual. Garantimos que seu negócio de software esteja legalmente protegido mantendo termos amigáveis ao usuário.',
    zh: '我们的软件合同服务涵盖SaaS协议、许可条款、最终用户协议、API服务条款、数据处理协议和知识产权保护。我们确保您的软件业务在法律上受到保护，同时保持用户友好的条款。'
  },
  'service.software-contracts.benefits': {
    en: '• Comprehensive IP protection and licensing clarity • Reduced legal disputes and liability exposure • Streamlined contract negotiation processes • Enhanced business relationships and trust • Scalable legal framework for growth',
    es: '• Protección integral de PI y claridad en licencias • Reducción de disputas legales y exposición a responsabilidades • Procesos de negociación de contratos optimizados • Relaciones comerciales mejoradas y confianza • Marco legal escalable para el crecimiento',
    pt: '• Proteção abrangente de PI e clareza de licenciamento • Disputas legais reduzidas e exposição à responsabilidade • Processos de negociação de contratos simplificados • Relacionamentos comerciais aprimorados e confiança • Estrutura legal escalável para crescimento',
    zh: '• 全面的知识产权保护和许可清晰度 • 减少法律纠纷和责任风险 • 简化合同谈判流程 • 增强商业关系和信任 • 可扩展的增长法律框架'
  },

  // Service Cards - Legal Advisory
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
  'service.legal-advisory.details': {
    en: 'We provide strategic legal counsel on emerging technologies, AI governance, blockchain regulations, cybersecurity compliance, cross-border data transfers, and digital transformation initiatives. Our expertise helps technology companies navigate regulatory landscapes while fostering innovation.',
    es: 'Proporcionamos asesoría legal estratégica sobre tecnologías emergentes, gobernanza de IA, regulaciones blockchain, cumplimiento de ciberseguridad, transferencias de datos transfronterizas e iniciativas de transformación digital. Nuestra experiencia ayuda a las empresas de tecnología a navegar por paisajes regulatorios mientras fomentan la innovación.',
    pt: 'Fornecemos consultoria jurídica estratégica sobre tecnologias emergentes, governança de IA, regulamentações blockchain, conformidade de cibersegurança, transferências de dados transfronteiriças e iniciativas de transformação digital. Nossa expertise ajuda empresas de tecnologia a navegar por paisagens regulatórias enquanto promovem inovação.',
    zh: '我们就新兴技术、AI治理、区块链法规、网络安全合规、跨境数据传输和数字化转型举措提供战略法律咨询。我们的专业知识帮助技术公司在促进创新的同时应对监管环境。'
  },
  'service.legal-advisory.benefits': {
    en: '• Strategic guidance for technology innovation • Proactive risk management and compliance • Competitive advantage through legal expertise • Streamlined regulatory approval processes • Future-proof legal strategies',
    es: '• Orientación estratégica para la innovación tecnológica • Gestión proactiva de riesgos y cumplimiento • Ventaja competitiva a través de experiencia legal • Procesos de aprobación regulatoria optimizados • Estrategias legales a prueba de futuro',
    pt: '• Orientação estratégica para inovação tecnológica • Gestão proativa de riscos e conformidade • Vantagem competitiva através de expertise jurídica • Processos de aprovação regulatória simplificados • Estratégias jurídicas à prova de futuro',
    zh: '• 技术创新的战略指导 • 主动风险管理和合规 • 通过法律专业知识获得竞争优势 • 简化监管审批流程 • 面向未来的法律策略'
  },

  // Service Cards - Data Privacy
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
  'service.data-privacy.details': {
    en: 'We develop comprehensive privacy policies, cookie policies, terms of service, data subject rights procedures, privacy by design frameworks, and consent management systems. Our approach ensures transparency while protecting your business interests and user privacy.',
    es: 'Desarrollamos políticas de privacidad integrales, políticas de cookies, términos de servicio, procedimientos de derechos del sujeto de datos, marcos de privacidad por diseño y sistemas de gestión de consentimiento. Nuestro enfoque asegura transparencia mientras protege sus intereses comerciales y la privacidad del usuario.',
    pt: 'Desenvolvemos políticas de privacidade abrangentes, políticas de cookies, termos de serviço, procedimentos de direitos do titular dos dados, estruturas de privacidade por design e sistemas de gestão de consentimento. Nossa abordagem garante transparência enquanto protege seus interesses comerciais e privacidade do usuário.',
    zh: '我们制定全面的隐私政策、cookie政策、服务条款、数据主体权利程序、隐私设计框架和同意管理系统。我们的方法确保透明度，同时保护您的商业利益和用户隐私。'
  },
  'service.data-privacy.benefits': {
    en: '• Enhanced user trust and brand credibility • Regulatory compliance across jurisdictions • Reduced privacy-related legal risks • Improved data governance and transparency • Competitive advantage through privacy leadership',
    es: '• Mayor confianza del usuario y credibilidad de marca • Cumplimiento regulatorio en todas las jurisdicciones • Reducción de riesgos legales relacionados con privacidad • Mejor gobernanza de datos y transparencia • Ventaja competitiva a través del liderazgo en privacidad',
    pt: '• Maior confiança do usuário e credibilidade da marca • Conformidade regulatória em todas as jurisdições • Riscos legais relacionados à privacidade reduzidos • Governança de dados e transparência aprimoradas • Vantagem competitiva através da liderança em privacidade',
    zh: '• 增强用户信任和品牌可信度 • 跨司法管辖区的监管合规 • 降低隐私相关法律风险 • 改善数据治理和透明度 • 通过隐私领导力获得竞争优势'
  },

  // Service Cards - Training
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
  'service.training.details': {
    en: 'Our training programs cover data protection awareness, privacy impact assessments, incident response procedures, compliance best practices, and regulatory updates. We offer customized workshops, e-learning modules, and ongoing support to build a compliance-conscious organization.',
    es: 'Nuestros programas de capacitación cubren conciencia sobre protección de datos, evaluaciones de impacto de privacidad, procedimientos de respuesta a incidentes, mejores prácticas de cumplimiento y actualizaciones regulatorias. Ofrecemos talleres personalizados, módulos de e-learning y soporte continuo para construir una organización consciente del cumplimiento.',
    pt: 'Nossos programas de treinamento cobrem conscientização sobre proteção de dados, avaliações de impacto de privacidade, procedimentos de resposta a incidentes, melhores práticas de conformidade e atualizações regulatórias. Oferecemos workshops personalizados, módulos de e-learning e suporte contínuo para construir uma organização consciente da conformidade.',
    zh: '我们的培训项目涵盖数据保护意识、隐私影响评估、事件响应程序、合规最佳实践和监管更新。我们提供定制研讨会、电子学习模块和持续支持，以建立具有合规意识的组织。'
  },
  'service.training.benefits': {
    en: '• Improved compliance culture and awareness • Reduced human error and security incidents • Enhanced employee confidence and competence • Streamlined compliance processes • Ongoing support and updates',
    es: '• Mejor cultura de cumplimiento y conciencia • Reducción de errores humanos e incidentes de seguridad • Mayor confianza y competencia de empleados • Procesos de cumplimiento optimizados • Soporte continuo y actualizaciones',
    pt: '• Cultura de conformidade e conscientização aprimoradas • Erro humano e incidentes de segurança reduzidos • Confiança e competência de funcionários aprimoradas • Processos de conformidade simplificados • Suporte contínuo e atualizações',
    zh: '• 改善合规文化和意识 • 减少人为错误和安全事件 • 增强员工信心和能力 • 简化合规流程 • 持续支持和更新'
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

  // Team Collaborators Section
  'team.collaborators.title': {
    en: 'Our Team & External Collaborators',
    es: 'Nuestro Equipo y Colaboradores Externos',
    pt: 'Nossa Equipe e Colaboradores Externos',
    zh: '我们的团队和外部合作者'
  },
  'team.collaborators.subtitle': {
    en: 'Core team and external consultants working together for comprehensive solutions',
    es: 'Equipo principal y consultores externos trabajando juntos para soluciones integrales',
    pt: 'Equipe principal e consultores externos trabalhando juntos para soluções abrangentes',
    zh: '核心团队和外部顾问共同合作提供全面解决方案'
  },

  // Collaborators
  'collaborator.andrea.name': {
    en: 'Mg. Andrea Cuellar Camarena',
    es: 'Mg. Andrea Cuellar Camarena',
    pt: 'Mg. Andrea Cuellar Camarena',
    zh: '安德烈亚·奎拉尔·卡马雷纳硕士'
  },
  'collaborator.andrea.area': {
    en: 'Gender Studies & Equality',
    es: 'Estudios de Género e Igualdad',
    pt: 'Estudos de Gênero e Igualdade',
    zh: '性别研究与平等'
  },

  'collaborator.silvina.name': {
    en: 'Lic. Silvina Fernanda Yosia',
    es: 'Lic. Silvina Fernanda Yosia',
    pt: 'Lic. Silvina Fernanda Yosia',
    zh: '西尔维娜·费尔南达·约西亚学士'
  },
  'collaborator.silvina.area': {
    en: 'Forensic Psychology',
    es: 'Psicología Forense',
    pt: 'Psicologia Forense',
    zh: '法医心理学'
  },

  'collaborator.jose.name': {
    en: 'Mg. José Ignacio Agostini',
    es: 'Mg. José Ignacio Agostini',
    pt: 'Mg. José Ignacio Agostini',
    zh: '何塞·伊格纳西奥·阿戈斯蒂尼硕士'
  },
  'collaborator.jose.area': {
    en: 'Labor & Relations Law',
    es: 'Derecho Laboral y de Relaciones',
    pt: 'Direito do Trabalho e Relações',
    zh: '劳动与关系法'
  },

  'collaborator.jhonatan.name': {
    en: 'Mg. Jhonatan S. Peña Carlos',
    es: 'Mg. Jhonatan S. Peña Carlos',
    pt: 'Mg. Jhonatan S. Peña Carlos',
    zh: '约纳坦·S·佩尼亚·卡洛斯硕士'
  },
  'collaborator.jhonatan.area': {
    en: 'Corporate Negotiation & Applied Neuroscience',
    es: 'Negociación Corporativa y Neurociencia Aplicada',
    pt: 'Negociação Corporativa e Neurociência Aplicada',
    zh: '企业谈判与应用神经科学'
  },

  'collaborator.dulce.name': {
    en: 'Lic. Dulce Alejandra Hernández Vargas',
    es: 'Lic. Dulce Alejandra Hernández Vargas',
    pt: 'Lic. Dulce Alejandra Hernández Vargas',
    zh: '杜尔塞·亚历杭德拉·埃尔南德斯·巴尔加斯学士'
  },
  'collaborator.dulce.area': {
    en: 'Business Administration Specialist in Management',
    es: 'Especialista en Administración de Empresas en Gestión',
    pt: 'Especialista em Administração de Empresas em Gestão',
    zh: '管理专业的商务管理专家'
  },

  'collaborator.carolina.name': {
    en: 'Mg. María Carolina Estepa Becerra',
    es: 'Mg. María Carolina Estepa Becerra',
    pt: 'Mg. María Carolina Estepa Becerra',
    zh: '玛丽亚·卡罗琳娜·埃斯特帕·贝塞拉硕士'
  },
  'collaborator.carolina.area': {
    en: 'Strategic Litigation in Inter-American Court & Commission on Human Rights',
    es: 'Litigio Estratégico en la Corte y Comisión Interamericana de Derechos Humanos',
    pt: 'Litigância Estratégica na Corte e Comissão Interamericana de Direitos Humanos',
    zh: '美洲人权法院和委员会的战略诉讼'
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
  },

  // News Section
  'news.back': {
    en: 'Back',
    es: 'Volver',
    pt: 'Voltar',
    zh: '返回'
  },
  'news.subtitle': {
    en: 'Stay updated with the latest developments in AI, compliance, and technology',
    es: 'Mantente actualizado con los últimos desarrollos en IA, cumplimiento y tecnología',
    pt: 'Mantenha-se atualizado com os últimos desenvolvimentos em IA, conformidade e tecnologia',
    zh: '了解AI、合规和技术的最新发展'
  },
  'news.category.all': {
    en: 'All',
    es: 'Todos',
    pt: 'Todos',
    zh: '全部'
  },
  'news.category.ai': {
    en: 'AI',
    es: 'IA',
    pt: 'IA',
    zh: 'AI'
  },
  'news.category.compliance': {
    en: 'Compliance',
    es: 'Cumplimiento',
    pt: 'Conformidade',
    zh: '合规'
  },
  'news.category.tech': {
    en: 'Technology',
    es: 'Tecnología',
    pt: 'Tecnologia',
    zh: '技术'
  },
  'news.loadMore': {
    en: 'Load More Articles',
    es: 'Cargar Más Artículos',
    pt: 'Carregar Mais Artigos',
    zh: '加载更多文章'
  },

  // News Articles
  'news.ai.gdpr-compliance': {
    en: 'AI and GDPR Compliance: New Guidelines for 2025',
    es: 'IA y Cumplimiento GDPR: Nuevas Directrices para 2025',
    pt: 'IA e Conformidade GDPR: Novas Diretrizes para 2025',
    zh: 'AI与GDPR合规：2025年新指南'
  },
  'news.ai.gdpr-compliance.desc': {
    en: 'European regulators release comprehensive guidelines for AI systems compliance with GDPR, focusing on data minimization and algorithmic transparency.',
    es: 'Los reguladores europeos publican directrices integrales para el cumplimiento de sistemas de IA con GDPR, enfocándose en minimización de datos y transparencia algorítmica.',
    pt: 'Reguladores europeus lançam diretrizes abrangentes para conformidade de sistemas de IA com GDPR, focando em minimização de dados e transparência algorítmica.',
    zh: '欧洲监管机构发布AI系统GDPR合规综合指南，重点关注数据最小化和算法透明度。'
  },
  'news.compliance.data-protection': {
    en: 'Global Data Protection Trends: What Companies Need to Know',
    es: 'Tendencias Globales de Protección de Datos: Lo que las Empresas Necesitan Saber',
    pt: 'Tendências Globais de Proteção de Dados: O que as Empresas Precisam Saber',
    zh: '全球数据保护趋势：企业需要了解的内容'
  },
  'news.compliance.data-protection.desc': {
    en: 'Analysis of emerging data protection regulations worldwide and their impact on multinational corporations and cross-border data transfers.',
    es: 'Análisis de las regulaciones emergentes de protección de datos a nivel mundial y su impacto en corporaciones multinacionales y transferencias de datos transfronterizas.',
    pt: 'Análise de regulamentações emergentes de proteção de dados mundialmente e seu impacto em corporações multinacionais e transferências de dados transfronteiriças.',
    zh: '分析全球新兴数据保护法规及其对跨国公司和跨境数据传输的影响。'
  },
  'news.tech.blockchain-regulations': {
    en: 'Blockchain Technology Regulations: A Comprehensive Overview',
    es: 'Regulaciones de Tecnología Blockchain: Una Visión Integral',
    pt: 'Regulamentações de Tecnologia Blockchain: Uma Visão Abrangente',
    zh: '区块链技术法规：全面概述'
  },
  'news.tech.blockchain-regulations.desc': {
    en: 'Latest developments in blockchain regulations across different jurisdictions and their implications for businesses adopting distributed ledger technologies.',
    es: 'Últimos desarrollos en regulaciones blockchain en diferentes jurisdicciones y sus implicaciones para empresas que adoptan tecnologías de libro mayor distribuido.',
    pt: 'Últimos desenvolvimentos em regulamentações blockchain em diferentes jurisdições e suas implicações para empresas que adotam tecnologias de livro-razão distribuído.',
    zh: '不同司法管辖区区块链法规的最新发展及其对采用分布式账本技术的企业的影响。'
  },
  'news.ai.ethics-framework': {
    en: 'Building Ethical AI: New Framework for Responsible Development',
    es: 'Construyendo IA Ética: Nuevo Marco para Desarrollo Responsable',
    pt: 'Construindo IA Ética: Nova Estrutura para Desenvolvimento Responsável',
    zh: '构建道德AI：负责任开发的新框架'
  },
  'news.ai.ethics-framework.desc': {
    en: 'Industry leaders collaborate to establish comprehensive ethical guidelines for AI development, addressing bias, fairness, and accountability in machine learning systems.',
    es: 'Líderes de la industria colaboran para establecer directrices éticas integrales para el desarrollo de IA, abordando sesgo, equidad y responsabilidad en sistemas de aprendizaje automático.',
    pt: 'Líderes da indústria colaboram para estabelecer diretrizes éticas abrangentes para desenvolvimento de IA, abordando viés, equidade e responsabilidade em sistemas de aprendizado de máquina.',
    zh: '行业领导者合作建立AI开发的综合道德准则，解决机器学习系统中的偏见、公平性和问责制问题。'
  },
  'news.compliance.human-rights': {
    en: 'Human Rights Due Diligence in the Digital Age',
    es: 'Debida Diligencia en Derechos Humanos en la Era Digital',
    pt: 'Due Diligence de Direitos Humanos na Era Digital',
    zh: '数字时代的人权尽职调查'
  },
  'news.compliance.human-rights.desc': {
    en: 'New standards for human rights impact assessments in technology companies, focusing on algorithmic decision-making and digital surveillance practices.',
    es: 'Nuevos estándares para evaluaciones de impacto en derechos humanos en empresas tecnológicas, enfocándose en toma de decisiones algorítmica y prácticas de vigilancia digital.',
    pt: 'Novos padrões para avaliações de impacto de direitos humanos em empresas de tecnologia, focando em tomada de decisões algorítmicas e práticas de vigilância digital.',
    zh: '技术公司人权影响评估的新标准，重点关注算法决策和数字监控实践。'
  },
  'news.tech.cybersecurity-trends': {
    en: 'Cybersecurity Trends 2025: Preparing for Next-Gen Threats',
    es: 'Tendencias de Ciberseguridad 2025: Preparándose para Amenazas de Nueva Generación',
    pt: 'Tendências de Cibersegurança 2025: Preparando-se para Ameaças de Nova Geração',
    zh: '2025年网络安全趋势：为下一代威胁做准备'
  },
  'news.tech.cybersecurity-trends.desc': {
    en: 'Emerging cybersecurity challenges and solutions, including AI-powered attacks, quantum computing threats, and zero-trust architecture implementations.',
    es: 'Desafíos y soluciones emergentes de ciberseguridad, incluyendo ataques potenciados por IA, amenazas de computación cuántica e implementaciones de arquitectura de confianza cero.',
    pt: 'Desafios e soluções emergentes de cibersegurança, incluindo ataques alimentados por IA, ameaças de computação quântica e implementações de arquitetura de confiança zero.',
    zh: '新兴网络安全挑战和解决方案，包括AI驱动的攻击、量子计算威胁和零信任架构实施。'
  },

  // News specific translations
  'news.title': {
    en: 'Latest News',
    es: 'Últimas Noticias',
    pt: 'Últimas Notícias',
    zh: '最新新闻'
  },
  'news.loading': {
    en: 'Loading today\'s news...',
    es: 'Cargando noticias de hoy...',
    pt: 'Carregando notícias de hoje...',
    zh: '正在加载今日新闻...'
  },
  'news.noArticles': {
    en: 'No articles found for this category.',
    es: 'No se encontraron artículos para esta categoría.',
    pt: 'Nenhum artigo encontrado para esta categoria.',
    zh: '未找到此类别的文章。'
  },
  'news.noMore': {
    en: 'No more articles to load',
    es: 'No hay más artículos para cargar',
    pt: 'Não há mais artigos para carregar',
    zh: '没有更多文章可加载'
  }
};

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize language from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('certainty-language');
      if (saved && ['en', 'es', 'pt', 'zh'].includes(saved)) {
        setCurrentLanguage(saved as Language);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage when language changes
  useEffect(() => {
    if (typeof window !== 'undefined' && isInitialized) {
      localStorage.setItem('certainty-language', currentLanguage);
    }
  }, [currentLanguage, isInitialized]);

  const t = (key: string): string => {
    return translations[key]?.[currentLanguage] || key;
  };

  const changeLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    // Force immediate re-render by triggering a state change
    if (typeof window !== 'undefined') {
      localStorage.setItem('certainty-language', lang);
    }
  };

  return {
    currentLanguage,
    changeLanguage,
    t,
    isInitialized
  };
};

export const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' }
];