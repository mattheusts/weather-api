FROM node:16

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json yarn.lock tsconfig.json ./
COPY config ./config
COPY src ./src
COPY test ./test
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
RUN yarn
RUN yarn build

EXPOSE 3000
CMD /wait && yarn start
