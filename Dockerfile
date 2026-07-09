# =============================================================================
# ZENORA Web - Production Dockerfile
# Multi-stage build for minimal, secure image
# =============================================================================

# Stage 1: Build
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy dependency files first for better caching
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy source and build
COPY . .
RUN bun run build

# Stage 2: Production (Nginx)
FROM nginx:1.27-alpine AS production

# Security: run as non-root
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Security headers & healthcheck
RUN chown -R appuser:appgroup /usr/share/nginx/html && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown appuser:appgroup /var/run/nginx.pid

USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]

# Build metadata
ARG BUILD_DATE
ARG VCS_REF
LABEL org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.source="https://github.com/zenora/zenora-web" \
      org.opencontainers.image.revision="${VCS_REF}" \
      org.opencontainers.image.vendor="ZENORA" \
      org.opencontainers.image.title="ZENORA Web" \
      org.opencontainers.image.description="ZENORA Digital Solutions Platform"