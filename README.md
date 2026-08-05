# ZENORA 360 — Site web corporate

Site vitrine officiel de **ZENORA**, studio technologique basé à Yaoundé (Cameroun).  
**Production** : [https://zenora360.com](https://zenora360.com)

> *De Zéro au Zénith* — digitalisation, développement web, marketing digital, design graphique et solutions métiers.

---

## Stack

| Couche | Technologie |
| ------ | ----------- |
| Build | Vite 5, TypeScript, SWC |
| UI | React 18, Tailwind CSS, shadcn/ui |
| Routing | React Router v6 |
| État | Zustand (blog), React Query |
| Animations | Framer Motion |
| i18n | Context FR/EN custom |
| Packaging | Docker multi-stage Node → Nginx |
| Delivery | GitHub Actions, Harbor, Docker Compose |

---

## Prérequis

- Node.js 22 (`.nvmrc`)
- npm
- Docker / Docker Compose pour les tests d'image

Je garde `npm` comme chemin de vérité pour le build local, la CI et l'image Docker.

---

## Développement local

```sh
git clone <repo-url>
cd zenora360
npm ci
npm run dev
```

Application locale : [http://localhost:8080](http://localhost:8080)

### Scripts disponibles

| Commande | Description |
| -------- | ----------- |
| `npm run dev` | Serveur Vite |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |
| `npm run test` | Tests Vitest |
| `npm run build` | Build production |
| `npm run ci:validate` | Gate locale complète (lint + typecheck + test + build) |
| `npm run audit:prod` | Audit des dépendances runtime |

### Makefile

J'ai ajouté un `Makefile` pour éviter les commandes longues et rendre la base réutilisable :

```sh
make install
make validate
make docker-build
make compose-up
```

---

## Structure du projet

```text
zenora360/
├── .github/
│   ├── dependabot.yml
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── security.yml
│   │   ├── release.yml
│   │   └── deploy.yml
│   └── zap-rules.tsv
├── deploy/
│   └── .env.production.example
├── docs/
│   └── devsecops-pipeline.md
├── public/
├── src/
├── Dockerfile
├── Dockerfile.runtime
├── docker-compose.yml
├── Makefile
└── README.md
```

---

## Application

### Configuration site

Les constantes globales (domaine, chemins d'images) sont centralisées dans `src/lib/site.ts`.

Le composant `SEO` (`src/components/SEO.tsx`) gère :

- title / description
- Open Graph
- Twitter cards
- canonical
- JSON-LD par page

### Assets

- **Logos** : `src/assets/logo-zenora-*.png`
- **Illustrations** : `src/assets/photos/*.svg`
- **Projets & partenaires** : `public/images/projects/`, `public/images/partners/`

Je garde les assets en local ; je n'introduis pas de dépendance externe inutile pour le rendu public.

### Blog API

Le frontend consomme `https://api.zenora360.com` pour le blog et l'admin.  
En cas d'indisponibilité, un fallback local (mock + stockage navigateur) prend le relais.

---

## Docker

### Build standard

```sh
docker build -t zenora-web:local .
docker run --rm -p 8080:8080 zenora-web:local
```

### Fallback runtime-only

Si un environnement ne permet pas de builder dans Docker :

```sh
npm ci
npm run build
docker build -f Dockerfile.runtime -t zenora-web:local .
```

### Compose local

```sh
docker compose up -d --build
```

Ou avec runtime-only :

```sh
DOCKERFILE=Dockerfile.runtime docker compose up -d --build
```

---

## Pipeline DevSecOps

J'ai refondu puis **durci** la pipeline pour en faire une base réutilisable, fail-closed côté supply chain.

### Workflows

| Workflow | Rôle |
| -------- | ---- |
| `ci.yml` | qualité, secrets, dependency review, Hadolint |
| `security.yml` | Trivy gate, CodeQL, ZAP planifié |
| `release.yml` | build → scan → push → Cosign → SBOM → provenance |
| `deploy.yml` | verify signature → SSH deploy → smoke / rollback |
| `reusable-*.yml` | briques réutilisables multi-projets |

### Principes

- la CI valide le code avant merge
- le release **ne pousse jamais** une image avant le scan Trivy
- le déploiement consomme un tag immuable (`sha-*`) et **refuse `latest`**
- Cosign est vérifié **avant** le SSH deploy
- healthcheck + rollback + smoke public

Documentation détaillée : `docs/devsecops-pipeline.md`

---

## Déploiement production

Le serveur doit disposer au minimum de :

- Docker
- Docker Compose
- accès réseau au registre Harbor
- un répertoire applicatif cible (`DEPLOY_APP_DIR`)

Le workflow `deploy.yml` :

1. copie `docker-compose.yml`
2. génère `.env` côté serveur
3. fait `docker compose pull web`
4. recrée le service
5. vérifie `/health`
6. rollback si nécessaire

Variables runtime serveur : voir `deploy/.env.production.example`

---

## Secrets GitHub à prévoir

### Harbor

- `HARBOR_REGISTRY`
- `HARBOR_PROJECT`
- `HARBOR_USERNAME`
- `HARBOR_PASSWORD`

### Déploiement SSH

- `DEPLOY_SSH_HOST`
- `DEPLOY_SSH_USER`
- `DEPLOY_SSH_KEY`
- `DEPLOY_SSH_PORT`
- `DEPLOY_APP_DIR`

### Optionnel

- `SONAR_HOST_URL`
- `SONAR_TOKEN`

Je recommande aussi de définir des variables d'environnement GitHub côté `production` :

- `WEB_HOST_PORT`
- `PUBLIC_BASE_HOST`

---

## SEO & IA

- **Canonical** : `https://zenora360.com`
- **Sitemap** : `/sitemap.xml`
- **Robots** : `/robots.txt`
- **LLMs** : `/llms.txt`
- **JSON-LD** : `index.html` + `src/components/SEO.tsx`

---

## Licence

Propriétaire — © ZENORA. Tous droits réservés.
