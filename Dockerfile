FROM node:lts-alpine AS builder
WORKDIR /usr/app
COPY . ./

ARG NEXT_PUBLIC_API_ARG

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_API=$NEXT_PUBLIC_API_ARG

RUN yarn --frozen-lockfile
RUN yarn build

# FROM node:lts-alpine as prod_deps
# WORKDIR /usr/app

# COPY --from=builder /usr/app/.next ./.next
# COPY --from=builder /usr/app/public ./public
# COPY --from=builder /usr/app/package.json ./package.json
# COPY --from=builder /usr/app/yarn.lock ./yarn.lock

# RUN yarn --frozen-lockfile --production

FROM node:lts-alpine
WORKDIR /usr/app

COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/.next ./.next
COPY --from=builder /usr/app/public ./public
COPY --from=builder /usr/app/package.json ./package.json

CMD ["npm", "start"]

