// Datos mock para el prototipo visual V0.
// Reemplazar por datos reales de Airtable en Fase 1.

export type Empresa = {
  id: string;
  nombre: string;
  sector: string;
  score: number;
  estadoPipeline: string;
  decisor: string;
  emailVerificado: "Sí" | "No" | "Dudoso";
  noContactar: boolean;
  ultimaInteraccion: string;
  motivoBloqueo?: string;
};

export type Contacto = {
  id: string;
  nombre: string;
  cargo: string;
  empresa: string;
  email: string;
  emailVerificado: "Sí" | "No" | "Dudoso" | "Pendiente";
  estadoEmail: "Válido" | "Inválido" | "Catch-all" | "Desconocido" | "Rebotado";
  score: number;
  estadoContacto: string;
  noContactar: boolean;
};

export type MensajeCola = {
  id: string;
  empresa: string;
  contacto: string;
  asunto: string;
  cuerpo: string;
  notasPersonalizacion: string;
  riskLevel: "bajo" | "medio" | "alto";
  motivoRiesgo: string;
  mentionsFundae: boolean;
  mentionsNormativa: boolean;
  accionSugerida: string;
  approvalStatus: "Pendiente" | "Aprobado" | "Editar" | "Rechazado" | "Enviado" | "Pausado";
  campana: string;
};

export type Campana = {
  id: string;
  nombre: string;
  estado: "Activa" | "Pausada" | "Borrador";
  dominioEnvio: string;
  estadoWarmup: "No iniciado" | "En warmup" | "Listo" | "Pausado" | "Problema";
  emailsEnviados: number;
  tasaRebote: number; // %
  tasaRespuesta: number; // %
  motivoPausa?: string;
  fechaInicio: string;
};

export type Oportunidad = {
  id: string;
  empresa: string;
  contactoPrincipal: string;
  necesidadDetectada: string;
  estado: string;
  reunionAgendada: boolean;
  fechaReunion?: string;
  proximoPaso: string;
  responsable: string;
};

export const empresas: Empresa[] = [
  {
    id: "emp1",
    nombre: "Gestoría Segarra SL",
    sector: "Gestoría / Asesoría",
    score: 9,
    estadoPipeline: "Validada",
    decisor: "Marta Segarra (Socia gerente)",
    emailVerificado: "Sí",
    noContactar: false,
    ultimaInteraccion: "2026-06-05",
  },
  {
    id: "emp2",
    nombre: "Construcciones Badia SL",
    sector: "Construcción / Promotora",
    score: 6,
    estadoPipeline: "En contacto",
    decisor: "Jordi Badia (Gerente)",
    emailVerificado: "Sí",
    noContactar: false,
    ultimaInteraccion: "2026-06-02",
  },
  {
    id: "emp3",
    nombre: "Inmobiliaria Ponent",
    sector: "Inmobiliaria",
    score: 7,
    estadoPipeline: "Nueva",
    decisor: "Laura Roca (Directora)",
    emailVerificado: "No",
    noContactar: false,
    ultimaInteraccion: "—",
    motivoBloqueo: "Email del decisor sin verificar",
  },
];

export const contactos: Contacto[] = [
  {
    id: "con1",
    nombre: "Marta Segarra",
    cargo: "Socia gerente",
    empresa: "Gestoría Segarra SL",
    email: "marta@gestoriasegarra.com",
    emailVerificado: "Sí",
    estadoEmail: "Válido",
    score: 9,
    estadoContacto: "Validada",
    noContactar: false,
  },
  {
    id: "con2",
    nombre: "Jordi Badia",
    cargo: "Gerente",
    empresa: "Construcciones Badia SL",
    email: "jordi.badia@construccionesbadia.es",
    emailVerificado: "Sí",
    estadoEmail: "Válido",
    score: 6,
    estadoContacto: "En contacto",
    noContactar: false,
  },
  {
    id: "con3",
    nombre: "Laura Roca",
    cargo: "Directora",
    empresa: "Inmobiliaria Ponent",
    email: "laura@inmoponent.com",
    emailVerificado: "No",
    estadoEmail: "Desconocido",
    score: 7,
    estadoContacto: "Nueva",
    noContactar: false,
  },
  {
    id: "con4",
    nombre: "Pere Mas",
    cargo: "Responsable RRHH",
    empresa: "Gestió de Serveis Sanitaris",
    email: "pmas@gss.cat",
    emailVerificado: "Dudoso",
    estadoEmail: "Catch-all",
    score: 7,
    estadoContacto: "Validada",
    noContactar: false,
  },
  {
    id: "con5",
    nombre: "Anna Vila",
    cargo: "Administración",
    empresa: "Taller Pons",
    email: "info@tallerpons.com",
    emailVerificado: "No",
    estadoEmail: "Rebotado",
    score: 2,
    estadoContacto: "Descartada",
    noContactar: true,
  },
];

export const cola: MensajeCola[] = [
  {
    id: "msg1",
    empresa: "Gestoría Segarra SL",
    contacto: "Marta Segarra",
    asunto: "Automatizar la gestión documental en Gestoría Segarra",
    cuerpo:
      "Hola Marta,\n\nHe visto que en Gestoría Segarra gestionáis un volumen alto de nóminas y declaraciones. Trabajamos con despachos de Lleida ayudándoles a automatizar tareas repetitivas con IA, sin contratar más personal.\n\n¿Te encajaría una llamada de 20 minutos esta semana para contarte cómo lo están usando empresas como la tuya? Sin compromiso.\n\nUn saludo,\nAlba",
    notasPersonalizacion: "Referencia a volumen de nóminas y al sector gestoría de Lleida.",
    riskLevel: "bajo",
    motivoRiesgo: "Mensaje estándar sin afirmaciones sensibles.",
    mentionsFundae: false,
    mentionsNormativa: false,
    accionSugerida: "Aprobar y enviar.",
    approvalStatus: "Pendiente",
    campana: "Gestorías Lleida Q2",
  },
  {
    id: "msg2",
    empresa: "Gestió de Serveis Sanitaris",
    contacto: "Pere Mas",
    asunto: "Formación en IA bonificable para vuestro equipo",
    cuerpo:
      "Hola Pere,\n\nOs ayudamos a implantar formación en IA aplicada. Dependiendo de vuestra forma jurídica y del crédito disponible, la formación podría bonificarse vía FUNDAE. Lo revisamos juntos si decidís avanzar.\n\n¿Tenéis 20 minutos esta semana?\n\nUn saludo,\nAlba",
    notasPersonalizacion: "Entidad pública — verificar forma jurídica antes de afirmar encaje FUNDAE.",
    riskLevel: "alto",
    motivoRiesgo: "Menciona FUNDAE en entidad pública sin verificación de forma jurídica confirmada.",
    mentionsFundae: true,
    mentionsNormativa: true,
    accionSugerida: "Requiere revisión de Alba antes de aprobar.",
    approvalStatus: "Pendiente",
    campana: "Entidades públicas Lleida",
  },
  {
    id: "msg3",
    empresa: "Construcciones Badia SL",
    contacto: "Jordi Badia",
    asunto: "Coordinación de obra y presupuestos con IA",
    cuerpo:
      "Hola Jordi,\n\nVi que coordináis varios proyectos a la vez. Ayudamos a constructoras a agilizar presupuestos y comunicación con clientes usando IA.\n\n¿Hablamos 20 minutos?\n\nUn saludo,\nAlba",
    notasPersonalizacion: "Ajustar tono — el contacto ya respondió una vez, hacerlo más cercano.",
    riskLevel: "medio",
    motivoRiesgo: "Pendiente de ajuste de tono solicitado.",
    mentionsFundae: false,
    mentionsNormativa: false,
    accionSugerida: "Editar antes de enviar.",
    approvalStatus: "Editar",
    campana: "Construcción Ponent",
  },
];

export const campanas: Campana[] = [
  {
    id: "cam1",
    nombre: "Gestorías Lleida Q2",
    estado: "Activa",
    dominioEnvio: "envios.iaamedida.com",
    estadoWarmup: "Listo",
    emailsEnviados: 320,
    tasaRebote: 0.8,
    tasaRespuesta: 17,
    fechaInicio: "2026-05-12",
  },
  {
    id: "cam2",
    nombre: "Entidades públicas Lleida",
    estado: "Pausada",
    dominioEnvio: "contacto.iaamedida.com",
    estadoWarmup: "Problema",
    emailsEnviados: 145,
    tasaRebote: 3.4,
    tasaRespuesta: 4,
    motivoPausa: "Tasa de rebote por encima del 2% — pausada por deliverabilidad.",
    fechaInicio: "2026-05-20",
  },
];

export const oportunidades: Oportunidad[] = [
  {
    id: "opo1",
    empresa: "Gestoría Segarra SL",
    contactoPrincipal: "Marta Segarra",
    necesidadDetectada: "Automatizar gestión documental y respuestas a clientes",
    estado: "Reunión programada",
    reunionAgendada: true,
    fechaReunion: "2026-06-12",
    proximoPaso: "Preparar demo personalizada",
    responsable: "Alba",
  },
  {
    id: "opo2",
    empresa: "Construcciones Badia SL",
    contactoPrincipal: "Jordi Badia",
    necesidadDetectada: "Agilizar presupuestos y comunicación con clientes",
    estado: "Interesada",
    reunionAgendada: false,
    proximoPaso: "Cerrar fecha de llamada",
    responsable: "Bernardo",
  },
];

// Resumen para el dashboard general.
export const resumen = {
  mensajesPendientes: cola.filter((m) => m.approvalStatus === "Pendiente").length,
  leastosListos: empresas.filter((e) => e.score >= 8 && e.emailVerificado === "Sí").length,
  leadsBloqueados: empresas.filter(
    (e) => e.noContactar || e.emailVerificado !== "Sí"
  ).length,
  interesados: oportunidades.length,
  reunionesProximas: oportunidades.filter((o) => o.reunionAgendada).length,
};

export const saludEmail = {
  emailsEnviados: campanas.reduce((sum, c) => sum + c.emailsEnviados, 0),
  rebotes: 9,
  tasaRebote: 1.9,
  tasaRespuesta: 12,
  estadoWarmup: "1 listo · 1 con problema",
  campanasActivas: campanas.filter((c) => c.estado === "Activa").length,
  campanasPausadas: campanas.filter((c) => c.estado === "Pausada").length,
};
