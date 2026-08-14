#!/usr/bin/env bash
# Remote deploy helper — executed on the OVH host via SSH from GitHub Actions.
# Expects env: HARBOR_*, DEPLOY_APP_DIR, WEB_HOST_PORT, IMAGE_TAG, IMAGE_NAME, IMAGE_DIGEST (optional)
set -euo pipefail

cd "${DEPLOY_APP_DIR}"

# Stable project name so recreate works even if DEPLOY_APP_DIR basename changes.
export COMPOSE_PROJECT_NAME="${COMPOSE_PROJECT_NAME:-zenora}"

PREVIOUS_IMAGE="$(docker inspect --format='{{.Config.Image}}' zenora-web 2>/dev/null || true)"

cat > .env <<EOF
HARBOR_REGISTRY=${HARBOR_REGISTRY}
HARBOR_PROJECT=${HARBOR_PROJECT}
IMAGE_TAG=${IMAGE_TAG}
WEB_HOST_PORT=${WEB_HOST_PORT}
COMPOSE_PROJECT_NAME=${COMPOSE_PROJECT_NAME}
EOF

echo "${HARBOR_PASSWORD}" | docker login "${HARBOR_REGISTRY}" -u "${HARBOR_USERNAME}" --password-stdin

TARGET="${HARBOR_REGISTRY}/${HARBOR_PROJECT}/${IMAGE_NAME}:${IMAGE_TAG}"
echo "Pulling ${TARGET}"
docker compose pull web

# container_name: zenora-web conflicts if an older container exists outside this
# compose project (manual docker run, or compose from another directory).
if docker inspect zenora-web >/dev/null 2>&1; then
  project_label="$(docker inspect -f '{{index .Config.Labels "com.docker.compose.project"}}' zenora-web 2>/dev/null || true)"
  service_label="$(docker inspect -f '{{index .Config.Labels "com.docker.compose.service"}}' zenora-web 2>/dev/null || true)"
  if [ "${project_label}" != "${COMPOSE_PROJECT_NAME}" ] || [ "${service_label}" != "web" ]; then
    echo "Removing orphaned container zenora-web (project='${project_label}' service='${service_label}')"
    docker rm -f zenora-web
  fi
fi

docker compose up -d --force-recreate --remove-orphans web

HEALTHY=0
for _ in $(seq 1 24); do
  if curl -fsS "http://127.0.0.1:${WEB_HOST_PORT}/health" >/dev/null 2>&1; then
    HEALTHY=1
    break
  fi
  sleep 5
done

if [ "${HEALTHY}" -ne 1 ]; then
  echo "Deployment healthcheck failed."
  if [ -n "${PREVIOUS_IMAGE}" ] && [ "${PREVIOUS_IMAGE}" != "${TARGET}" ]; then
    PREVIOUS_TAG="${PREVIOUS_IMAGE##*:}"
    echo "Rolling back to ${PREVIOUS_TAG}"
    cat > .env <<EOF
HARBOR_REGISTRY=${HARBOR_REGISTRY}
HARBOR_PROJECT=${HARBOR_PROJECT}
IMAGE_TAG=${PREVIOUS_TAG}
WEB_HOST_PORT=${WEB_HOST_PORT}
COMPOSE_PROJECT_NAME=${COMPOSE_PROJECT_NAME}
EOF
    docker compose up -d --force-recreate web
  fi
  exit 1
fi

# Keep a short audit trail on the host
mkdir -p .deploy
{
  echo "deployed_at=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "image_tag=${IMAGE_TAG}"
  echo "image_digest=${IMAGE_DIGEST:-}"
  echo "previous_image=${PREVIOUS_IMAGE}"
} > ".deploy/last-success.env"

docker image prune -f
echo "Deployment healthy."
