import { useEffect, useState } from "react";
import { type Proyecto, linkWhatsApp, proyectos } from "../config";
import { Celular, IconoWhatsApp, Seccion } from "./ui";

const img = (ruta: string) => `${import.meta.env.BASE_URL}${ruta}`;

export function Portafolio({ onCotizar }: { onCotizar: (tematica: string) => void }) {
   const [abierto, setAbierto] = useState<Proyecto | null>(null);

   return (
      <Seccion
         id="disenos"
         etiqueta="Nuestros diseños"
         titulo="Invitaciones que tus invitados van a querer abrir"
         subtitulo="Toca cualquier diseño para probarlo en vivo, tal como lo verán tus invitados desde su celular."
      >
         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {proyectos.map((p) => (
               <article
                  key={p.id}
                  className={`group flex flex-col overflow-hidden rounded-[2rem] ${p.fondo} p-5 transition hover:-translate-y-1 hover:shadow-xl`}
               >
                  <button
                     type="button"
                     onClick={() => setAbierto(p)}
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
                     <span className={`etiqueta w-max ${p.acento}`}>{p.tematica}</span>
                     <h3 className="mt-3 text-xl font-bold">{p.titulo}</h3>
                     <p className="mt-2 flex-1 text-sm leading-relaxed text-tinta/75">{p.descripcion}</p>
                     <ul className="mt-4 flex flex-wrap gap-1.5">
                        {p.destacados.map((d) => (
                           <li key={d} className="rounded-full bg-white/70 px-2.5 py-1 text-xs font-semibold">
                              {d}
                           </li>
                        ))}
                     </ul>
                     <div className="mt-5 grid grid-cols-2 gap-2">
                        <button type="button" onClick={() => setAbierto(p)} className="btn-borde px-3 py-2.5 text-sm">
                           Ver demo
                        </button>
                        <button
                           type="button"
                           onClick={() => onCotizar(p.tematica)}
                           className="btn-rosa px-3 py-2.5 text-sm"
                        >
                           La quiero
                        </button>
                     </div>
                  </div>
               </article>
            ))}

            {/* Tarjeta para temáticas nuevas */}
            <article className="flex flex-col items-center justify-center rounded-[2rem] border-4 border-dashed border-rosa/30 bg-white p-8 text-center">
               <div className="text-6xl" aria-hidden="true">
                  🎨
               </div>
               <h3 className="mt-4 text-2xl font-bold">¿Tu temática no está aquí?</h3>
               <p className="mt-2 text-tinta/70">
                  Personajes, colores, hobbies o lo que se te ocurra: la diseñamos a tu medida.
               </p>
               <button type="button" onClick={() => onCotizar("")} className="btn-rosa mt-6">
                  Cotiza tu temática
               </button>
            </article>
         </div>

         {abierto && (
            <VistaPrevia proyecto={abierto} onCerrar={() => setAbierto(null)} onCotizar={onCotizar} />
         )}
      </Seccion>
   );
}

function VistaPrevia({
   proyecto,
   onCerrar,
   onCotizar,
}: {
   proyecto: Proyecto;
   onCerrar: () => void;
   onCotizar: (t: string) => void;
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
                        onCotizar(proyecto.tematica);
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
