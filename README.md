# API Gateway

HTTP entrypoint for the cinema service backend. It exposes REST endpoints and forwards auth-related calls to `auth-service` over gRPC.

## Requirements

- Node.js 20+ for local development.
- Yarn 1.x.
- Docker, when building the production image.

## Local development

Install dependencies:

```bash
yarn install
```

Run in watch mode:

```bash
yarn start:dev
```

Required local environment variables:

```text
HTTP_HOST=http://localhost:3000
HTTP_PORT=3000
HTTP_CORS=http://localhost:3000
AUTH_GRPC_URL=localhost:50051
```

When running inside Docker Compose, `AUTH_GRPC_URL` should point to the service name:

```text
AUTH_GRPC_URL=auth-service:50051
```

## Build and run

Compile TypeScript:

```bash
yarn build
```

Run the compiled app:

```bash
yarn start:prod
```

The production entrypoint is `dist/main.js`.

## Tests

```bash
yarn test
yarn test:e2e
yarn test:cov
```

## Docker image

The production Dockerfile is [Dockerfile](./Dockerfile). It uses a multi-stage build:

- installs dependencies with `yarn install --frozen-lockfile`;
- compiles the Nest app;
- installs production dependencies only in the runtime image;
- runs as the non-root `node` user;
- starts with `node dist/main.js`.

Build the image from the backend root:

```bash
docker build -t ghcr.io/your-org/cinema-api-gateway:latest -f api-gateway/Dockerfile api-gateway
```

Run locally with an already running auth service:

```bash
docker run --rm \
  -p 3000:3000 \
  -e HTTP_HOST=http://localhost:3000 \
  -e HTTP_PORT=3000 \
  -e AUTH_GRPC_URL=host.docker.internal:50051 \
  ghcr.io/your-org/cinema-api-gateway:latest
```

## Compose deployment

The Docker Compose production files live in `../docker`:

- `docker/compose.prod.yaml` runs this service from `API_GATEWAY_IMAGE`.
- `docker/compose.prod.infra.yaml` adds containerized PostgreSQL and Redis for `auth-service`.
- `docker/compose.prod.aws-managed.yaml` uses AWS-managed PostgreSQL and Redis-compatible services.

Set the image in `docker/env/prod.env`:

```text
API_GATEWAY_IMAGE=ghcr.io/your-org/cinema-api-gateway:latest
```
