FROM node:15
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["node" "index.js"]