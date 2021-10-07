FROM node:14.15.3-alpine3.10

RUN apk update && \
 apk add git && \
 npm install -g npm && \
 npm install -g create-nuxt-app@2.15.0

# WORKDIR /app/frontend/nuxt_app

ENV PORT="3000"
ENV HOST="0.0.0.0"

EXPOSE 3000
