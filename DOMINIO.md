# Dominio invitarte-peru.com

Configuración actual del dominio y guía para publicar cada invitación en su propio subdominio
(ej. `missy.invitarte-peru.com`).

## Configuración actual (noviembre 2026)

| Dato | Valor |
|---|---|
| Dominio | `invitarte-peru.com` |
| Registrador y DNS | Cloudflare (nameservers `hope.ns.cloudflare.com`, `jaziel.ns.cloudflare.com`) |
| Hosting | GitHub Pages, cuenta `danielqg93` |
| Repositorio de la web | `danielqg93/invitarte-peru` (rama `master`, despliegue con GitHub Actions) |
| HTTPS | Certificado Let's Encrypt emitido por GitHub, se renueva solo |
| Verificación en GitHub | Dominio verificado en la cuenta (protege también todos los subdominios) |

### Registros DNS en Cloudflare

Todos en **DNS only** (nube gris).

| Tipo | Nombre | Contenido | Para qué |
|---|---|---|---|
| A | `@` | `185.199.108.153` | Web principal → GitHub Pages |
| A | `@` | `185.199.109.153` | Web principal → GitHub Pages |
| A | `@` | `185.199.110.153` | Web principal → GitHub Pages |
| A | `@` | `185.199.111.153` | Web principal → GitHub Pages |
| CNAME | `www` | `danielqg93.github.io` | `www` redirige al dominio principal |
| TXT | `_github-pages-challenge-danielqg93` | `991894138519f411524b8241ddeeb5` | Verificación del dominio en GitHub. **No borrar** |

### Correo: Cloudflare Email Routing

El correo del dominio **solo se recibe** en Cloudflare y se reenvía al Gmail personal.
Cloudflare no envía correos.

- `cotiza@invitarte-peru.com` → Gmail personal (Email → Email Routing → Routing rules)
- Los registros MX, SPF y DKIM los creó Cloudflare y aparecen como **Locked/Blocked**: es normal,
  no tocarlos.

| Tipo | Nombre | Contenido | Para qué |
|---|---|---|---|
| MX | `@` | `route1.mx.cloudflare.net`, `route2…`, `route3…` | Recibir correo en Cloudflare |
| TXT | `@` | `v=spf1 include:_spf.mx.cloudflare.net ~all` | SPF |
| TXT | `cf2024-1._domainkey` | `v=DKIM1; …` | Firma DKIM |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:cotiza@invitarte-peru.com` | DMARC (en modo observación) |

#### Responder como `cotiza@` desde Gmail ("Enviar correo como")

Cloudflare no envía correo, así que se envía con los servidores de Gmail. Se configura desde la
computadora (la app del celular no tiene esta opción, pero luego toma el alias sola).

1. **Verificación en 2 pasos** activada: myaccount.google.com → Seguridad.
2. **Contraseña de aplicación**: myaccount.google.com/apppasswords → nombre `Invitarte cotiza`
   → copiar la clave de 16 letras (solo se muestra una vez; no guardarla en este archivo).
3. Gmail → ⚙️ → Ver toda la configuración → **Cuentas e importación → Enviar correo como →
   Añadir otra dirección**:
   - Nombre: `Invitarte` · Dirección: `cotiza@invitarte-peru.com` · "Tratar como un alias" marcado
   - SMTP `smtp.gmail.com` · puerto `587` · usuario: el Gmail completo · contraseña: la clave de
     aplicación · **TLS**
   - Confirmar con el código que llega a `cotiza@` (Cloudflare lo reenvía al mismo Gmail).
4. Marcar **"Responder desde la misma dirección a la que se envió el mensaje"** (opcional:
   "establecer como predeterminada").
5. Firma: Configuración → General → Firma, asignada a `cotiza@invitarte-peru.com`.
6. Probar enviando a otra cuenta y elegir `cotiza@` en el campo **De**.

**Limitaciones**

- Algunos clientes de correo muestran "enviado por gmail.com".
- Estos correos **no pasan DMARC** del dominio (los firma Gmail, no `invitarte-peru.com`). Con
  `p=none` se entregan igual. **No cambiar el DMARC a `quarantine` ni `reject`** mientras se use
  este método, o los correos propios irán a spam o rebotarán.
- Si se revoca la contraseña de aplicación o se cambia la contraseña de Google, hay que volver a
  ponerla en "Enviar correo como" (editar información).
- Para envío 100 % alineado con el dominio: migrar a Zoho Mail o Google Workspace.

Para agregar otra dirección (ej. `hola@`): Email Routing → Routing rules → Create address.
Si algún día se cambia a Zoho o Google Workspace, hay que **desactivar Email Routing** primero
(no pueden coexistir: ambos necesitan los MX). Si se agrega un servicio que envíe correos
(Gmail SMTP, Zoho…), sumar su `include:` al registro SPF en lugar de crear un segundo SPF.

### En el repositorio `invitarte-peru`

- Settings → Pages → Source: **GitHub Actions**
- Settings → Pages → Custom domain: `invitarte-peru.com`, con **Enforce HTTPS** activado
- `.github/workflows/deploy.yml` construye con `VITE_BASE_PATH: /` (la web vive en la raíz)

---

## Crear un subdominio para una invitación

Ejemplo: publicar la invitación de Missy en `missy.invitarte-peru.com`.

### 1. Cloudflare: agregar el registro

**DNS → Records → Add record**

| Tipo | Nombre | Contenido | Proxy |
|---|---|---|---|
| CNAME | `missy` | `danielqg93.github.io` | **DNS only** (nube gris) |

### 2. Repositorio de la invitación: ajustar la ruta base

Las invitaciones hoy se construyen para vivir en `danielqg93.github.io/<repo>/`. En un subdominio
viven en la raíz, así que en su `.github/workflows/*.yml` hay que cambiar:

```yaml
# Antes
VITE_BASE_PATH: /${{ github.event.repository.name }}/
# Después
VITE_BASE_PATH: /
```

Hacer commit y push de ese cambio.

### 3. GitHub: conectar el subdominio

En el repo de la invitación → **Settings → Pages → Custom domain** → `missy.invitarte-peru.com`
→ Save. Esperar "DNS check successful" y activar **Enforce HTTPS** (el certificado puede tardar
de minutos a 24 h).

### 4. Actualizar el catálogo de la web

En `src/config.ts`, cambiar la `url` del proyecto:

```ts
url: "https://missy.invitarte-peru.com/",
```

### 5. Comprobar

- `https://missy.invitarte-peru.com` abre la invitación con HTTPS.
- El link viejo `danielqg93.github.io/invitacion-misssy/` redirige solo al subdominio, así que los
  links que ya se compartieron siguen funcionando.
- Revisar que funcionen la música, las imágenes y la confirmación de asistencia (RSVP).

## Reglas y recomendaciones

- **Un subdominio por repositorio.** GitHub Pages permite un solo dominio propio por repo.
- **Nunca usar un registro comodín (`*`)** apuntando a GitHub: permitiría que otra persona tome
  subdominios sin configurar. Crear cada subdominio a mano.
- **Si se borra o se apaga el Pages de una invitación, borrar también su CNAME** en Cloudflare.
- Mantener la nube en **gris (DNS only)**. Si algún día se activa el proxy (nube naranja), usar SSL
  en modo **Full**, nunca **Flexible** (provoca "demasiadas redirecciones").

### Nombres sugeridos para los subdominios

| Uso | Formato | Ejemplo |
|---|---|---|
| Invitación de un cliente | `nombre` o `nombre-edad` | `valentina-5.invitarte-peru.com` |
| Boda | `novia-y-novio` | `ana-y-luis.invitarte-peru.com` |
| Demo del catálogo | `demo-tematica` | `demo-safari.invitarte-peru.com` |

Usar solo minúsculas, números y guiones (sin tildes, ñ ni espacios).

### Invitaciones actuales para migrar

| Invitación | Repo | Subdominio sugerido |
|---|---|---|
| Missy | `invitacion-misssy` | `missy.invitarte-peru.com` |
| Dragon Ball | `invitacion-dragonball` | `demo-torneo.invitarte-peru.com` |
| Dulces | `invitacion-dulces` | `demo-dulces.invitarte-peru.com` |
| Safari | `invitacion-safary` | `demo-safari.invitarte-peru.com` |
| Plim Plim | `ivitacion-plimplim` | `demo-burbujas.invitarte-peru.com` |
