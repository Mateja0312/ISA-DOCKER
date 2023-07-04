FROM node:16-alpine
ENV NODE_ENV = production
WORKDIR /app/server
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
# EXPOSE 9091
CMD [ "npm", "start" ]