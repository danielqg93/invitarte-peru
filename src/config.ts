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
   /** Paquete que muestra este diseño (id de `paquetes`). Opcional. */
   paquete?: "esencial" | "magica" | "personalizada";
};

/** Demos del motor de temas (proyecto invitarte-demos), publicadas en invitarte-peru.com/demos/. */
const demos = `${import.meta.env.BASE_URL}demos`;

export const proyectos: Proyecto[] = [
   {
      id: "conejita",
      titulo: "Conejita en Flor",
      tematica: "Conejita y flores",
      paquete: "personalizada",
      palabrasClave: ["conejo", "conejita", "bunny", "flores", "rosado", "rosa", "niña", "bebé", "elegante", "mariposas", "nubes", "torta", "vela", "primer año", "juego"],
      categorias: ["primer-anito"],
      descripcion:
         "Tierna y elegante para el primer añito: ilustraciones animadas, 7 portadas a elegir, contenido que aparece al hacer scroll y el juego \"Sopla la velita\".",
      url: `${demos}/conejita/`,
      imagen: "proyectos/conejita.jpg",
      fondo: "bg-rosa-suave",
      acento: "text-rosa-oscuro",
      destacados: [
         "Sopla la velita",
         "Ilustraciones animadas",
         "Galería de fotos",
         "Música",
      ],
   },
   {
      id: "dragonball",
      titulo: "Gran Torneo de Cumpleaños",
      tematica: "Anime de guerreros",
      paquete: "personalizada",
      palabrasClave: ["dragon ball", "goku", "shenlong", "anime", "manga", "esferas", "superhéroe", "niño", "acción", "cómic"],
      categorias: ["ninos"],
      descripcion:
         "Estilo cómic con la foto del cumpleañero y Goku, Shenlong, música de Dragon Ball, medidor de nivel de poder, credencial de luchador y un juego de 7 esferas escondidas.",
      url: `${demos}/dragonball/`,
      imagen: "proyectos/dragonball.jpg",
      fondo: "bg-sol-suave",
      acento: "text-orange-600",
      destacados: [
         "Foto en portada",
         "Juego de esferas",
         "Música",
         "Credencial",
      ],
   },
   {
      id: "dulces",
      titulo: "Mundo de Caramelo",
      tematica: "Dulces y helados",
      paquete: "personalizada",
      palabrasClave: ["candy", "caramelo", "golosinas", "helado", "postres", "cupcake", "pastelería", "dulcería", "rosado"],
      categorias: ["ninos"],
      descripcion:
         "Foto de la cumpleañera en una dona gigante, 4 bienvenidas (caramelo, frasco, boleto dorado, cupcake), música de Mundo de Caramelo, galería de fotos, animaciones al bajar y un juego para armar tu helado.",
      url: `${demos}/dulces/`,
      imagen: "proyectos/dulces.jpg",
      fondo: "bg-lila-suave",
      acento: "text-lila",
      destacados: [
         "Arma tu helado",
         "4 bienvenidas",
         "3 portadas",
         "Música",
         "Galería",
      ],
   },
   {
      id: "safari",
      titulo: "Expedición Safari",
      tematica: "Safari tierno",
      paquete: "magica",
      palabrasClave: ["animales", "selva", "jungla", "león", "jirafa", "elefante", "cebra", "wild one", "zoológico", "explorador"],
      categorias: ["primer-anito", "ninos"],
      descripcion:
         "Animalitos ilustrados, 5 portadas (jeep, noche, foto, letrero y sabana), 5 bienvenidas, música de fondo, pasaporte de explorador, mapa de la expedición y galería tipo polaroid.",
      url: `${demos}/safari/`,
      imagen: "proyectos/safari.jpg",
      fondo: "bg-menta-suave",
      acento: "text-menta",
      destacados: ["Jeep animado", "5 portadas", "Música", "Polaroids"],
   },
   {
      id: "plimplim",
      titulo: "Mi 2do añito",
      tematica: "Payasito y burbujas",
      paquete: "esencial",
      palabrasClave: ["plim plim", "mei li", "payaso", "payasito", "burbujas", "nubes", "arcoíris", "globos", "azul", "circo"],
      categorias: ["ninos"],
      descripcion:
         "Plim Plim y Mei Li entre nubes, burbujas y arcoíris. Elige 1 de 4 bienvenidas y 1 de 4 portadas, con cuenta regresiva y confirmación por WhatsApp.",
      url: `${demos}/plimplim/`,
      imagen: "proyectos/plimplim.jpg",
      fondo: "bg-cielo-suave",
      acento: "text-cielo",
      destacados: ["Cuenta regresiva", "Ubicación", "Agendar", "Confirmación"],
   },
   {
      id: "boda",
      titulo: "Jardín Botánico",
      tematica: "Boda elegante en jardín",
      paquete: "personalizada",
      palabrasClave: ["boda", "matrimonio", "casamiento", "novios", "aros", "anillos", "jardín", "flores", "margaritas", "elegante", "verde", "religioso", "civil"],
      categorias: ["matrimonios"],
      descripcion:
         "Invitación personalizada con el nombre, los pases y la mesa de cada invitado, y un QR de ingreso que se escanea en la entrada para validar la invitación. Sobre con sello de lacre, lluvia de pétalos, juego \"Raspa y descubre la fecha\" y panel para enviar cada link por WhatsApp.",
      /** Abre con un invitado de ejemplo para mostrar la invitación personalizada. */
      url: `${demos}/boda/#WWCCN2ER`,
      imagen: "proyectos/boda.jpg",
      fondo: "bg-menta-suave",
      acento: "text-menta",
      destacados: ["Pase por invitado", "Mesa y QR de ingreso", "Check-in con escáner", "Envío por WhatsApp"],
   },
   {
      id: "bodas-de-madera",
      titulo: "Bodas de Madera",
      tematica: "Renovación de votos · 5 años",
      paquete: "magica",
      palabrasClave: ["renovación de votos", "renovacion", "aniversario", "bodas de madera", "5 años", "cinco años", "aniversario de bodas", "matrimonio", "esposos", "árbol", "madera", "rústico", "cristiano", "evangélico", "anillos", "cofre"],
      categorias: ["matrimonios"],
      descripcion:
         "Un árbol crece con hojas de corazón y, al abrirla, los corazones vuelan. Cinco años en cinco anillos, cuenta regresiva y deseos para la pareja.",
      url: `${demos}/bodas-de-madera/`,
      imagen: "proyectos/bodas-de-madera.jpg",
      fondo: "bg-sol-suave",
      acento: "text-orange-700",
      destacados: ["Árbol de corazones", "5 años en anillos", "Pase por invitado", "Música cristiana"],
   },
   {
      id: "princesa-sapo",
      titulo: "Una Noche en el Bayou",
      tematica: "La princesa y el sapo",
      paquete: "personalizada",
      palabrasClave: ["princesa", "sapo", "rana", "tiana", "princesa y el sapo", "beso", "pantano", "bayou", "naveen", "louis", "caimán", "luciérnagas", "nueva orleans", "jazz", "verde", "dorado", "quince", "xv", "15 años"],
      categorias: ["quinceaneros"],
      descripcion:
         "Noche en el bayou con la princesa, el sapo y el caimán ilustrados. 6 bienvenidas (foto de la quinceañera, la princesa en el nenúfar, beso al sapo, estrella de los deseos…), 5 portadas (polaroid, libro de cuentos, el bayou…), lluvia de pétalos, \"Ya Llegaré\" de fondo, juego \"Raspa la fecha\", buzón de deseos, pase con mesa y QR de ingreso, y panel para enviar cada link por WhatsApp.",
      /** Abre con un invitado de ejemplo para mostrar la invitación personalizada. */
      url: `${demos}/princesa-sapo/#X4HTM6YZ`,
      imagen: "proyectos/princesa-sapo.jpg",
      fondo: "bg-menta-suave",
      acento: "text-menta",
      destacados: ["6 bienvenidas", "Mesa y QR de ingreso", "Música de la película", "Check-in con escáner"],
   },
   {
      id: "baby-shower",
      titulo: "Entre Nubes y Globos",
      tematica: "Baby shower pastel",
      paquete: "magica",
      palabrasClave: ["baby shower", "bebé", "bebe", "globos", "nubes", "pastel", "osito", "ropita", "pañales", "quiniela", "niña", "niño", "rosa", "celeste"],
      categorias: ["baby-shower"],
      descripcion:
         "Nubes y globos en tonos pastel; el invitado abre un sobre con sello de huellitas y ve sus fotos en polaroids. Incluye quiniela del bebé y mesa de regalos.",
      url: `${demos}/baby-shower/`,
      imagen: "proyectos/baby-shower.jpg",
      fondo: "bg-rosa-suave",
      acento: "text-rosa-oscuro",
      destacados: ["5 bienvenidas", "4 portadas", "Quiniela del bebé", "Mesa de regalos"],
   },
   {
      id: "revelacion-jefe",
      titulo: "¿Jefe o Jefa?",
      tematica: "Bebé jefe de oficina",
      paquete: "personalizada",
      palabrasClave: ["revelación", "revelacion", "género", "gender reveal", "baby boss", "bebé jefazo", "jefe", "jefa", "oficina", "niño o niña", "team", "votación"],
      categorias: ["baby-shower"],
      descripcion:
         "El bebé convoca a una junta directiva: expediente confidencial, votación Team Jefe o Team Jefa, pistas y sobre sellado.",
      url: `${demos}/revelacion-jefe/`,
      imagen: "proyectos/revelacion-jefe.jpg",
      fondo: "bg-cielo-suave",
      acento: "text-cielo",
      destacados: ["Votación", "Pistas", "Sobre sellado", "Gafete VIP"],
   },
   {
      id: "bautizo",
      titulo: "Luz y Bendición",
      tematica: "Bautizo en marfil y dorado",
      paquete: "magica",
      palabrasClave: ["bautizo", "bautismo", "bebé", "vela", "paloma", "olivo", "religioso", "iglesia", "padrinos", "bendición", "niño", "niña", "dorado"],
      categorias: ["bautizos"],
      descripcion:
         "Marfil, dorado y ramas de olivo; el invitado enciende la vela para abrirla. Incluye padrinos, programa y libro de bendiciones.",
      url: `${demos}/bautizo/`,
      imagen: "proyectos/bautizo.jpg",
      fondo: "bg-sol-suave",
      acento: "text-orange-600",
      destacados: ["Vela interactiva", "Libro de bendiciones", "Padrinos", "Galería"],
   },
   {
      id: "primera-comunion",
      titulo: "Las Puertas del Templo",
      tematica: "Primera Comunión",
      paquete: "magica",
      palabrasClave: ["primera comunión", "comunion", "comunión", "cáliz", "iglesia", "templo", "vitral", "religioso", "catequesis", "padrinos", "niña", "niño", "dorado"],
      categorias: ["bautizos"],
      descripcion:
         "El invitado abre las puertas del templo bajo un vitral. Incluye misa y celebración, padrinos y velas encendidas por los invitados.",
      url: `${demos}/primera-comunion/`,
      imagen: "proyectos/primera-comunion.jpg",
      fondo: "bg-rosa-suave",
      acento: "text-rosa-oscuro",
      destacados: ["Puertas que se abren", "Velas de oración", "Padrinos", "Galería"],
   },
   {
      id: "50-anios",
      titulo: "Medio Siglo",
      tematica: "Art déco negro y dorado",
      paquete: "personalizada",
      palabrasClave: ["50 años", "cincuenta", "medio siglo", "cumpleaños adulto", "elegante", "negro", "dorado", "art déco", "gatsby", "champán", "brindis", "gala", "40", "60"],
      categorias: ["especiales", "adultos"],
      descripcion:
         "Negro y dorado art déco; el invitado brinda para abrirla. Medio siglo en números, historia por décadas y pase VIP.",
      url: `${demos}/50-anios/`,
      imagen: "proyectos/50-anios.jpg",
      fondo: "bg-sol-suave",
      acento: "text-orange-600",
      destacados: ["Brindis animado", "Historia por décadas", "Pase VIP", "Deja tu brindis"],
   },
   {
      id: "guerreras-kpop",
      titulo: "Gira de las Guerreras K-pop",
      tematica: "Concierto K-pop de neón",
      paquete: "personalizada",
      palabrasClave: ["kpop", "k-pop", "kpop demon hunters", "guerreras kpop", "idol", "idols", "concierto", "corea", "coreano", "neón", "lightstick", "bts", "blackpink", "huntrix", "niña", "adolescente", "morado", "rosado"],
      categorias: ["ninos"],
      descripcion:
         "Concierto de neón bajo la luna; el invitado rasga su entrada para abrirla y elige el color de su lightstick, que cambia toda la invitación.",
      url: `${demos}/guerreras-kpop/`,
      imagen: "proyectos/guerreras-kpop.jpg",
      fondo: "bg-lila-suave",
      acento: "text-lila",
      destacados: ["Entrada para rasgar", "Lightstick", "Setlist", "Pide tu canción"],
   },

   /* ---------- Motor de temas (invitarte-demos) ---------- */
   {
      id: "retro",
      titulo: "Aventura Retro",
      tematica: "Videojuego retro 8 bits",
      paquete: "personalizada",
      palabrasClave: ["mario", "super mario", "mario bros", "luigi", "nintendo", "videojuego", "gamer", "pixel", "monedas", "8 bits", "arcade"],
      categorias: ["ninos"],
      descripcion:
         "Mundo de plataformas en pixel art, monedas que giran, música chiptune original y un mini juego para juntar monedas.",
      url: `${demos}/retro/`,
      imagen: "proyectos/retro.jpg",
      fondo: "bg-cielo-suave",
      acento: "text-cielo",
      destacados: ["Mini juego", "Pixel art", "Música 8 bits", "Link por invitado"],
   },
   {
      id: "bloques",
      titulo: "Mundo de Bloques",
      tematica: "Bloques y construcción",
      paquete: "personalizada",
      palabrasClave: ["minecraft", "mine", "creeper", "steve", "bloques", "cubos", "pico", "diamantes", "gemas", "construir", "gamer", "videojuego"],
      categorias: ["ninos"],
      descripcion:
         "Paisaje de cubos, cofre del tesoro y un mini juego para picar bloques y encontrar las gemas escondidas.",
      url: `${demos}/bloques/`,
      imagen: "proyectos/bloques.jpg",
      fondo: "bg-menta-suave",
      acento: "text-menta",
      destacados: ["Mini juego", "Pixel art", "Música", "Lista de confirmados"],
   },
   {
      id: "heroe",
      titulo: "Héroe de la Ciudad",
      tematica: "Superhéroes de cómic",
      paquete: "personalizada",
      palabrasClave: ["spiderman", "spider-man", "hombre araña", "araña", "telaraña", "superhéroe", "marvel", "avengers", "héroe", "cómic", "ciudad"],
      categorias: ["ninos"],
      descripcion:
         "Estilo cómic con telarañas, ciudad de noche, explosiones ¡POW! y un mini juego para atrapar robots traviesos.",
      url: `${demos}/heroe/`,
      imagen: "proyectos/heroe.jpg",
      fondo: "bg-rosa-suave",
      acento: "text-rosa-oscuro",
      destacados: ["Mini juego", "Estilo cómic", "Confeti", "Música"],
   },
   {
      id: "aloha",
      titulo: "Aloha Tropical",
      tematica: "Playa hawaiana",
      paquete: "magica",
      palabrasClave: ["stitch", "lilo", "lilo y stitch", "hawai", "hawaiana", "aloha", "playa", "surf", "tropical", "ohana", "luau", "verano"],
      categorias: ["ninos", "adultos"],
      descripcion:
         "Palmeras, hibiscos y olas animadas, con melodía tropical, galería de fotos y pases por invitado.",
      url: `${demos}/aloha/`,
      imagen: "proyectos/aloha.jpg",
      fondo: "bg-cielo-suave",
      acento: "text-cielo",
      destacados: ["Olas animadas", "Música", "Galería", "Link por invitado"],
   },
   {
      id: "hielo",
      titulo: "Reino de Hielo",
      tematica: "Castillo de hielo",
      paquete: "magica",
      palabrasClave: ["frozen", "elsa", "anna", "olaf", "princesa", "hielo", "nieve", "invierno", "copos", "castillo", "reino"],
      categorias: ["ninos"],
      descripcion:
         "Castillo de cristal, copos de nieve que caen y una aurora suave, con melodía de caja musical y galería.",
      url: `${demos}/hielo/`,
      imagen: "proyectos/hielo.jpg",
      fondo: "bg-lila-suave",
      acento: "text-lila",
      destacados: ["Nieve animada", "Música", "Galería", "Lista de confirmados"],
   },
   {
      id: "juguetes",
      titulo: "Mundo de Juguetes",
      tematica: "Juguetes clásicos",
      paquete: "magica",
      palabrasClave: ["toy story", "woody", "buzz", "buzz lightyear", "jessie", "juguetes", "vaquero", "astronauta", "cohete", "pixar"],
      categorias: ["ninos", "primer-anito"],
      descripcion:
         "Baúl de juguetes, cohete, sombrero vaquero y cubos ABC bajo un cielo de nubes, con música y galería.",
      url: `${demos}/juguetes/`,
      imagen: "proyectos/juguetes.jpg",
      fondo: "bg-sol-suave",
      acento: "text-orange-600",
      destacados: ["Ilustraciones", "Música", "Galería", "Link por invitado"],
   },
   {
      id: "cachorros",
      titulo: "Cachorros Rescatistas",
      tematica: "Perritos rescatistas",
      paquete: "esencial",
      palabrasClave: ["paw patrol", "patrulla canina", "chase", "marshall", "skye", "rubble", "perritos", "cachorros", "perros", "rescate", "bomberos", "policía"],
      categorias: ["ninos"],
      descripcion:
         "Perritos con pañuelo de rescate, placa con huellita y huellas flotando. Simple, tierna y lista en poco tiempo.",
      url: `${demos}/cachorros/`,
      imagen: "proyectos/cachorros.jpg",
      fondo: "bg-cielo-suave",
      acento: "text-cielo",
      destacados: ["Cuenta regresiva", "Ubicación", "Agendar", "Confirmación"],
   },
   {
      id: "glam",
      titulo: "Glam Rosa Kawaii",
      tematica: "Moda rosa y kawaii",
      paquete: "esencial",
      palabrasClave: ["barbie", "hello kitty", "kitty", "rosado", "rosa", "glam", "fashion", "moda", "kawaii", "gatita", "muñeca", "princesa", "brillos"],
      categorias: ["ninos"],
      descripcion:
         "Brillos, moños, tacones y una gatita kawaii con corona de flores, en tonos rosados y dorados.",
      url: `${demos}/glam/`,
      imagen: "proyectos/glam.jpg",
      fondo: "bg-rosa-suave",
      acento: "text-rosa-oscuro",
      destacados: ["Cuenta regresiva", "Ubicación", "Agendar", "Confirmación"],
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

/**
 * false = oculta todos los precios (paquetes, extras, etiquetas del catálogo
 * y cotizador). Los precios de abajo se conservan para volver a mostrarlos.
 */
export const mostrarPrecios = false;

export const paquetes = [
   {
      id: "esencial",
      nombre: "Esencial",
      /** Precio a mostrar, ej: "S/ 49". Déjalo "" para mostrar "A cotizar". */
      precio: "S/ 49",
      /** true muestra "desde" antes del precio. */
      desde: false,
      /** Precio para quinceañeros y matrimonios. Déjalo "" para ocultarlo. */
      precioEspecial: "S/ 69",
      /** Días que la web sigue activa después del día del evento. */
      diasActiva: 7,
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
      precio: "S/ 89",
      desde: false,
      precioEspecial: "S/ 109",
      diasActiva: 15,
      descripcion: "Tu temática adaptada con fotos, música y RSVP.",
      incluye: [
         "Todo lo Esencial",
         "Galería de fotos",
         "Música de fondo",
         "Links personalizados por invitado",
         "Lista de confirmados",
         "Contenido que aparece al hacer scroll",
      ],
      popular: true,
   },
   {
      id: "personalizada",
      nombre: "Personalizada",
      precio: "S/ 189",
      desde: true,
      precioEspecial: "S/ 249",
      diasActiva: 30,
      descripcion: "Diseño desde cero con tu temática e interacciones únicas.",
      incluye: [
         "Todo lo Mágico",
         "Ilustraciones a medida",
         "Mini juego interactivo",
         "Animaciones especiales",
         "Mesa y pase con QR por invitado",
         "Check-in con escáner en la entrada",
         "Cambios ilimitados*",
      ],
   },
];

/** Servicios adicionales que se muestran bajo los paquetes. Deja [] para ocultarlos. */
export const extras = [
   { nombre: "Entrega urgente (menos de 48 h)", precio: "+S/ 20", icono: "⚡" },
   { nombre: "Cambios después de entregada (el primero es gratis)", precio: "S/ 15 c/u", icono: "✏️" },
   { nombre: "Mini juego interactivo en Esencial o Mágica", precio: "+S/ 25", icono: "🎮" },
];

/** Texto completo de precio para mostrar: "S/ 49" o "desde S/ 189". */
export const textoPrecio = (p: { precio: string; desde?: boolean }) =>
   mostrarPrecios && p.precio ? `${p.desde ? "desde " : ""}${p.precio}` : "A cotizar";

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
      r: "Aceptamos Yape, Plin y transferencia. Empezamos con el 50 % de adelanto y el otro 50 % se paga al entregarte el link.",
   },
];

export function linkWhatsApp(mensaje: string) {
   return `https://wa.me/${marca.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
