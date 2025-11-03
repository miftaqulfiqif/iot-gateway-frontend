# Tahap build
FROM node:23.3.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install uplot
RUN npm install mqtt
RUN npm install -D @types/mqtt

# Build args dari docker-compose
ARG VITE_API_URL
ARG VITE_SOCKET_URL
ARG VITE_MQTT_BROKER_URL
ARG VITE_MQTT_USERNAME
ARG VITE_MQTT_PASSWORD

# Set env untuk Vite build
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL
ENV VITE_MQTT_BROKER_URL=$VITE_MQTT_BROKER_URL
ENV VITE_MQTT_USERNAME=$VITE_MQTT_USERNAME
ENV VITE_MQTT_PASSWORD=$VITE_MQTT_PASSWORD

COPY . .
RUN npm run build

# Tahap serve
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Tambahkan konfigurasi custom
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
