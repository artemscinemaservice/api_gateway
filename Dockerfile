# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS dependencies
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM dependencies AS build
WORKDIR /app

COPY nest-cli.json tsconfig.json tsconfig.build.json ./
COPY src ./src
RUN yarn build

FROM node:22-bookworm-slim AS production
WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true \
	&& yarn cache clean

COPY --from=build /app/dist ./dist

USER node
EXPOSE 3000

CMD ["node", "dist/main.js"]
