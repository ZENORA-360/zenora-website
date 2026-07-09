# ZENORA 360 — Site web corporate

Site vitrine officiel de **ZENORA**, studio technologique basé à Yaoundé (Cameroun).  
**Production** : [https://zenora360.com](https://zenora360.com)

> *De Zéro au Zénith* — digitalisation, développement web, marketing digital, design graphique et solutions métiers.

---

## Stack

| Couche | Technologie |
|--------|-------------|
| Build | Vite 5, TypeScript, SWC |
| UI | React 18, Tailwind CSS, shadcn/ui |
| Routing | React Router v6 |
| État | Zustand (blog), React Query |
| Animations | Framer Motion, Three.js (hero 3D) |
| i18n | Context FR/EN custom |
| Déploiement | Docker (Bun build → Nginx) |

---

## Prérequis

- Node.js 20+ (ou [Bun](https://bun.sh) pour le build Docker/CI)
- npm ou bun

---

## Développement local

```sh
# Cloner le dépôt
git clone <repo-url>
cd zenora360

# Installer les dépendances
npm install

# Lancer le serveur de dev (port 8080)
npm run dev
```

Ouvrir [http://localhost:8080](http://localhost:8080).

### Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement Vite |
| `npm run build` | Build production (`dist/`) |
| `npm run preview` | Prévisualiser le build |
| `npm run lint` | ESLint |
| `npm run test` | Tests Vitest |

---

## Structure du projet

```
zenora360/
├── public/                 # Assets statiques (favicon, OG, sitemap, images)
│   ├── images/
│   │   ├── projects/     # Captures projets portfolio
│   │   └── partners/     # Logos partenaires
│   ├── llms.txt          # Fichier pour crawlers IA
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/       # UI, sections, layout
│   ├── contexts/         # i18n (LanguageContext)
│   ├── hooks/            # useBlog, etc.
│   ├── lib/              # site.ts (URLs, images), axios, utils
│   ├── pages/            # Routes marketing + admin
│   └── stores/           # Zustand (blog)
├── Dockerfile            # Build Bun → Nginx
├── docker-compose.yml    # Stack production
└── index.html            # SEO statique + JSON-LD
```

---

## Configuration site

Les constantes globales (domaine, chemins d'images) sont centralisées dans :

```ts
// src/lib/site.ts
export const SITE_URL = "https://zenora360.com";
```

Le composant `SEO` (`src/components/SEO.tsx`) gère les meta dynamiques par page (Open Graph, Twitter, canonical, JSON-LD).

---

## Assets & images

- **Logos** : `src/assets/logo-zenora-*.png`
- **Illustrations** : `src/assets/photos/*.svg`
- **Projets & partenaires** : `public/images/projects/`, `public/images/partners/` (servis à `/images/...`)

Ne pas référencer d'URLs externes pour les assets — tout est local ou sous `zenora360.com`.

---

## SEO & IA

- **Canonical** : `https://zenora360.com` (voir `src/lib/site.ts`)
- **Sitemap** : `/sitemap.xml`
- **Robots** : `/robots.txt` (admin exclu, crawlers IA autorisés sur le contenu public)
- **LLMs** : `/llms.txt` — résumé structuré pour assistants IA (ChatGPT, Perplexity, etc.)
- **JSON-LD** : Organization, WebSite, ProfessionalService dans `index.html` ; WebPage par route via `SEO`

---

## Déploiement

### Docker

```sh
docker build -t zenora-web .
docker run -p 8080:8080 zenora-web
```

### Production (OVH)

Le déploiement passe par la pipeline CI/CD (`.github/workflows/ci-cd.yml`) :
build → Harbor registry → `docker compose up` sur le serveur.

Variables d'environnement serveur : voir `docker-compose.yml`.

---

## API blog

Le frontend consomme `https://api.zenora360.com` pour le blog et l'admin.  
En cas d'indisponibilité, un fallback local (mock + localStorage) prend le relais.

---

## Licence

Propriétaire — © ZENORA. Tous droits réservés.
