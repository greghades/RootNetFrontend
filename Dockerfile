# Usa una imagen oficial de Node.js
FROM node:18

# Configura el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos esenciales para instalar dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install
RUN npm install -g expo-cli

# Copia el resto del código fuente al contenedor
COPY . .

# Establece variables de entorno necesarias para Expo
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0

# Expone los puertos necesarios para Expo y Metro Bundler
EXPOSE 8081 19000 19001 19002

# Comando de inicio (usando 'expo start' en modo LAN)
CMD ["npx", "expo", "start", "--lan", "--host", "0.0.0.0"]
