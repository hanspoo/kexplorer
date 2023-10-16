FROM node:14-alpine as dependencies
WORKDIR /supernova
COPY package.json package-lock.json ./
RUN npm install

FROM node:14-alpine as builder
WORKDIR /supernova
COPY . .
COPY --from=dependencies /supernova/node_modules ./node_modules
RUN npm run build

FROM node:14-alpine as runner
WORKDIR /supernova
ENV NODE_ENV production

COPY --from=builder /supernova/next.config.js ./
COPY --from=builder /supernova/public ./public
COPY --from=builder /supernova/.next ./.next
COPY --from=builder /supernova/node_modules ./node_modules
COPY --from=builder /supernova/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]


#
# Dockerfile taken from:
# https://www.koyeb.com/tutorials/how-to-dockerize-and-deploy-a-next-js-application-on-koyeb
#
