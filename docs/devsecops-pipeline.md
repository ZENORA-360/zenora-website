# Pipeline DevSecOps

Ce document décrit la chaîne CI/CD de `zenora360`.  
Je l'ai conçue comme une **base réutilisable** pour nos projets front Dockerisés, pas comme un bricolage mono-repo.

## Niveau de maturité (audit)

### Avant le durcissement
La base était **propre et structurée**, mais pas encore senior sur les points qui comptent en production :

- image poussée **avant** le scan Trivy (fenêtre de risque)
- Trivy en mode rapport, sans **fail-closed**
- déploiement sans **vérification Cosign**
- redeploy manuel qui pouvait tomber sur `latest`
- peu de réutilisation réelle entre workflows
- lint applicatif qui cassait la gate CI

### Niveau actuel
Je la considère maintenant **senior / production-ready** pour un front SPA livré via Harbor + Docker Compose :

| Domaine | Niveau | Commentaire |
| ------- | ------ | ----------- |
| Qualité CI | Senior | lint / typecheck / test / build + Hadolint + Gitleaks + dependency review |
| Supply chain | Senior | build → scan gate → push → Cosign keyless → SBOM → provenance |
| Déploiement | Senior | signature vérifiée, tag immuable, healthcheck, rollback, smoke |
| Réutilisation | Senior | workflows `reusable-*` appelables depuis d'autres repos |
| Observabilité | Correct+ | step summaries + Slack optionnel |
| Multi-env / promotion | Correct | prod d'abord ; staging/promotion = prochaine couche |

Ce n'est **pas** du niveau “plateforme Kubernetes multi-clusters + policy OPA globale”.  
Pour notre modèle (Harbor + OVH + Compose + Watchtower), c'est le bon niveau : **exigeant, exploitable, réutilisable**.

## Philosophie

1. **Un seul chemin de vérité** : Node 22 + npm partout (local, CI, Docker).
2. **Fail closed** sur la supply chain : pas d'image publiée si le scan HIGH/CRITICAL échoue.
3. **Artefacts vérifiables** : digest, signature, SBOM, provenance.
4. **Déployer une image**, jamais du code brut sur le serveur.
5. **Rollback simple** si le healthcheck échoue.

## Découpage des workflows

```text
.github/workflows/
├── reusable-quality.yml   # gate qualité réutilisable
├── reusable-notify.yml    # Slack optionnel
├── ci.yml                 # PR / branches
├── security.yml           # scans continus + CodeQL + ZAP
├── release.yml            # build → scan → sign → publish
└── deploy.yml             # verify → SSH deploy → smoke
```

### `ci.yml`
- quality via `reusable-quality.yml`
- Gitleaks
- dependency review (PR, fail on high)
- Hadolint sur `Dockerfile`
- SonarQube optionnel (skip propre si secrets absents)
- summary job qui échoue si une gate dure échoue

### `security.yml`
- Trivy fs + config avec **exit-code 1**
- CodeQL `security-extended`
- npm audit en **advisory** (artefact, non bloquant)
- ZAP baseline planifié / manuel (`-I` pour ne pas casser sur WARN connus)

### `release.yml` (cœur senior)
Flux strict :

1. quality gate
2. build image **locale** (`load: true`, `push: false`)
3. Trivy image **gate HIGH/CRITICAL**
4. tag + push Harbor **seulement si le scan passe**
5. Cosign keyless (OIDC GitHub)
6. verify signature
7. attach SBOM SPDX
8. attest provenance
9. artefact `release-metadata.json` (tag + digest + ref)

### `deploy.yml`
1. récupère les metadata du release (ou tag immuable en manuel)
2. **refuse `latest`**
3. vérifie Cosign **avant** SSH
4. copie `docker-compose.yml` + `deploy/remote-deploy.sh`
5. pull / recreate
6. healthcheck local
7. rollback vers l'image précédente si besoin
8. smoke `/health` + `/` sur le domaine public

## Secrets GitHub

### Harbor
- `HARBOR_REGISTRY` — host only, lowercase. Example: `harbor.example.com`  
  Not `https://harbor.example.com`, no trailing slash, no project path.
- `HARBOR_PROJECT` — Harbor project, lowercase. Example: `zenora`
- `HARBOR_USERNAME`
- `HARBOR_PASSWORD`

Image resulting: `<HARBOR_REGISTRY>/<HARBOR_PROJECT>/zenora-web:sha-<shortsha>`

Un `docker push` en HTTP 500 n’est pas un bug de tag : login et tag ont déjà réussi. À vérifier sur Harbor : logs `registry` / `core`, disque, quota du projet, timeout du reverse proxy.

### Déploiement SSH
- `DEPLOY_SSH_HOST`
- `DEPLOY_SSH_USER`
- `DEPLOY_SSH_KEY`
- `DEPLOY_SSH_PORT`
- `DEPLOY_APP_DIR`

`dial tcp … i/o timeout` = GitHub n’atteint pas le SSH du VPS (pare-feu / security group / port).  
Le runner GitHub n’a pas d’IP fixe simple : ouvrir 22 vers Internet (restreint si possible), ou poser un **self-hosted runner** sur le VPS. Tester depuis l’extérieur : `nc -vz HOST PORT`.

### Optionnel
- `SONAR_HOST_URL`
- `SONAR_TOKEN`
- `SLACK_WEBHOOK_URL`

## Variables d'environnement GitHub (`production`)

- `WEB_HOST_PORT` (souvent `80`)
- `PUBLIC_BASE_HOST` (ex. `zenora360.com`)

Je recommande d'activer une **approbation manuelle** sur l'environment `production`.

## Convention d'image

```text
<harbor>/<project>/zenora-web:sha-<shortsha>
```

- `sha-xxxxxxx` : tag de déploiement immuable
- `latest` : alias de commodité sur `main` uniquement
- `vX.Y.Z` : si tag Git

En exploitation, on déploie **toujours** un `sha-*` (ou un digest).  
Jamais `latest` en production.

## Convention serveur

Dans `DEPLOY_APP_DIR` :

- `docker-compose.yml`
- `.env` (régénéré par le deploy)
- `deploy/remote-deploy.sh`
- `.deploy/last-success.env` (audit trail local)

## Réutilisation sur un autre projet

1. Copier `.github/workflows/`
2. Adapter `IMAGE_NAME`, secrets Harbor, `DEPLOY_*`
3. Garder le flux build → scan → push → sign → verify → deploy
4. Documenter les secrets dans le README du nouveau repo

Je ne repars **pas** d'un workflow monolithique.

## Check-list avant premier run

- [ ] secrets Harbor
- [ ] secrets SSH
- [ ] environment `production` créé (+ reviewers si possible)
- [ ] `DEPLOY_APP_DIR` accessible
- [ ] Harbor joignable depuis le serveur
- [ ] branch protection : CI required sur `main`
- [ ] smoke URL publique correcte (`PUBLIC_BASE_HOST`)

## Ce qui reste optionnel (niveau plateforme)

Pas bloquant pour ce modèle de livraison :

- staging + promotion d'image sans rebuild
- policy-as-code OPA/Conftest
- vérification Cosign aussi côté hôte (en plus du runner)
- pin SHA des actions GitHub
- SLSA provenance consumer côté Harbor
- canary / blue-green (souvent overkill pour une SPA Compose)

## Décision d'architecture

Pour ZENORA et les prochains fronts similaires, je préfère cette base **senior pragmatique** à une usine à gaz.  
Elle est assez stricte pour la supply chain, assez simple pour être reprise, et assez claire pour être débuguée à 3h du matin.
