FROM node:16-alpine
ENV NODE_ENV = production
WORKDIR /app/client
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
# EXPOSE 8080
CMD [ "npm", "run", "serve" ]