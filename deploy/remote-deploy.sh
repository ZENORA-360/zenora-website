#!/usr/bin/env bash
# Remote deploy helper — executed on the OVH host via SSH from GitHub Actions.
# Expects: HARBOR_*, DEPLOY_APP_DIR, IMAGE_TAG, IMAGE_NAME, IMAGE_DIGEST (optional)
# Optional: PROXY_NETWORK (default web-proxy) — Docker network shared with Nginx Proxy Manager
set -euo pipefail

cd "${DEPLOY_APP_DIR}"

export COMPOSE_PROJECT_NAME="${COMPOSE_PROJECT_NAME:-zenora}"
export PROXY_NETWORK="${PROXY_NETWORK:-web-proxy}"

PREVIOUS_IMAGE="$(docker inspect --format='{{.Config.Image}}' zenora-web 2>/dev/null || true)"

cat > .env <<EOF
HARBOR_REGISTRY=${HARBOR_REGISTRY}
HARBOR_PROJECT=${HARBOR_PROJECT}
IMAGE_TAG=${IMAGE_TAG}
COMPOSE_PROJECT_NAME=${COMPOSE_PROJECT_NAME}
PROXY_NETWORK=${PROXY_NETWORK}
EOF

if ! docker network inspect "${PROXY_NETWORK}" >/dev/null 2>&1; then
  echo "Docker network '${PROXY_NETWORK}' not found."
  echo "Create it (or point PROXY_NETWORK at your Nginx Proxy Manager network), then retry."
  docker network ls
  exit 1
fi

echo "${HARBOR_PASSWORD}" | docker login "${HARBOR_REGISTRY}" -u "${HARBOR_USERNAME}" --password-stdin

TARGET="${HARBOR_REGISTRY}/${HARBOR_PROJECT}/${IMAGE_NAME}:${IMAGE_TAG}"
echo "Pulling ${TARGET}"
docker compose pull web

# container_name conflicts if an older container exists outside this compose project.
if docker inspect zenora-web >/dev/null 2>&1; then
  project_label="$(docker inspect -f '{{index .Config.Labels "com.docker.compose.project"}}' zenora-web 2>/dev/null || true)"
  service_label="$(docker inspect -f '{{index .Config.Labels "com.docker.compose.service"}}' zenora-web 2>/dev/null || true)"
  if [ "${project_label}" != "${COMPOSE_PROJECT_NAME}" ] || [ "${service_label}" != "web" ]; then
    echo "Removing orphaned container zenora-web (project='${project_label}' service='${service_label}')"
    docker rm -f zenora-web
  fi
fi

docker compose up -d --force-recreate --remove-orphans web

check_health() {
  docker exec zenora-web wget --no-verbose --tries=1 --spider "http://127.0.0.1:8080/health" >/dev/null 2>&1
}

HEALTHY=0
for _ in $(seq 1 24); do
  if check_health; then
    HEALTHY=1
    break
  fi
  sleep 5
done

if [ "${HEALTHY}" -ne 1 ]; then
  echo "Deployment healthcheck failed (container :8080/health)."
  docker ps -a --filter name=zenora-web --no-trunc || true
  docker logs --tail 80 zenora-web || true
  if [ -n "${PREVIOUS_IMAGE}" ] && [ "${PREVIOUS_IMAGE}" != "${TARGET}" ]; then
    PREVIOUS_TAG="${PREVIOUS_IMAGE##*:}"
    echo "Rolling back to ${PREVIOUS_TAG}"
    cat > .env <<EOF
HARBOR_REGISTRY=${HARBOR_REGISTRY}
HARBOR_PROJECT=${HARBOR_PROJECT}
IMAGE_TAG=${PREVIOUS_TAG}
COMPOSE_PROJECT_NAME=${COMPOSE_PROJECT_NAME}
PROXY_NETWORK=${PROXY_NETWORK}
EOF
    docker compose up -d --force-recreate web
  fi
  exit 1
fi

mkdir -p .deploy
{
  echo "deployed_at=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "image_tag=${IMAGE_TAG}"
  echo "image_digest=${IMAGE_DIGEST:-}"
  echo "previous_image=${PREVIOUS_IMAGE}"
  echo "proxy_network=${PROXY_NETWORK}"
} > ".deploy/last-success.env"

docker image prune -f
echo "Deployment healthy on network ${PROXY_NETWORK} (zenora-web:8080)."
