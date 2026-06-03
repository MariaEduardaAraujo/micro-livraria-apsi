FROM node
WORKDIR /app
COPY . /app
RUN npm install
CMD ["node", "/app/services/inventory/index.js"]