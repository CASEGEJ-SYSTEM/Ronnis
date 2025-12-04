FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Compilar Angular
RUN npm run build

# Servir con un servidor ligero
RUN npm install -g http-server

CMD ["http-server", "dist", "-p", "4200", "-a", "0.0.0.0"]
