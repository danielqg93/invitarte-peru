import type { ReactNode } from "react";

export function IconoWhatsApp({ className = "h-5 w-5" }: { className?: string }) {
   return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
         <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 9.88 9.89c0 5.45-4.44 9.88-9.89 9.88zm8.41-18.3A11.81 11.81 0 0 0 12.04 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.49-8.41z" />
      </svg>
   );
}

export function Seccion({
   id,
   etiqueta,
   titulo,
   subtitulo,
   children,
   className = "",
}: {
   id: string;
   etiqueta: string;
   titulo: ReactNode;
   subtitulo?: string;
   children: ReactNode;
   className?: string;
}) {
   return (
      <section id={id} className={`py-20 sm:py-24 ${className}`}>
         <div className="contenedor">
            <div className="mx-auto mb-12 max-w-2xl text-center">
               <span className="etiqueta bg-rosa-suave text-rosa-oscuro">{etiqueta}</span>
               <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{titulo}</h2>
               {subtitulo && <p className="mt-4 text-lg text-tinta/70">{subtitulo}</p>}
            </div>
            {children}
         </div>
      </section>
   );
}

/** Marco de celular para mostrar capturas o la invitación en vivo. */
export function Celular({ children, className = "" }: { children: ReactNode; className?: string }) {
   return (
      <div
         className={`${className.includes("absolute") ? "" : "relative"} rounded-[2.2rem] border-[7px] border-tinta bg-tinta shadow-2xl shadow-tinta/25 ${className}`}
      >
         <div className="absolute left-1/2 top-1.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-tinta" />
         <div className="h-full w-full overflow-hidden rounded-[1.7rem] bg-white">{children}</div>
      </div>
   );
}
