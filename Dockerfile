FROM node:14.20.0-slim
WORKDIR /youtube-downloader
COPY package.json /youtube-downloader
RUN npm install
COPY . /youtube-downloader
CMD ["npm", "start"]
