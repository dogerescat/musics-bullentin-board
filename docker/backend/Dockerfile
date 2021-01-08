FROM node:14.15.3-alpine3.10

RUN  apk update && \
 apk add git && \
 npm install -g npm

ENV APP_HOME /app/backend/api
ENV PATH ${APP_HOME}/node_modules/.bin:$PATH
ENV HOST 0.0.0.0
ENV PORT 8080

EXPOSE 8080