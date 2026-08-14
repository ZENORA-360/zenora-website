#!/usr/bin/env bash
# Write and validate the deploy private key from DEPLOY_SSH_KEY.
set -euo pipefail

key="$(printf '%s' "${DEPLOY_SSH_KEY:?DEPLOY_SSH_KEY is empty}" | tr -d '\r')"
install -d -m 700 "${HOME}/.ssh"
KEY_FILE="${HOME}/.ssh/zenora-deploy"
printf '%s\n' "$key" > "${KEY_FILE}"
chmod 600 "${KEY_FILE}"

if ! ssh-keygen -y -f "${KEY_FILE}" >/dev/null 2>&1; then
  echo "DEPLOY_SSH_KEY does not parse as a private key."
  echo "Paste the PRIVATE key (BEGIN OPENSSH/RSA PRIVATE KEY), not the .pub."
  exit 1
fi

echo "KEY_FILE=${KEY_FILE}" >> "${GITHUB_ENV}"
echo "deploy key parsed OK"
