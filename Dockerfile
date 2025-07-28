# Gunakan image Node.js
FROM node:18

# Set working directory
WORKDIR /app

# Salin package.json dan package-lock.json dulu
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code setelah install
COPY . .

# Perintah untuk menjalankan development server
CMD ["npm", "run", "dev"]
