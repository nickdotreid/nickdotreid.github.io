FROM node:22

ADD ./ /app
WORKDIR /app

CMD npx @11ty/eleventy
