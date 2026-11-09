import { useEffect, useMemo, useRef, useState } from "react";
import {
   type CategoriaId,
   type Proyecto,
   categorias,
   disenosPorPagina,
   linkWhatsApp,
   nombreCategoria,
   paquetes,
   proyectos,
   mostrarPrecios,
   textoPrecio,
} from "../config";
import { Celular, IconoWhatsApp, Seccion } from "./ui";

const img = (ruta: string) => `${import.meta.env.BASE_URL}${ruta}`;

type Filtro = CategoriaId | "todos";
type OnCotizar = (tematica: string, tipoEvento?: string, paquete?: string) => void;

/** Botón "La quiero": temática, tipo de evento y paquete del diseño. */
const cotizarDiseno = (p: Proyecto, onCotizar: OnCotizar) =>
   onCotizar(p.tematica, nombreCategoria(p.categorias[0]), p.paquete);

/** Etiqueta "Paquete Mágica · S/ 89" del diseño. */
function EtiquetaPaquete({ p }: { p: Proyecto }) {
   const paq = paquetes.find((x) => x.id === p.paquete);
   if (!paq) return null;
   return (
      <span className="inline-flex w-max items-center gap-1.5 rounded-full bg-tinta px-3 py-1 text-xs font-bold text-white">
         Paquete {paq.nombre}
         {mostrarPrecios && <span className="text-sol">· {textoPrecio(paq)}</span>}
      </span>
   );
}

/* ---------- Categoría en la URL: #disenos?categoria=quinceaneros ---------- */
function leerCategoriaDeUrl(): Filtro | null {
   const [ancla, query = ""] = window.location.hash.slice(1).split("?");
   if (ancla !== "disenos") return null;
   const id = new URLSearchParams(query).get("categoria");
   return categorias.some((c) => c.id === id) ? (id as CategoriaId) : "todos";
}

function escribirCategoriaEnUrl(filtro: Filtro) {
   const hash = filtro === "todos" ? "#disenos" : `#disenos?categoria=${filtro}`;
   history.replaceState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
}

/** 6 por página en pantallas medianas/grandes, 4 en celular. */
function usePorPagina() {
   const consulta = "(min-width: 640px)";
   const calcular = () =>
      window.matchMedia(consulta).matches ? disenosPorPagina.computadora : disenosPorPagina.celular;
   const [porPagina, setPorPagina] = useState(calcular);
   useEffect(() => {
      const mq = window.matchMedia(consulta);
      const cambio = () => setPorPagina(calcular());
      mq.addEventListener("change", cambio);
      return () => mq.removeEventListener("change", cambio);
   }, []);
   return porPagina;
}

/* ---------- Buscador: sin tildes ni mayúsculas, todas las palabras deben coincidir ---------- */
const normalizar = (t: string) =>
   t
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .trim();

const textoBuscable = new Map(
   proyectos.map((p) => [
      p.id,
      normalizar(
         [
            p.tematica,
            p.titulo,
            p.descripcion,
            ...p.destacados,
            ...(p.palabrasClave ?? []),
            ...p.categorias.map(nombreCategoria),
         ].join(" "),
      ),
   ]),
);

const coincide = (p: Proyecto, busqueda: string) => {
   const palabras = normalizar(busqueda).split(/\s+/).filter(Boolean);
   const texto = textoBuscable.get(p.id) ?? "";
   return palabras.every((w) => texto.includes(w));
};

export function Portafolio({ onCotizar }: { onCotizar: OnCotizar }) {
   const [abierto, setAbierto] = useState<Proyecto | null>(null);
   const [filtro, setFiltro] = useState<Filtro>(() => leerCategoriaDeUrl() ?? "todos");
   const [busqueda, setBusqueda] = useState("");
   const [pagina, setPagina] = useState(1);
   const porPagina = usePorPagina();
   const inicioRef = useRef<HTMLDivElement>(null);

   // Si se entra con un link a una categoría, llevar la vista al catálogo.
   useEffect(() => {
      if (window.location.hash.startsWith("#disenos?")) {
         setTimeout(() => document.getElementById("disenos")?.scrollIntoView(), 100);
      }
      const alCambiarHash = () => {
         const f = leerCategoriaDeUrl();
         if (f) {
            setFiltro(f);
            setPagina(1);
         }
      };
      window.addEventListener("hashchange", alCambiarHash);
      return () => window.removeEventListener("hashchange", alCambiarHash);
   }, []);

   const buscando = busqueda.trim().length > 0;
   const encontrados = useMemo(
      () => (buscando ? proyectos.filter((p) => coincide(p, busqueda)) : proyectos),
      [busqueda, buscando],
   );

   // Los números de cada categoría reflejan la búsqueda actual.
   const conteo = useMemo(() => {
      const c: Record<string, number> = { todos: encontrados.length };
      for (const p of encontrados) for (const id of p.categorias) c[id] = (c[id] ?? 0) + 1;
      return c;
   }, [encontrados]);

   const lista = filtro === "todos" ? encontrados : encontrados.filter((p) => p.categorias.includes(filtro));
   const totalPaginas = Math.max(1, Math.ceil(lista.length / porPagina));
   const paginaActual = Math.min(pagina, totalPaginas);
   const visibles = lista.slice((paginaActual - 1) * porPagina, paginaActual * porPagina);
   const categoriaActual = categorias.find((c) => c.id === filtro);

   const elegir = (f: Filtro) => {
      setFiltro(f);
      setPagina(1);
      escribirCategoriaEnUrl(f);
   };

   const irAPagina = (n: number) => {
      setPagina(n);
      inicioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
   };

   const desde = lista.length === 0 ? 0 : (paginaActual - 1) * porPagina + 1;
   const hasta = Math.min(paginaActual * porPagina, lista.length);

   return (
      <Seccion
         id="disenos"
         etiqueta="Nuestros diseños"
         titulo="Invitaciones que tus invitados van a querer abrir"
         subtitulo="Elige el tipo de evento y toca cualquier diseño para probarlo en vivo, tal como lo verán tus invitados."
      >
         <div ref={inicioRef} className="scroll-mt-24" />

         {/* Buscador por temática */}
         <form role="search" onSubmit={(e) => e.preventDefault()} className="mx-auto mb-6 max-w-xl">
            <label htmlFor="buscar-tematica" className="sr-only">
               Buscar por temática
            </label>
            <div className="relative">
               <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl" aria-hidden="true">
                  🔍
               </span>
               <input
                  id="buscar-tematica"
                  type="search"
                  value={busqueda}
                  onChange={(e) => {
                     setBusqueda(e.target.value);
                     setPagina(1);
                  }}
                  onKeyDown={(e) => e.key === "Escape" && setBusqueda("")}
                  placeholder="Busca tu temática: safari, dulces, anime, conejita…"
                  autoComplete="off"
                  className="campo h-14 rounded-full pl-14 pr-14 text-base shadow-sm [&::-webkit-search-cancel-button]:hidden"
               />
               {buscando && (
                  <button
                     type="button"
                     onClick={() => {
                        setBusqueda("");
                        setPagina(1);
                     }}
                     aria-label="Borrar búsqueda"
                     className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-tinta/5 text-lg font-bold text-tinta/60 hover:bg-rosa-suave hover:text-rosa"
                  >
                     ✕
                  </button>
               )}
            </div>
         </form>

         {/* Categorías: en celular se deslizan de lado */}
         <div
            role="group"
            aria-label="Filtrar por tipo de evento"
            className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
         >
            <BotonCategoria activo={filtro === "todos"} onClick={() => elegir("todos")} icono="⭐" nombre="Todos" cantidad={conteo.todos} />
            {categorias.map((c) => (
               <BotonCategoria
                  key={c.id}
                  activo={filtro === c.id}
                  onClick={() => elegir(c.id)}
                  icono={c.icono}
                  nombre={c.nombre}
                  cantidad={conteo[c.id] ?? 0}
               />
            ))}
         </div>

         <p className="mb-8 text-center text-sm text-tinta/55" aria-live="polite">
            {lista.length > 0
               ? `Mostrando ${desde}–${hasta} de ${lista.length} ${lista.length === 1 ? "diseño" : "diseños"}${buscando ? ` para “${busqueda.trim()}”` : ""}`
               : " "}
            {!buscando && categoriaActual && "detalle" in categoriaActual && ` · ${categoriaActual.detalle}`}
         </p>

         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visibles.map((p) => (
               <TarjetaDiseno key={p.id} p={p} onVer={() => setAbierto(p)} onCotizar={onCotizar} />
            ))}

            {lista.length === 0 && buscando && (
               <SinResultados
                  busqueda={busqueda.trim()}
                  categoria={categoriaActual}
                  hayEnOtras={filtro !== "todos" && encontrados.length > 0}
                  onVerTodas={() => elegir("todos")}
                  onCotizar={onCotizar}
               />
            )}

            {lista.length === 0 && !buscando && categoriaActual && (
               <article className="flex flex-col items-center rounded-[2rem] border-4 border-dashed border-rosa/30 bg-white px-6 py-14 text-center sm:col-span-2 lg:col-span-3">
                  <div className="text-6xl" aria-hidden="true">
                     {categoriaActual.icono}
                  </div>
                  <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
                     Aún no publicamos diseños de {categoriaActual.nombre}
                  </h3>
                  <p className="mt-2 max-w-lg text-lg text-tinta/70">
                     ¡Lo creamos a tu medida! Cuéntanos tu idea, colores y estilo, y te enviamos una propuesta.
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                     <button type="button" onClick={() => onCotizar("", categoriaActual.nombre)} className="btn-rosa">
                        Cotizar {categoriaActual.nombre.toLowerCase()}
                     </button>
                     <a
                        href={linkWhatsApp(`Hola 👋 Quiero una invitación digital para ${categoriaActual.nombre.toLowerCase()}.`)}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-wsp"
                     >
                        <IconoWhatsApp /> Escribir por WhatsApp
                     </a>
                  </div>
               </article>
            )}
         </div>

         {totalPaginas > 1 && (
            <Paginacion actual={paginaActual} total={totalPaginas} onCambiar={irAPagina} />
         )}

         {/* Banner fijo para temáticas nuevas (fuera de la paginación) */}
         {lista.length > 0 && (
            <div className="mt-12 flex flex-col items-center gap-5 rounded-[2rem] bg-tinta p-8 text-center text-white sm:flex-row sm:p-10 sm:text-left">
               <div className="text-5xl" aria-hidden="true">
                  🎨
               </div>
               <div className="flex-1">
                  <h3 className="text-2xl font-bold">¿Tu temática no está aquí?</h3>
                  <p className="mt-1 text-white/70">
                     Personajes, colores, hobbies o lo que se te ocurra: la diseñamos a tu medida.
                  </p>
               </div>
               <button
                  type="button"
                  onClick={() => onCotizar("", categoriaActual?.nombre)}
                  className="btn-rosa shrink-0"
               >
                  Cotiza tu temática
               </button>
            </div>
         )}

         {abierto && (
            <VistaPrevia proyecto={abierto} onCerrar={() => setAbierto(null)} onCotizar={onCotizar} />
         )}
      </Seccion>
   );
}

function SinResultados({
   busqueda,
   categoria,
   hayEnOtras,
   onVerTodas,
   onCotizar,
}: {
   busqueda: string;
   categoria?: (typeof categorias)[number];
   hayEnOtras: boolean;
   onVerTodas: () => void;
   onCotizar: OnCotizar;
}) {
   return (
      <article className="flex flex-col items-center rounded-[2rem] border-4 border-dashed border-rosa/30 bg-white px-6 py-14 text-center sm:col-span-2 lg:col-span-3">
         <div className="text-6xl" aria-hidden="true">
            🔎
         </div>
         <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
            No encontramos “{busqueda}”{categoria ? ` en ${categoria.nombre}` : ""}
         </h3>
         <p className="mt-2 max-w-lg text-lg text-tinta/70">
            ¡Pero lo podemos diseñar para ti! Cuéntanos tu idea y te enviamos una propuesta con tu temática.
         </p>
         <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            {hayEnOtras && (
               <button type="button" onClick={onVerTodas} className="btn-borde">
                  Buscar en todas las categorías
               </button>
            )}
            <button type="button" onClick={() => onCotizar(busqueda, categoria?.nombre)} className="btn-rosa">
               Cotizar “{busqueda}”
            </button>
            <a
               href={linkWhatsApp(`Hola 👋 Quiero una invitación digital con temática de ${busqueda}.`)}
               target="_blank"
               rel="noreferrer"
               className="btn-wsp"
            >
               <IconoWhatsApp /> Escribir por WhatsApp
            </a>
         </div>
      </article>
   );
}

function BotonCategoria({
   activo,
   onClick,
   icono,
   nombre,
   cantidad,
}: {
   activo: boolean;
   onClick: () => void;
   icono: string;
   nombre: string;
   cantidad: number;
}) {
   return (
      <button
         type="button"
         onClick={onClick}
         aria-pressed={activo}
         className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border-2 px-4 py-2 text-sm font-bold transition ${
            activo
               ? "border-tinta bg-tinta text-white"
               : "border-tinta/10 bg-white text-tinta/80 hover:border-rosa/50 hover:text-rosa"
         }`}
      >
         <span aria-hidden="true">{icono}</span>
         {nombre}
         {cantidad > 0 && (
            <span
               className={`ml-0.5 rounded-full px-2 py-0.5 text-xs ${activo ? "bg-white/20" : "bg-rosa-suave text-rosa-oscuro"}`}
            >
               {cantidad}
            </span>
         )}
      </button>
   );
}

function Paginacion({ actual, total, onCambiar }: { actual: number; total: number; onCambiar: (n: number) => void }) {
   // Muestra 1 … (actual-1) actual (actual+1) … total
   const numeros: (number | "…")[] = [];
   for (let n = 1; n <= total; n++) {
      if (n === 1 || n === total || Math.abs(n - actual) <= 1) numeros.push(n);
      else if (numeros[numeros.length - 1] !== "…") numeros.push("…");
   }
   const flecha =
      "btn-borde px-4 py-2.5 text-sm disabled:pointer-events-none disabled:opacity-40";
   return (
      <nav aria-label="Páginas del catálogo" className="mt-12 flex items-center justify-center gap-2">
         <button type="button" className={flecha} disabled={actual === 1} onClick={() => onCambiar(actual - 1)}>
            ‹ <span className="hidden sm:inline">Anterior</span>
         </button>
         {numeros.map((n, i) =>
            n === "…" ? (
               <span key={`e${i}`} className="px-1 text-tinta/40">
                  …
               </span>
            ) : (
               <button
                  key={n}
                  type="button"
                  onClick={() => onCambiar(n)}
                  aria-current={n === actual ? "page" : undefined}
                  aria-label={`Página ${n}`}
                  className={`h-11 w-11 rounded-full font-titulo font-semibold transition ${
                     n === actual ? "bg-rosa text-white shadow-[0_4px_0_#C93A6C]" : "bg-white hover:bg-rosa-suave"
                  }`}
               >
                  {n}
               </button>
            ),
         )}
         <button type="button" className={flecha} disabled={actual === total} onClick={() => onCambiar(actual + 1)}>
            <span className="hidden sm:inline">Siguiente</span> ›
         </button>
      </nav>
   );
}

function TarjetaDiseno({ p, onVer, onCotizar }: { p: Proyecto; onVer: () => void; onCotizar: OnCotizar }) {
   return (
      <article
         className={`group flex flex-col overflow-hidden rounded-[2rem] ${p.fondo} p-5 transition hover:-translate-y-1 hover:shadow-xl`}
      >
         <button
            type="button"
            onClick={onVer}
            className="relative mx-auto block w-full max-w-[220px] focus:outline-none"
            aria-label={`Ver vista previa de ${p.titulo}`}
         >
            <Celular className="aspect-[400/820] transition group-hover:rotate-[-2deg]">
               <img
                  src={img(p.imagen)}
                  alt={`Invitación ${p.titulo}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
               />
            </Celular>
            <span className="absolute inset-x-0 bottom-6 mx-auto w-max rounded-full bg-tinta/85 px-4 py-2 text-sm font-bold text-white opacity-0 transition group-hover:opacity-100">
               ▶ Probar en vivo
            </span>
         </button>

         <div className="mt-6 flex flex-1 flex-col">
            <div className="flex flex-wrap gap-1.5">
               <span className={`etiqueta ${p.acento}`}>{p.tematica}</span>
               {p.categorias.map((c) => (
                  <span key={c} className="etiqueta bg-white/50 text-tinta/60">
                     {nombreCategoria(c)}
                  </span>
               ))}
            </div>
            <h3 className="mt-3 text-xl font-bold">{p.titulo}</h3>
            {p.paquete && (
               <div className="mt-2">
                  <EtiquetaPaquete p={p} />
               </div>
            )}
            <p className="mt-2 flex-1 text-sm leading-relaxed text-tinta/75">{p.descripcion}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
               {p.destacados.map((d) => (
                  <li key={d} className="rounded-full bg-white/70 px-2.5 py-1 text-xs font-semibold">
                     {d}
                  </li>
               ))}
            </ul>
            <div className="mt-5 grid grid-cols-2 gap-2">
               <button type="button" onClick={onVer} className="btn-borde px-3 py-2.5 text-sm">
                  Ver demo
               </button>
               <button
                  type="button"
                  onClick={() => cotizarDiseno(p, onCotizar)}
                  className="btn-rosa px-3 py-2.5 text-sm"
               >
                  La quiero
               </button>
            </div>
         </div>
      </article>
   );
}

function VistaPrevia({
   proyecto,
   onCerrar,
   onCotizar,
}: {
   proyecto: Proyecto;
   onCerrar: () => void;
   onCotizar: OnCotizar;
}) {
   useEffect(() => {
      const tecla = (e: KeyboardEvent) => e.key === "Escape" && onCerrar();
      document.addEventListener("keydown", tecla);
      document.body.style.overflow = "hidden";
      return () => {
         document.removeEventListener("keydown", tecla);
         document.body.style.overflow = "";
      };
   }, [onCerrar]);

   return (
      <div
         className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-tinta/70 p-4 backdrop-blur-sm"
         onClick={onCerrar}
         role="dialog"
         aria-modal="true"
         aria-label={`Vista previa: ${proyecto.titulo}`}
      >
         <div
            className="flex w-full max-w-4xl flex-col items-center gap-8 md:flex-row md:items-center"
            onClick={(e) => e.stopPropagation()}
         >
            <Celular className="h-[min(78vh,720px)] w-[min(88vw,350px)] shrink-0">
               <iframe
                  src={proyecto.url}
                  title={proyecto.titulo}
                  className="h-full w-full border-0"
                  allow="autoplay; fullscreen"
               />
            </Celular>

            <div className="w-full rounded-3xl bg-white p-6 md:p-8">
               <span className={`etiqueta ${proyecto.fondo} ${proyecto.acento}`}>{proyecto.tematica}</span>
               <h3 className="mt-3 text-2xl font-bold">{proyecto.titulo}</h3>
               <p className="mt-2 text-tinta/75">{proyecto.descripcion}</p>
               <p className="mt-4 rounded-2xl bg-crema p-3 text-sm text-tinta/70">
                  👆 Desliza dentro del celular y toca los botones: es la invitación real funcionando.
               </p>
               <div className="mt-6 flex flex-col gap-3">
                  <button
                     type="button"
                     onClick={() => {
                        onCerrar();
                        cotizarDiseno(proyecto, onCotizar);
                     }}
                     className="btn-rosa"
                  >
                     Quiero una así
                  </button>
                  <a
                     href={linkWhatsApp(`Hola 👋 Me encantó el diseño "${proyecto.titulo}" y quiero más información.`)}
                     target="_blank"
                     rel="noreferrer"
                     className="btn-wsp"
                  >
                     <IconoWhatsApp /> Preguntar por WhatsApp
                  </a>
                  <a href={proyecto.url} target="_blank" rel="noreferrer" className="btn-borde">
                     Abrir en pantalla completa ↗
                  </a>
               </div>
               <button
                  type="button"
                  onClick={onCerrar}
                  className="mt-4 w-full text-sm font-bold text-tinta/50 hover:text-tinta"
               >
                  Cerrar
               </button>
            </div>
         </div>
      </div>
   );
}
