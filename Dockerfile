# Usa la imagen base de Nginx
FROM nginx:alpine

# Copia los archivos estáticos al directorio de contenido de Nginx
COPY . /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80
