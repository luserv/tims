# TIMS ESPOCH — Design System Master

**Stack:** Next.js 15 · Tailwind CSS 4 · shadcn/ui  
**Style:** Swiss Modernism 2.0 — grid estricto, jerarquía clara, decoración mínima, acento único  
**Producto:** Sitio institucional universitario (Ingeniería en TI, ESPOCH)

---

## Colores

Los tokens ya están definidos en `src/styles/globals.css`. Las únicas dos adiciones pendientes son el dorado de marca y un token de éxito.

| Token | Valor | Uso |
|---|---|---|
| `--blueti` / `primary` | `#001b55` | Color de marca, navbars, badges de noticias, CTAs principales |
| `--gold` *(pendiente)* | `#d79b05` | Acento secundario, badges de eventos, highlights |
| `background` | `#F8FAFC` (light) | Fondo general |
| `foreground` | `#020617` | Texto principal |
| `muted-foreground` | `#475569` mínimo | Texto secundario — nunca más claro que slate-600 en light mode |
| `destructive` | `#DC2626` | Acciones destructivas |

**Reglas de contraste:**
- Texto normal sobre fondo claro: mínimo 4.5:1
- `bg-white/80` mínimo para cards con transparencia en light mode (no `bg-white/10`)
- Bordes visibles en ambos modos: `border-gray-200` en light, `border-white/10` en dark

**Token pendiente para agregar en `globals.css`:**
```css
:root {
  --gold: #d79b05;
}
@theme inline {
  --color-gold: var(--gold);
}
```

---

## Tipografía

Inter ya está instalado como variable CSS (`--font-sans`). Agregar Poppins para headings da jerarquía sin cambiar la fuente de cuerpo.

| Rol | Fuente | Peso |
|---|---|---|
| Headings (h1–h3) | **Poppins** | 600–700 |
| Body / UI | **Inter** (ya instalado) | 400–500 |

**Escala de tamaños (mobile-first):**

| Token | Tamaño | Uso |
|---|---|---|
| `text-xs` | 12px | Metadata, timestamps, badges |
| `text-sm` | 14px | Body secundario, labels |
| `text-base` | 16px | Body principal — mínimo en mobile |
| `text-lg` | 18px | Subtítulos de sección |
| `text-2xl` | 24px | Títulos de página (mobile) |
| `text-3xl` | 30px | Títulos de página (desktop) |

**Reglas:**
- `line-height: 1.5–1.75` para body
- Máximo 65–75 caracteres por línea (`max-w-prose`)
- Nunca usar `text-gray-400` o más claro para texto en light mode

**Import para agregar en `src/app/fonts.ts`:**
```ts
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-heading',
})
```

---

## Layout y Espaciado

- Grid base: unidad de 8px (`gap-2` = 8px, `gap-4` = 16px, `gap-8` = 32px)
- Contenedor máximo: `max-w-7xl` consistente en todas las páginas
- Navbar fija: siempre compensar con `pt-[altura-navbar]` en el contenido
- Sin scroll horizontal en ningún breakpoint

**Breakpoints de prueba obligatorios:** 375px · 768px · 1024px · 1440px

---

## Estilo Visual (Swiss Modernism 2.0)

- Jerarquía por tipografía y espaciado, no por decoración
- Un solo color acento por página (`#001b55` o `#d79b05`, no ambos como primarios)
- Sin sombras pesadas — `shadow-sm` máximo en cards públicas
- Sin gradientes salvo en el hero banner (`bg-[#001b55]`)
- Íconos SVG únicamente (Lucide — ya disponible vía shadcn)
- Sin emojis como íconos de UI

---

## Animaciones e Interacciones

- Micro-interacciones: 150–300ms, `ease-out`
- Solo `transform` y `opacity` — nunca animar `width`/`height`
- `cursor-pointer` en todos los elementos clickeables
- Respetar `prefers-reduced-motion`
- Estados hover: cambio de color o sombra, sin desplazamiento de layout

---

## Accesibilidad

- `alt` descriptivo en todas las imágenes con contenido
- `aria-label` en botones icon-only
- `label` con `for` en todos los inputs de formulario
- Orden de tab = orden visual
- Focus ring visible en todos los interactivos

---

## Inconsistencias actuales a resolver

| Problema | Archivos afectados | Solución |
|---|---|---|
| Color `#001b55` hardcodeado en JSX | `src/app/timeline/page.tsx`, `src/sections/` | Reemplazar por `bg-[var(--blueti)]` o `bg-primary` |
| Color `#d79b05` sin token | `src/app/timeline/page.tsx` | Agregar `--gold` a `globals.css` |
| Admin usa `dark:bg-gray-800` manual | `src/app/admin/layout.tsx` | Usar `bg-card` / `bg-background` de shadcn |
| Sin fuente de heading diferenciada | `src/app/fonts.ts` | Agregar Poppins como `--font-heading` |

---

## Pre-Delivery Checklist

- [ ] Sin emojis como íconos (usar Lucide SVG)
- [ ] `cursor-pointer` en todos los elementos clickeables
- [ ] Hover con transición suave (150–300ms)
- [ ] Contraste 4.5:1 mínimo en light mode
- [ ] Focus ring visible
- [ ] `prefers-reduced-motion` respetado
- [ ] Responsive en 375px, 768px, 1024px, 1440px
- [ ] Sin scroll horizontal en mobile
- [ ] Tokens de color usados, no valores hex hardcodeados
