# syntax = docker/dockerfile:1

# adjust bun image as desired
FROM oven/bun:latest as base

LABEL fly_launch_runtime="bun"

# bun app lives here
WORKDIR /app

# throw-away build stage to reduce size of final image
FROM base as build

# install packages needed to build node modules
RUN apt-get update -qq
RUN apt-get install -y build-essential pkg-config python-is-python3

# copy application code
COPY --link bun.lock package.json ./
COPY --link . .

# install all dependencies and run production build
RUN bun install --ignore-scripts --frozen-lockfile
RUN bun run build:prod
RUN bun run compile

# final stage for app image
FROM debian:bullseye-slim

# copy built application
COPY --from=build /app/public /app/public
COPY --from=build /app/main /app/main

# set working directory
WORKDIR /app

# start the server
EXPOSE 3000
ENTRYPOINT ["./main"]
