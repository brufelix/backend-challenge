FROM node:20 AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY --from=build /app/dist ./dist

EXPOSE 3333

CMD ["yarn", "start"]
