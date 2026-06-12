# Pain Cave — Gym Website

> **be STRONGER than your EXCUSES**

Sitio web bilingüe (ES/EN) para el gimnasio Pain Cave. Construido con:

- **Next.js 15** (App Router, React 19, TypeScript)
- **Tailwind CSS 4** — paleta blanco / negro / rojo
- **next-intl** — internacionalización completa, ningún texto hardcodeado
- **Stripe Checkout** — suscripciones mensuales para las membresías

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000  →  redirige a /es (o /en)
npm run build    # build de producción
```

## Configurar Stripe

1. Copia `.env.example` a `.env.local`.
2. Pega tu clave secreta de Stripe en `STRIPE_SECRET_KEY` (modo test: `sk_test_…`).
3. (Opcional) Crea los productos/precios en el dashboard de Stripe y pega sus IDs
   en `STRIPE_PRICE_BASIC`, `STRIPE_PRICE_BEAST`, `STRIPE_PRICE_ELITE`.
   Si los dejas vacíos, el checkout crea el precio al vuelo (`price_data`).
4. En producción, define `NEXT_PUBLIC_BASE_URL` con tu dominio real.

Tarjeta de prueba: `4242 4242 4242 4242`, cualquier fecha futura y CVC.

## Estructura

```
src/
  messages/es.json, en.json   ← TODO el texto del sitio (traducciones)
  data/site.ts                ← imágenes, precios, slugs (datos no textuales)
  i18n/                       ← configuración next-intl
  app/[locale]/               ← páginas: home, classes, trainers, membership,
                                 blog, blog/[slug], contact, checkout/(success|cancel)
  app/api/checkout/route.ts   ← creación de sesión de Stripe Checkout
  components/                 ← Header, Footer, cards, formularios, etc.
```

## Cambiar textos o añadir idiomas

Edita `src/messages/es.json` / `en.json`. Para un idioma nuevo: añade el archivo
`src/messages/<locale>.json` y el código en `src/i18n/routing.ts`.

## Imágenes

Las imágenes actuales son stock de Unsplash (definidas en `src/data/site.ts`).
Sustitúyelas por fotos reales del gimnasio cuando estén disponibles; el logo
está como SVG en `src/components/Logo.tsx` y `public/favicon.svg`.
