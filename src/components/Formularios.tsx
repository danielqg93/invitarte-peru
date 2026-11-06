import { type FormEvent, useEffect, useState } from "react";
import { funciones, linkWhatsApp, marca, paquetes, proyectos, tiposEvento } from "../config";
import { IconoWhatsApp, Seccion } from "./ui";

/* ------------------------------------------------------------------
 *  COTIZADOR: arma un mensaje ordenado y lo abre en WhatsApp.
 * ------------------------------------------------------------------ */
export function Cotizador({ tematicaInicial }: { tematicaInicial: { valor: string; n: number } }) {
   const [datos, setDatos] = useState({
      cliente: "",
      telefono: "",
      tipo: tiposEvento[0],
      tematica: "",
      festejado: "",
      edad: "",
      fecha: "",
      paquete: "magica",
      detalles: "",
   });
   const [elegidas, setElegidas] = useState<string[]>(["Cuenta regresiva", "Confirmación de asistencia (RSVP)"]);

   // Cuando el usuario pulsa "La quiero" en un diseño, se precarga la temática.
   useEffect(() => {
      if (tematicaInicial.n > 0) setDatos((d) => ({ ...d, tematica: tematicaInicial.valor }));
   }, [tematicaInicial]);

   const set = (campo: keyof typeof datos) => (e: { target: { value: string } }) =>
      setDatos((d) => ({ ...d, [campo]: e.target.value }));

   const alternar = (f: string) =>
      setElegidas((l) => (l.includes(f) ? l.filter((x) => x !== f) : [...l, f]));

   const enviar = (e: FormEvent) => {
      e.preventDefault();
      const paquete = paquetes.find((p) => p.id === datos.paquete)?.nombre ?? datos.paquete;
      const fecha = datos.fecha
         ? new Date(`${datos.fecha}T12:00`).toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" })
         : "Por definir";
      const lineas = [
         `¡Hola ${marca.nombre}! 🎉 Quiero cotizar una invitación digital.\n`,
         `👤 *Mi nombre:* ${datos.cliente}`,
         datos.telefono && `📱 *Teléfono:* ${datos.telefono}`,
         `🎈 *Evento:* ${datos.tipo}`,
         `🎨 *Temática:* ${datos.tematica}`,
         datos.festejado && `⭐ *Festejado/a:* ${datos.festejado}${datos.edad ? ` (${datos.edad})` : ""}`,
         `📅 *Fecha del evento:* ${fecha}`,
         `📦 *Paquete:* ${paquete}`,
         elegidas.length > 0 && `✅ *Me interesa:*\n${elegidas.map((f) => `   • ${f}`).join("\n")}`,
         datos.detalles && `📝 *Detalles:* ${datos.detalles}`,
      ].filter(Boolean);
      window.open(linkWhatsApp(lineas.join("\n")), "_blank", "noopener");
   };

   return (
      <Seccion
         id="cotiza"
         etiqueta="Cotiza gratis"
         titulo={
            <>
               Cotiza tu invitación <span className="text-rosa">con tu temática</span>
            </>
         }
         subtitulo="Cuéntanos tu idea y te respondemos por WhatsApp con la propuesta y el precio. Sin compromiso."
         className="bg-white"
      >
         <form
            onSubmit={enviar}
            className="mx-auto grid max-w-4xl gap-6 rounded-[2rem] bg-crema p-5 sm:p-10 md:grid-cols-2"
         >
            <div>
               <label className="rotulo" htmlFor="c-cliente">
                  Tu nombre *
               </label>
               <input id="c-cliente" required className="campo" placeholder="Ej: Andrea" value={datos.cliente} onChange={set("cliente")} />
            </div>
            <div>
               <label className="rotulo" htmlFor="c-tel">
                  Teléfono (opcional)
               </label>
               <input id="c-tel" type="tel" className="campo" placeholder="Ej: 987 654 321" value={datos.telefono} onChange={set("telefono")} />
            </div>
            <div>
               <label className="rotulo" htmlFor="c-tipo">
                  Tipo de evento *
               </label>
               <select id="c-tipo" className="campo" value={datos.tipo} onChange={set("tipo")}>
                  {tiposEvento.map((t) => (
                     <option key={t}>{t}</option>
                  ))}
               </select>
            </div>
            <div>
               <label className="rotulo" htmlFor="c-tema">
                  Temática *
               </label>
               <input
                  id="c-tema"
                  required
                  list="tematicas"
                  className="campo"
                  placeholder="Ej: Frozen, dinosaurios, mariposas…"
                  value={datos.tematica}
                  onChange={set("tematica")}
               />
               <datalist id="tematicas">
                  {proyectos.map((p) => (
                     <option key={p.id} value={p.tematica} />
                  ))}
               </datalist>
            </div>
            <div>
               <label className="rotulo" htmlFor="c-fest">
                  Nombre del festejado/a
               </label>
               <input id="c-fest" className="campo" placeholder="Ej: Valentina" value={datos.festejado} onChange={set("festejado")} />
            </div>
            <div className="grid grid-cols-2 gap-3">
               <div>
                  <label className="rotulo" htmlFor="c-edad">
                     Edad
                  </label>
                  <input id="c-edad" className="campo" placeholder="Ej: 5 años" value={datos.edad} onChange={set("edad")} />
               </div>
               <div>
                  <label className="rotulo" htmlFor="c-fecha">
                     Fecha
                  </label>
                  <input id="c-fecha" type="date" className="campo px-3" value={datos.fecha} onChange={set("fecha")} />
               </div>
            </div>

            <fieldset className="md:col-span-2">
               <legend className="rotulo">Paquete</legend>
               <div className="grid gap-3 sm:grid-cols-3">
                  {paquetes.map((p) => (
                     <label
                        key={p.id}
                        className={`cursor-pointer rounded-2xl border-2 bg-white p-4 transition ${
                           datos.paquete === p.id ? "border-rosa ring-4 ring-rosa/15" : "border-tinta/10 hover:border-rosa/40"
                        }`}
                     >
                        <input
                           type="radio"
                           name="paquete"
                           value={p.id}
                           checked={datos.paquete === p.id}
                           onChange={set("paquete")}
                           className="sr-only"
                        />
                        <span className="font-titulo text-lg font-semibold">{p.nombre}</span>
                        <span className="mt-1 block text-sm text-tinta/65">{p.descripcion}</span>
                     </label>
                  ))}
               </div>
            </fieldset>

            <fieldset className="md:col-span-2">
               <legend className="rotulo">¿Qué te gustaría que tenga?</legend>
               <div className="flex flex-wrap gap-2">
                  {funciones.map((f) => {
                     const activo = elegidas.includes(f);
                     return (
                        <button
                           key={f}
                           type="button"
                           onClick={() => alternar(f)}
                           aria-pressed={activo}
                           className={`rounded-full border-2 px-3.5 py-2 text-sm font-semibold transition ${
                              activo ? "border-rosa bg-rosa text-white" : "border-tinta/10 bg-white hover:border-rosa/40"
                           }`}
                        >
                           {activo ? "✓ " : "+ "}
                           {f}
                        </button>
                     );
                  })}
               </div>
            </fieldset>

            <div className="md:col-span-2">
               <label className="rotulo" htmlFor="c-det">
                  Cuéntanos más (colores, personajes, ideas, referencias)
               </label>
               <textarea
                  id="c-det"
                  rows={4}
                  className="campo resize-y"
                  placeholder="Ej: Quiero tonos lila y dorado, con unicornios y que suene su canción favorita."
                  value={datos.detalles}
                  onChange={set("detalles")}
               />
            </div>

            <div className="flex flex-col items-center gap-3 md:col-span-2">
               <button type="submit" className="btn-wsp w-full py-4 text-lg sm:w-auto sm:px-10">
                  <IconoWhatsApp className="h-6 w-6" /> Enviar cotización por WhatsApp
               </button>
               <p className="text-center text-sm text-tinta/55">
                  Se abrirá WhatsApp con tu pedido ya escrito. Solo tienes que pulsar enviar.
               </p>
            </div>
         </form>
      </Seccion>
   );
}

/* ------------------------------------------------------------------
 *  CONTÁCTANOS: mensaje libre por WhatsApp o correo.
 * ------------------------------------------------------------------ */
export function Contacto() {
   const [nombre, setNombre] = useState("");
   const [mensaje, setMensaje] = useState("");

   const texto = () => `Hola ${marca.nombre}, soy ${nombre}.\n\n${mensaje}`;

   const porWhatsApp = (e: FormEvent) => {
      e.preventDefault();
      window.open(linkWhatsApp(texto()), "_blank", "noopener");
   };

   const mailto = `mailto:${marca.correo}?subject=${encodeURIComponent(`Consulta de ${nombre || "un cliente"}`)}&body=${encodeURIComponent(texto())}`;

   const redes = [
      { nombre: "Instagram", url: marca.instagram },
      { nombre: "TikTok", url: marca.tiktok },
      { nombre: "Facebook", url: marca.facebook },
   ].filter((r) => r.url);

   return (
      <Seccion
         id="contacto"
         etiqueta="Contáctanos"
         titulo="¿Tienes alguna pregunta?"
         subtitulo="Escríbenos y te respondemos lo antes posible."
      >
         <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-5">
            <div className="flex flex-col gap-4 rounded-[2rem] bg-tinta p-8 text-white md:col-span-2">
               <h3 className="text-2xl font-bold">Hablemos 💬</h3>
               <a
                  href={linkWhatsApp(`Hola ${marca.nombre} 👋`)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 transition hover:bg-white/20"
               >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-wsp">
                     <IconoWhatsApp />
                  </span>
                  <span>
                     <span className="block text-sm text-white/60">WhatsApp</span>
                     <span className="font-bold">+{marca.whatsapp}</span>
                  </span>
               </a>
               <a
                  href={`mailto:${marca.correo}`}
                  className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 transition hover:bg-white/20"
               >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-rosa text-xl">✉</span>
                  <span className="min-w-0">
                     <span className="block text-sm text-white/60">Correo</span>
                     <span className="block truncate font-bold">{marca.correo}</span>
                  </span>
               </a>
               <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-sol text-xl">📍</span>
                  <span>
                     <span className="block text-sm text-white/60">Atendemos desde</span>
                     <span className="font-bold">{marca.ciudad} · envíos a todo el mundo</span>
                  </span>
               </div>
               {redes.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                     {redes.map((r) => (
                        <a
                           key={r.nombre}
                           href={r.url}
                           target="_blank"
                           rel="noreferrer"
                           className="rounded-full border border-white/25 px-4 py-2 text-sm font-bold hover:bg-white hover:text-tinta"
                        >
                           {r.nombre}
                        </a>
                     ))}
                  </div>
               )}
            </div>

            <form onSubmit={porWhatsApp} className="flex flex-col gap-4 rounded-[2rem] bg-white p-6 sm:p-8 md:col-span-3">
               <div>
                  <label className="rotulo" htmlFor="k-nombre">
                     Tu nombre *
                  </label>
                  <input id="k-nombre" required className="campo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
               </div>
               <div className="flex flex-1 flex-col">
                  <label className="rotulo" htmlFor="k-msg">
                     Mensaje *
                  </label>
                  <textarea
                     id="k-msg"
                     required
                     rows={5}
                     className="campo flex-1 resize-y"
                     placeholder="Escribe tu consulta…"
                     value={mensaje}
                     onChange={(e) => setMensaje(e.target.value)}
                  />
               </div>
               <div className="grid gap-3 sm:grid-cols-2">
                  <button type="submit" className="btn-wsp">
                     <IconoWhatsApp /> Enviar por WhatsApp
                  </button>
                  <a
                     href={mailto}
                     onClick={(e) => {
                        if (!nombre || !mensaje) {
                           e.preventDefault();
                           (e.currentTarget.closest("form") as HTMLFormElement).reportValidity();
                        }
                     }}
                     className="btn-borde"
                  >
                     ✉ Enviar por correo
                  </a>
               </div>
            </form>
         </div>
      </Seccion>
   );
}
