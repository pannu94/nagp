FROM node:lts-alpine
ENV PORT 3000
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
