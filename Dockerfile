# syntax = docker/dockerfile:1

# adjust BUN_VERSION as desired
ARG BUN_VERSION=latest
FROM oven/bun:${BUN_VERSION} as base

LABEL fly_launch_runtime="Bun"

# bun app lives here
WORKDIR /app

# throw-away build stage to reduce size of final image
FROM base as build

# install packages needed to build node modules
RUN apt-get update -qq
RUN apt-get install -y build-essential pkg-config python-is-python3

# copy application code
COPY --link bun.lockb package.json ./
COPY --link . .

# install all dependencies and run production build
RUN bun i --ignore-scripts --frozen-lockfile
RUN bun build:prod

# clear node_modules folder and re-install production dependencies only
RUN rm -rf node_modules
RUN bun i --ignore-scripts --frozen-lockfile --production

# final stage for app image
FROM base

# copy built application
COPY --from=build /app /app

# start the server
EXPOSE 8080
CMD [ "bun", "start" ]
