# ZENORA 360 — Site web corporate

[![CI](https://github.com/ZENORA-360/zenora-website/actions/workflows/ci.yml/badge.svg)](https://github.com/ZENORA-360/zenora-website/actions/workflows/ci.yml)
[![Security](https://github.com/ZENORA-360/zenora-website/actions/workflows/security.yml/badge.svg)](https://github.com/ZENORA-360/zenora-website/actions/workflows/security.yml)
[![Release Image](https://github.com/ZENORA-360/zenora-website/actions/workflows/release.yml/badge.svg)](https://github.com/ZENORA-360/zenora-website/actions/workflows/release.yml)

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
│   ├── README.md              # kit DevSecOps réutilisable
│   ├── dependabot.yml
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── security.yml
│   │   ├── release.yml
│   │   ├── deploy.yml
│   │   └── reusable-*.yml
│   ├── scripts/
│   └── zap-rules.tsv
├── deploy/
│   ├── remote-deploy.sh
│   ├── smoke-test.sh
│   └── .env.production.example
├── public/
├── src/
├── Dockerfile
├── Dockerfile.runtime
├── docker-compose.yml
├── docker-compose.local.yml
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
make compose-up
# ou:
docker compose -f docker-compose.yml -f docker-compose.local.yml up -d --build
```

Ou avec runtime-only :

```sh
make compose-up-runtime
```

Production sur le VPS : le conteneur rejoint le réseau Docker de Nginx Proxy Manager (`PROXY_NETWORK`, défaut `web-proxy`) **sans** binder `:80` — NPM route vers `zenora-web:8080`.

---

## Pipeline DevSecOps

J’ai refondu toute la chaîne CI/CD du site pour qu’un push sur `main` produise une image scannée, signée, déployée par digest derrière Nginx Proxy Manager — sans bricolage SSH à la main.

| Workflow | Rôle |
| -------- | ---- |
| `ci.yml` | qualité, secrets, deps, Hadolint, Sonar |
| `security.yml` | Trivy, CodeQL, ZAP (hebdo) |
| `release.yml` | build → Trivy → Harbor → Cosign → SBOM |
| `deploy.yml` | verify digest → SSH → pull → health / rollback → smoke |
| `reusable-*.yml` | briques partagées (qualité, Slack) |

En bref : on ne pousse pas une image avant le scan, on ne déploie pas `latest`, Cosign passe **avant** le SSH, et le conteneur vit sur le réseau `web-proxy` (pas de bind `:80`).

Kit réutilisable (diagrammes, secrets, reprise sur un autre repo) : [`.github/README.md`](.github/README.md).

---

## Déploiement production

Prérequis VPS : Docker, Compose, accès Harbor, répertoire `DEPLOY_APP_DIR`.

Le deploy :

1. copie `docker-compose.yml` + scripts
2. écrit `.env` avec `IMAGE_REF=…@sha256:…`
3. `compose pull` / `up` sur le réseau NPM
4. healthcheck + rollback si besoin
5. smoke conteneur + réseau proxy

Exemple runtime : `deploy/.env.production.example`.

---

## Secrets GitHub

Liste complète : [`.github/README.md`](.github/README.md).

**Harbor :** `HARBOR_REGISTRY`, `HARBOR_PROJECT`, `HARBOR_USERNAME`, `HARBOR_PASSWORD`

**SSH** (environment `production`) : `DEPLOY_SSH_HOST`, `USER`, `KEY`, `PORT`, `APP_DIR`, **`DEPLOY_SSH_KNOWN_HOSTS`** (`ssh-keyscan -p PORT HOST`)

**Optionnel :** `SONAR_*`, `SLACK_WEBHOOK_URL` (secret repo)

**Vars `production` :** `PROXY_NETWORK` (`web-proxy`), `PUBLIC_BASE_HOST`

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
