import { useState } from "react";
import { Contacto, Cotizador } from "./components/Formularios";
import { Portafolio } from "./components/Portafolio";
import { Celular, IconoWhatsApp, Seccion } from "./components/ui";
import { extras, linkWhatsApp, marca, paquetes, preguntas, proyectos } from "./config";

const img = (ruta: string) => `${import.meta.env.BASE_URL}${ruta}`;

export default function App() {
   // Temática y tipo de evento elegidos desde un diseño; "n" fuerza la actualización aunque se repitan.
   const [tematica, setTematica] = useState<{ valor: string; tipo?: string; paquete?: string; n: number }>({ valor: "", n: 0 });

   const irACotizar = (valor: string, tipo?: string, paquete?: string) => {
      setTematica((t) => ({ valor, tipo, paquete, n: t.n + 1 }));
      document.getElementById("cotiza")?.scrollIntoView({ behavior: "smooth" });
   };

   return (
      <>
         <Cabecera />
         <main>
            <Portada />
            <Pasos />
            <Portafolio onCotizar={irACotizar} />
            <Incluye />
            <Paquetes onCotizar={() => irACotizar("")} />
            <Cotizador tematicaInicial={tematica} />
            <Preguntas />
            <Contacto />
         </main>
         <Pie />
         <WhatsAppFlotante />
      </>
   );
}

function Logo() {
   return (
      <a href="#inicio" className="flex items-center" aria-label={`${marca.nombre} - inicio`}>
         <img src={img("logo/logo-combinado-simple.svg")} alt={marca.nombre} className="h-12 w-auto" />
      </a>
   );
}

const enlaces = [
   { href: "#disenos", texto: "Diseños" },
   { href: "#incluye", texto: "Qué incluye" },
   { href: "#paquetes", texto: "Paquetes" },
   { href: "#preguntas", texto: "Preguntas" },
   { href: "#contacto", texto: "Contacto" },
];

function Cabecera() {
   const [menu, setMenu] = useState(false);
   return (
      <header className="sticky top-0 z-40 border-b border-tinta/5 bg-crema/85 backdrop-blur-md">
         <div className="contenedor flex h-16 items-center justify-between gap-4">
            <Logo />
            <nav className="hidden items-center gap-6 font-semibold md:flex">
               {enlaces.map((e) => (
                  <a key={e.href} href={e.href} className="text-tinta/70 hover:text-rosa">
                     {e.texto}
                  </a>
               ))}
               <a href="#cotiza" className="btn-rosa px-5 py-2">
                  Cotizar
               </a>
            </nav>
            <button
               type="button"
               className="grid h-11 w-11 place-items-center rounded-xl text-2xl md:hidden"
               onClick={() => setMenu(!menu)}
               aria-label="Abrir menú"
               aria-expanded={menu}
            >
               {menu ? "✕" : "☰"}
            </button>
         </div>
         {menu && (
            <nav className="contenedor flex flex-col gap-1 pb-4 font-semibold md:hidden">
               {[...enlaces, { href: "#cotiza", texto: "Cotiza tu invitación" }].map((e) => (
                  <a key={e.href} href={e.href} onClick={() => setMenu(false)} className="rounded-xl px-3 py-3 hover:bg-white">
                     {e.texto}
                  </a>
               ))}
            </nav>
         )}
      </header>
   );
}

function Confeti() {
   const colores = ["#F0568A", "#FFC93C", "#3FB894", "#4A9BEA", "#9B7BEA"];
   return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
         {Array.from({ length: 18 }, (_, i) => (
            <span
               key={i}
               className="absolute top-0 block h-3 w-2 animate-caer rounded-sm opacity-70"
               style={{
                  left: `${(i * 37) % 100}%`,
                  background: colores[i % colores.length],
                  animationDuration: `${9 + (i % 5) * 2}s`,
                  animationDelay: `-${i * 1.3}s`,
               }}
            />
         ))}
      </div>
   );
}

function Portada() {
   const [a, b, c] = [proyectos[1], proyectos[0], proyectos[3]];
   return (
      <section id="inicio" className="relative overflow-hidden pb-20 pt-10 sm:pt-16">
         <Confeti />
         <div className="contenedor relative grid items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
               <span className="etiqueta bg-sol-suave text-orange-700">✨ Invitaciones digitales interactivas</span>
               <h1 className="mt-5 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
                  La invitación que <span className="text-rosa">todos abren</span> y nadie olvida
               </h1>
               <p className="mx-auto mt-5 max-w-xl text-lg text-tinta/70 lg:mx-0">
                  Diseñamos invitaciones web con tu temática favorita: cuenta regresiva, confirmación de asistencia,
                  música, fotos, ubicación y hasta juegos. Se comparten con un link por WhatsApp.
               </p>
               <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                  <a href="#cotiza" className="btn-rosa py-4 text-lg">
                     Cotiza tu invitación
                  </a>
                  <a href="#disenos" className="btn-borde py-4 text-lg">
                     Ver diseños
                  </a>
               </div>
               <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-tinta/60 lg:justify-start">
                  <li>✓ Lista en {marca.diasEntrega} días</li>
                  <li>✓ 100% personalizada</li>
                  <li>✓ Funciona en cualquier celular</li>
               </ul>
            </div>

            <div className="relative mx-auto h-[440px] w-full max-w-md sm:h-[520px]">
               <Celular className="absolute left-0 top-12 aspect-[400/820] w-[42%] -rotate-[8deg]">
                  <img src={img(a.imagen)} alt="" className="h-full w-full object-cover object-top" />
               </Celular>
               <Celular className="absolute right-0 top-12 aspect-[400/820] w-[42%] rotate-[8deg]">
                  <img src={img(c.imagen)} alt="" className="h-full w-full object-cover object-top" />
               </Celular>
               <div className="absolute left-1/4 top-0 z-10 w-[50%]">
                  <Celular className="aspect-[400/820] w-full animate-flotar">
                     <img src={img(b.imagen)} alt="Ejemplo de invitación digital" className="h-full w-full object-cover object-top" />
                  </Celular>
               </div>
            </div>
         </div>
      </section>
   );
}

function Pasos() {
   const pasos = [
      { e: "💬", t: "Nos cuentas tu idea", d: "Temática, colores, fecha y datos del evento desde el cotizador." },
      { e: "🎨", t: "Diseñamos tu invitación", d: "Te mostramos un avance y hacemos los ajustes que necesites." },
      { e: "🔗", t: "Recibes tu link", d: "Lo compartes por WhatsApp o redes y ves quién confirma." },
      { e: "🎉", t: "¡A celebrar!", d: "Tus invitados llegan con la ubicación, la hora y la emoción lista." },
   ];
   return (
      <section className="bg-white py-16">
         <div className="contenedor grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pasos.map((p, i) => (
               <div key={p.t} className="relative rounded-3xl bg-crema p-6">
                  <span className="absolute right-5 top-4 font-titulo text-5xl font-bold text-tinta/5">{i + 1}</span>
                  <div className="text-4xl" aria-hidden="true">
                     {p.e}
                  </div>
                  <h3 className="mt-3 text-lg font-bold">{p.t}</h3>
                  <p className="mt-1 text-sm text-tinta/70">{p.d}</p>
               </div>
            ))}
         </div>
      </section>
   );
}

function Incluye() {
   const items = [
      { e: "⏳", t: "Cuenta regresiva", d: "Días, horas y minutos para el gran día." },
      { e: "✅", t: "Confirmación de asistencia", d: "Tus invitados confirman y tú ves la lista." },
      { e: "💌", t: "Link por invitado", d: "Cada invitado ve su nombre al abrir la invitación." },
      { e: "📍", t: "Ubicación", d: "Botón directo a Google Maps o Waze." },
      { e: "🎵", t: "Música de fondo", d: "La canción favorita del festejado." },
      { e: "📸", t: "Galería de fotos", d: "Álbum, polaroids o carrusel con tus fotos." },
      { e: "📅", t: "Agendar evento", d: "Se guarda en el calendario con un toque." },
      { e: "🎮", t: "Mini juegos", d: "Esferas escondidas, arma tu helado y más." },
   ];
   return (
      <Seccion
         id="incluye"
         etiqueta="Qué incluye"
         titulo="Mucho más que una imagen por WhatsApp"
         subtitulo="Cada invitación es una mini página web con todo lo que tus invitados necesitan saber."
         className="bg-white"
      >
         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((it) => (
               <div key={it.t} className="rounded-3xl border-2 border-tinta/5 p-6 transition hover:border-rosa/30 hover:bg-rosa-suave/40">
                  <div className="text-3xl" aria-hidden="true">
                     {it.e}
                  </div>
                  <h3 className="mt-3 font-bold">{it.t}</h3>
                  <p className="mt-1 text-sm text-tinta/70">{it.d}</p>
               </div>
            ))}
         </div>
      </Seccion>
   );
}

function Paquetes({ onCotizar }: { onCotizar: () => void }) {
   return (
      <Seccion
         id="paquetes"
         etiqueta="Paquetes"
         titulo="Elige cómo quieres tu invitación"
         subtitulo="Todos los paquetes se pueden ajustar. Si no sabes cuál elegir, te ayudamos."
      >
         <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {paquetes.map((p) => (
               <div
                  key={p.id}
                  className={`relative flex flex-col rounded-[2rem] p-7 ${
                     "popular" in p && p.popular ? "bg-tinta text-white shadow-2xl md:-translate-y-3" : "bg-white"
                  }`}
               >
                  {"popular" in p && p.popular && (
                     <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sol px-4 py-1 text-xs font-bold uppercase text-tinta">
                        Más pedido
                     </span>
                  )}
                  <h3 className="text-2xl font-bold">{p.nombre}</h3>
                  <p className="mt-1 text-sm opacity-70">{p.descripcion}</p>
                  <p className="mt-5 font-titulo font-bold">
                     {p.precio && p.desde && <span className="mr-1.5 text-base font-semibold opacity-70">desde</span>}
                     <span className="text-4xl">{p.precio || "A cotizar"}</span>
                  </p>
                  {p.precio && p.precioEspecial && (
                     <p className="mt-1 text-xs opacity-60">
                        Quinceañeros y matrimonios: {p.desde ? "desde " : ""}
                        {p.precioEspecial}
                     </p>
                  )}
                  <ul className="mt-5 flex-1 space-y-2 text-sm">
                     {p.incluye.map((i) => (
                        <li key={i} className="flex gap-2">
                           <span className="text-menta">✓</span>
                           {i}
                        </li>
                     ))}
                  </ul>
                  <button type="button" onClick={onCotizar} className="btn-rosa mt-7">
                     Cotizar {p.nombre}
                  </button>
                  {p.diasActiva > 0 && (
                     <p className="mt-3 text-center text-xs opacity-70">
                        🗓️ Web activa {p.diasActiva} días después del evento
                     </p>
                  )}
               </div>
            ))}
         </div>
         <p className="mt-6 text-center text-xs text-tinta/50">
            Precios en soles. Quinceañeros y matrimonios tienen más secciones (padrinos, itinerario, mesa de regalos).
            <br />
            *Cambios dentro del diseño acordado.
         </p>

         {extras.length > 0 && (
            <div className="mx-auto mt-14 max-w-5xl">
               <h3 className="text-center text-2xl font-bold">Extras para tu invitación</h3>
               <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {extras.map((x) => (
                     <li key={x.nombre} className="flex items-center gap-3 rounded-2xl bg-white p-4">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-crema text-xl" aria-hidden="true">
                           {x.icono}
                        </span>
                        <span className="flex-1 text-sm font-semibold leading-snug">{x.nombre}</span>
                        <span className="shrink-0 font-titulo font-bold text-rosa">{x.precio}</span>
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </Seccion>
   );
}

function Preguntas() {
   return (
      <Seccion id="preguntas" etiqueta="Preguntas frecuentes" titulo="Resolvemos tus dudas" className="bg-white">
         <div className="mx-auto max-w-3xl space-y-3">
            {preguntas.map((q) => (
               <details key={q.p} className="group rounded-2xl bg-crema p-5 open:bg-rosa-suave/50">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-titulo text-lg font-semibold">
                     {q.p}
                     <span className="text-2xl text-rosa transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-tinta/75">{q.r}</p>
               </details>
            ))}
         </div>
      </Seccion>
   );
}

function Pie() {
   return (
      <footer className="bg-tinta py-10 text-white/70">
         <div className="contenedor flex flex-col items-center justify-between gap-4 text-center text-sm sm:flex-row sm:text-left">
            <img src={img("logo/logo-combinado-blanco.svg")} alt={marca.nombre} className="h-20 w-auto" />
            <p>{marca.eslogan}</p>
            <p>
               © {new Date().getFullYear()} {marca.nombre}
            </p>
         </div>
      </footer>
   );
}

function WhatsAppFlotante() {
   return (
      <a
         href={linkWhatsApp(`Hola ${marca.nombre} 👋 Quiero información sobre las invitaciones digitales.`)}
         target="_blank"
         rel="noreferrer"
         aria-label="Escríbenos por WhatsApp"
         className="fixed bottom-5 right-5 z-40 grid h-16 w-16 place-items-center rounded-full bg-wsp text-white shadow-xl shadow-wsp/40 transition hover:scale-110"
      >
         <span className="absolute inset-0 animate-ping rounded-full bg-wsp opacity-30" />
         <IconoWhatsApp className="relative h-8 w-8" />
      </a>
   );
}
