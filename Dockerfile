FROM node:10.13.0
COPY package.json /tmp
COPY .npmrc /tmp
WORKDIR /tmp

RUN npm install
RUN npm i -S express

COPY . /tmp
WORKDIR /tmp

ENV NODE_ENV=prod
ENV GCF_API=https://us-central1-college-sports-vision.cloudfunctions.net/
ENV API=https://api.thesportsremote.com/api/
ENV ACTIVATION_URL=https://api.thesportsremote.com/api/client/device/install/

RUN ls

RUN npm run build

RUN ls

EXPOSE 8080


ENTRYPOINT ["node", "server"]
#ENTRYPOINT ["tail", "-f", "/dev/null"]
