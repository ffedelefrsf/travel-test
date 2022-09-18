FROM node:gallium

RUN npm install -g ts-node

WORKDIR /usr/src/app

RUN yarn install

COPY ./ ./

RUN yarn build

CMD [ "yarn", "start" ]
