#!/usr/bin/env bash
# Post-deploy smoke checks on the OVH host.
# Required: container + PROXY_NETWORK reachability (NPM path).
# Public HTTPS is best-effort — Cloudflare often returns 403 to bots/datacenters.
set -euo pipefail

PROXY_NETWORK="${PROXY_NETWORK:-web-proxy}"
PUBLIC_BASE_HOST="${PUBLIC_BASE_HOST:-zenora360.com}"

echo "== container /health =="
docker exec zenora-web wget -q -O - http://127.0.0.1:8080/health
echo

echo "== docker network ${PROXY_NETWORK} -> zenora-web:8080 =="
docker run --rm --network "${PROXY_NETWORK}" curlimages/curl:8.5.0 \
  -fsS --max-time 15 http://zenora-web:8080/health
echo
code="$(
  docker run --rm --network "${PROXY_NETWORK}" curlimages/curl:8.5.0 \
    -fsS -o /dev/null -w '%{http_code}' --max-time 15 http://zenora-web:8080/
)"
echo "GET / -> ${code}"
case "${code}" in
  200|301|302) ;;
  *)
    echo "Unexpected status from zenora-web on ${PROXY_NETWORK}: ${code}"
    exit 1
    ;;
esac

echo "== public https://${PUBLIC_BASE_HOST} (best-effort) =="
pub="$(
  curl -sS -o /dev/null -w '%{http_code}' --max-time 20 \
    -A 'Mozilla/5.0 (compatible; ZenoraDeploySmoke/1.0)' \
    "https://${PUBLIC_BASE_HOST}/health" || echo '000'
)"
echo "public /health -> ${pub}"
case "${pub}" in
  200)
    echo "Public edge OK"
    ;;
  403|503)
    echo "WARN: public edge returned ${pub} (often Cloudflare bot/WAF)."
    echo "Container + proxy-network checks passed; deploy is considered OK."
    ;;
  *)
    echo "WARN: unexpected public status ${pub}; container path is healthy."
    ;;
esac
