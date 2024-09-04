# Etapa de construcción
FROM node:alpine as build

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala todas las dependencias, incluyendo las de desarrollo
RUN npm ci

# Copia los archivos de la aplicación
COPY . .

# Instala explícitamente @rollup/rollup-linux-x64-musl
RUN npm install @rollup/rollup-linux-x64-musl

# Construye la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copia los archivos construidos de la etapa de construcción
COPY --from=build /app/dist /usr/share/nginx/html

# Añade tu nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Inicia nginx
CMD ["nginx", "-g", "daemon off;"]