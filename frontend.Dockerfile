FROM node
WORKDIR /app
COPY . /app
RUN npm install -g serve
CMD ["serve", "-p", "5000", "/app/services/frontend"]