# Pipeline DevSecOps

Ce document décrit la chaîne CI/CD de `zenora360`.  
Base **réutilisable** pour fronts Dockerisés (Harbor + Compose + reverse proxy).

## Niveau de maturité

| Domaine | Niveau | Commentaire |
| ------- | ------ | ----------- |
| Qualité CI | Senior | lint / typecheck / test / build + Hadolint + Gitleaks + dependency review + Sonar QG |
| Supply chain | Senior | build → Trivy gate → push → Cosign keyless → SBOM → provenance ; actions pinées SHA |
| Déploiement | Senior | Cosign sur **digest**, pull par digest, SSH host key pinée, health + rollback vérifié, smoke réseau NPM |
| Réutilisation | Senior | workflows `reusable-*` |
| Observabilité | Senior | step summaries + Slack (status honnête sur resolve/verify/deploy) |

## Philosophie

1. **Un seul chemin de vérité** : Node 22 + npm partout.
2. **Fail closed** sur la supply chain et sur Sonar dès que les secrets existent.
3. **Artefacts vérifiables** : digest, signature, SBOM, provenance.
4. **Déployer une image par digest**, jamais du code brut ni `latest`.
5. **Rollback** avec preuve de santé (`rollback healthy` / `rollback failed`).

## Découpage des workflows

```text
.github/workflows/
├── reusable-quality.yml
├── reusable-notify.yml
├── ci.yml
├── security.yml
├── release.yml
└── deploy.yml
```

### `ci.yml`
- quality via `reusable-quality.yml`
- Gitleaks
- dependency review (**fail-closed** sur PR — Dependency graph requis)
- Hadolint
- SonarQube : si `SONAR_*` présents → `sonar.qualitygate.wait=true` (bloque) ; sinon skip explicite
- `CI summary` agrège et échoue si une gate dure échoue

### `security.yml`
- Trivy fs + config fail-closed HIGH/CRITICAL
- CodeQL `security-extended`
- npm audit advisory
- ZAP baseline hebdo / manuel (`-I`)

### `release.yml`
1. quality  
2. build locale (`push: false`)  
3. Trivy image gate  
4. push Harbor (+ retries)  
5. Cosign keyless → verify  
6. SBOM + provenance  
7. artefact `release-metadata.json` (tag + **digest**)

### `deploy.yml`
1. metadata release ou dispatch (`image_tag` + **`image_digest` obligatoires**)  
2. refuse `latest`  
3. Cosign verify sur `repo@sha256:…`  
4. SSH mux (1 session TCP) + **host key pinée** (`DEPLOY_SSH_KNOWN_HOSTS`)  
5. pull / recreate **par digest** (`IMAGE_REF=…@sha256:…`)  
6. healthcheck ; rollback avec re-test santé  
7. smoke : container + réseau NPM + digest match ; HTTPS public best-effort  

## Secrets GitHub

### Harbor (repo ou org)
- `HARBOR_REGISTRY` — host only, lowercase (`harbor.example.com`)
- `HARBOR_PROJECT` — lowercase
- `HARBOR_USERNAME` / `HARBOR_PASSWORD`

### Déploiement SSH (environment `production`)
- `DEPLOY_SSH_HOST`
- `DEPLOY_SSH_USER`
- `DEPLOY_SSH_KEY` — clé **privée**
- `DEPLOY_SSH_PORT`
- `DEPLOY_APP_DIR`
- `DEPLOY_SSH_KNOWN_HOSTS` — sortie de `ssh-keyscan` (pin SSH)

Générer le known_hosts :

```bash
ssh-keyscan -p "$DEPLOY_SSH_PORT" "$DEPLOY_SSH_HOST"
```

Coller **toute** la sortie dans le secret environment `production` → `DEPLOY_SSH_KNOWN_HOSTS`.  
Sans ce secret, le deploy refuse de démarrer (plus de TOFU `accept-new`).

### Qualité / notify
- `SONAR_HOST_URL` + `SONAR_TOKEN` — active le QG fail-closed
- `SLACK_WEBHOOK_URL` — secret **repository** (pas seulement environment)

## Variables (`production`)

- `PROXY_NETWORK` (défaut `web-proxy`) — réseau Docker Nginx Proxy Manager
- `PUBLIC_BASE_HOST` (ex. `zenora360.com`)

Le conteneur n’ouvre **pas** `:80` hôte. NPM route vers `zenora-web:8080` sur le réseau partagé.

## Protection GitHub (à appliquer)

### Environment `production`
- Required reviewers (au moins 1)
- Deployment branches : **uniquement `main`** (bloque les `workflow_dispatch` depuis une autre branche)

### Branch protection `main`
Checks **required** :
- `CI summary`
- `Security summary`

Force-push / delete branch : désactivés.  
`enforce_admins` : false (hotfix admin possible). Reviews PR non forcées (solo-friendly) — le **vrai** gate humain est l’approval environment `production` avant SSH.

Release n’est pas un check PR (il tourne sur `main` après merge) ; la chaîne reste Release → Deploy.
### Dependency graph
Settings → Code security → **Dependency graph** = Enabled  
Sinon `dependency-review` échoue sur les PR (voulu).

## Cloudflare — exception `/health`

Le smoke public depuis datacenter peut recevoir **403** (Bot Fight / WAF).

Dans Cloudflare (zone `zenora360.com`) :

1. **Security → WAF** (ou Configuration Rules)  
2. Créer une règle :  
   - When : `http.request.uri.path eq "/health"`  
   - Then : Skip Bot Fight Mode / managed challenges (ou Allow)  
3. Optionnel : Cache Rule — Bypass cache pour `/health`

Le smoke **obligatoire** reste : container + réseau `web-proxy`. Le HTTPS public est best-effort tant que CF bloque les bots.

## Convention d'image

```text
<harbor>/<project>/zenora-web:sha-<shortsha>
<harbor>/<project>/zenora-web@sha256:<digest>
```

En prod on déploie **toujours** le digest. Le tag `sha-*` reste l’alias humain.

## Convention serveur

Dans `DEPLOY_APP_DIR` :

- `docker-compose.yml`
- `.env` (régénéré ; contient `IMAGE_REF=…@sha256:…`)
- `deploy/remote-deploy.sh` / `deploy/smoke-test.sh`
- `.deploy/last-success.env`

Harbor : `docker login` le temps du pull, puis **`docker logout`** (trap).

## SSH / pare-feu

- Préférer `ufw allow <port>/tcp` plutôt que `limit` (sinon timeouts multi-connexions ; le workflow utilise déjà ControlMaster).
- `dial tcp … i/o timeout` = paquets qui n’arrivent pas (OVH Network Firewall / UFW / mauvais port secret).

## Check-list

- [ ] secrets Harbor
- [ ] secrets SSH + **`DEPLOY_SSH_KNOWN_HOSTS`** (bloquant au prochain deploy)
- [ ] environment `production` : reviewers + branch `main` only
- [ ] Dependency graph / Dependabot alerts
- [ ] branch protection : `CI summary` + `Security summary`
- [ ] `PROXY_NETWORK` = réseau NPM
- [ ] NPM → `zenora-web:8080`
- [ ] Cloudflare exception `/health` (recommandé)
- [ ] `SONAR_*` configurés (QG fail-closed dès qu’ils existent)
- [ ] `SLACK_WEBHOOK_URL` (repo secret)
- [ ] Au prochain Deploy : **Approuver** l’environment `production` dans l’UI Actions

## Réutilisation

1. Copier `.github/workflows/` + `.github/scripts/` + `deploy/`
2. Adapter `IMAGE_NAME`, secrets, `PROXY_NETWORK`
3. Garder : build → scan → push → sign → verify(digest) → pull(digest) → smoke

## Décision

Pour ZENORA : base **senior pragmatique** — stricte sur la supply chain, simple à opérer, débogable de nuit.
