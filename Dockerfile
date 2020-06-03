FROM node:14-slim

WORKDIR /var/www

COPY . .

RUN yarn install
CMD [ "yarn", "start" ]
