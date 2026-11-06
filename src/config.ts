/**
 * ============================================================
 *  CONFIGURACIÓN DE LA WEB — edita aquí todo lo que dice TODO
 * ============================================================
 */

export const marca = {
   nombre: "Invitarte", // TODO: nombre final del emprendimiento
   eslogan: "Invitaciones digitales que se viven, no solo se leen",
   /** Número de WhatsApp con código de país, sin + ni espacios. Ej: 51987654321 */
   whatsapp: "51923959816", // TODO
   correo: "cotiza@invitarte-peru.com", // TODO
   instagram: "https://instagram.com/invitarte-peru", // TODO (deja "" para ocultarlo)
   tiktok: "https://tiktok.com/invitarte-peru", // TODO (deja "" para ocultarlo)
   facebook: "https://facebook.com/invitarte-peru", // TODO (deja "" para ocultarlo)
   ciudad: "Piura, Perú",
   /** Días hábiles que tardas en entregar una invitación. */
   diasEntrega: "3 a 5",
};

/**
 * Categorías del catálogo (en este orden se muestran los botones).
 * También son los "Tipos de evento" del cotizador.
 */
export const categorias = [
   { id: "ninos", nombre: "Cumpleaños niños", icono: "🎈" },
   { id: "primer-anito", nombre: "Primer añito", icono: "🍼" },
   { id: "adultos", nombre: "Cumpleaños adultos", icono: "🥂" },
   { id: "especiales", nombre: "Cumpleaños especiales", icono: "🎂", detalle: "30, 40, 50, 60 años y más" },
   { id: "quinceaneros", nombre: "Quinceañeros", icono: "👑" },
   { id: "matrimonios", nombre: "Matrimonios", icono: "💍" },
   { id: "bautizos", nombre: "Bautizos y Primera Comunión", icono: "🕊️" },
   { id: "baby-shower", nombre: "Baby shower y revelación", icono: "🧸" },
   { id: "otros", nombre: "Otros eventos", icono: "✨", detalle: "Graduaciones, aniversarios, corporativos" },
] as const;

export type CategoriaId = (typeof categorias)[number]["id"];

/** Diseños por página en el catálogo. */
export const disenosPorPagina = { computadora: 6, celular: 4 };

export type Proyecto = {
   id: string;
   titulo: string;
   tematica: string;
   /** Una o más categorías; la primera es la principal (se usa en el cotizador). */
   categorias: CategoriaId[];
   descripcion: string;
   url: string;
   imagen: string;
   /** Colores de la tarjeta (clases de Tailwind). */
   fondo: string;
   acento: string;
   destacados: string[];
   /** Palabras extra para el buscador (personajes, sinónimos). No se muestran. */
   palabrasClave?: string[];
};

const base = "https://danielqg93.github.io";

export const proyectos: Proyecto[] = [
   {
      id: "missy",
      titulo: "Missy · Mi primer añito",
      tematica: "Conejita y flores",
      palabrasClave: ["conejo", "conejita", "bunny", "flores", "rosado", "rosa", "niña", "bebé", "elegante", "mariposas"],
      categorias: ["primer-anito"],
      descripcion:
         "Elegante y tierna, con fotos de la cumpleañera, burbujas, música de fondo y confirmación de asistencia con nombre de cada invitado.",
      url: `${base}/invitacion-misssy/`,
      imagen: "proyectos/missy.jpg",
      fondo: "bg-rosa-suave",
      acento: "text-rosa-oscuro",
      destacados: [
         "Fotos propias",
         "Lista de invitados",
         "Música",
         "Itinerario",
      ],
   },
   {
      id: "dragonball",
      titulo: "Gran Torneo de Cumpleaños",
      tematica: "Anime de guerreros",
      palabrasClave: ["dragon ball", "goku", "anime", "manga", "esferas", "superhéroe", "niño", "acción", "cómic"],
      categorias: ["ninos"],
      descripcion:
         "Estilo cómic con aura de energía, medidor de nivel de poder, credencial de luchador y un juego de 7 esferas escondidas.",
      url: `${base}/invitacion-dragonball/`,
      imagen: "proyectos/dragonball.jpg",
      fondo: "bg-sol-suave",
      acento: "text-orange-600",
      destacados: [
         "Juego de esferas",
         "Credencial",
         "Cuenta regresiva",
         "Cómic",
      ],
   },
   {
      id: "dulces",
      titulo: "Mundo de Caramelo",
      tematica: "Dulces y helados",
      palabrasClave: ["candy", "caramelo", "golosinas", "helado", "postres", "cupcake", "pastelería", "dulcería", "rosado"],
      categorias: ["ninos"],
      descripcion:
         "Chispas que caen, glaseado que gotea, boleto dorado y un juego para armar tu helado que se envía con la confirmación.",
      url: `${base}/invitacion-dulces/`,
      imagen: "proyectos/dulces.jpg",
      fondo: "bg-lila-suave",
      acento: "text-lila",
      destacados: [
         "Arma tu helado",
         "Boleto dorado",
         "Macarons",
         "Animaciones",
      ],
   },
   {
      id: "safari",
      titulo: "Expedición Safari",
      tematica: "Safari tierno",
      palabrasClave: ["animales", "selva", "jungla", "león", "jirafa", "elefante", "cebra", "wild one", "zoológico", "explorador"],
      categorias: ["primer-anito", "ninos"],
      descripcion:
         "Animalitos ilustrados, portada con parallax, pasaporte de explorador, mapa de la expedición y galería tipo polaroid.",
      url: `${base}/invitacion-safary/`,
      imagen: "proyectos/safari.jpg",
      fondo: "bg-menta-suave",
      acento: "text-menta",
      destacados: ["Pasaporte", "Parallax", "Polaroids", "Mapa"],
   },
   {
      id: "plimplim",
      titulo: "Mi 2do añito",
      tematica: "Payasito y burbujas",
      palabrasClave: ["plim plim", "payaso", "payasito", "burbujas", "nubes", "azul", "circo"],
      categorias: ["ninos"],
      descripcion:
         "Cielo azul con nubes y burbujas, colores vivos, cuenta regresiva, álbum de fotos y botón para agendar el evento.",
      url: `${base}/ivitacion-plimplim/`,
      imagen: "proyectos/plimplim.jpg",
      fondo: "bg-cielo-suave",
      acento: "text-cielo",
      destacados: ["Burbujas", "Álbum", "Agendar", "Ubicación"],
   },
];

/** Funciones que el cliente puede pedir en el cotizador. */
export const funciones = [
   "Cuenta regresiva",
   "Confirmación de asistencia (RSVP)",
   "Link personalizado por invitado",
   "Ubicación con Google Maps",
   "Música de fondo",
   "Galería de fotos",
   "Botón para agendar en el calendario",
   "Itinerario del evento",
   "Código de vestimenta",
   "Mesa de regalos / datos de Yape",
   "Mini juego interactivo",
   "Lista de confirmados para ti",
];

/** Tipos de evento del cotizador = las mismas categorías del catálogo. */
export const tiposEvento: string[] = categorias.map((c) => c.nombre);

export const nombreCategoria = (id: CategoriaId) =>
   categorias.find((c) => c.id === id)?.nombre ?? "";

export const paquetes = [
   {
      id: "esencial",
      nombre: "Esencial",
      /** Precio a mostrar, ej: "S/ 79". Déjalo "" para mostrar "A cotizar". */
      precio: "", // TODO
      descripcion: "Una plantilla de nuestro catálogo con tus datos.",
      incluye: [
         "Datos del evento",
         "Cuenta regresiva",
         "Ubicación",
         "Confirmación por WhatsApp",
      ],
   },
   {
      id: "magica",
      nombre: "Mágica",
      precio: "", // TODO
      descripcion: "Tu temática adaptada con fotos, música y RSVP.",
      incluye: [
         "Todo lo Esencial",
         "Galería de fotos",
         "Música de fondo",
         "Link por invitado",
         "Lista de confirmados",
      ],
      popular: true,
   },
   {
      id: "personalizada",
      nombre: "Personalizada",
      precio: "", // TODO
      descripcion: "Diseño desde cero con tu temática e interacciones únicas.",
      incluye: [
         "Todo lo Mágico",
         "Ilustraciones a medida",
         "Mini juego interactivo",
         "Animaciones especiales",
         "Cambios ilimitados*",
      ],
   },
];

export const preguntas = [
   {
      p: "¿Cómo reciben mis invitados la invitación?",
      r: "Te entregamos un link que compartes por WhatsApp, Instagram o donde quieras. Se abre en cualquier celular, sin descargar nada.",
   },
   {
      p: "¿Puedo pedir una temática que no está en el catálogo?",
      r: "¡Sí! Usa el cotizador, cuéntanos tu temática (personaje, colores, estilo) y te enviamos una propuesta.",
   },
   {
      p: "¿Cómo sé quién confirmó asistencia?",
      r: "Las confirmaciones llegan a una lista que tú puedes revisar. También podemos crear un link con el nombre de cada invitado.",
   },
   {
      p: "¿Cuánto tiempo tardan?",
      r: `Normalmente entre ${marca.diasEntrega} días hábiles, según la complejidad del diseño. Si tu evento es pronto, avísanos.`,
   },
   {
      p: "¿Puedo hacer cambios después de publicada?",
      r: "Sí, puedes actualizar datos como hora o lugar y el mismo link se actualiza para todos tus invitados.",
   },
   {
      p: "¿Cómo se paga?",
      r: "Aceptamos Yape, Plin y transferencia. Se separa con un adelanto y el saldo se paga al entregar.",
   },
];

export function linkWhatsApp(mensaje: string) {
   return `https://wa.me/${marca.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
