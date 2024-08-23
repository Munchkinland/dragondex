# DragonDex ![pngegg](https://github.com/user-attachments/assets/92431325-2504-48a9-9935-d727c5cd741d)

DragonDex es una aplicación web estática que muestra personajes y planetas del universo Dragon Ball. Utiliza HTML, CSS y JavaScript para proporcionar una interfaz interactiva para buscar y mostrar información sobre personajes y planetas.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuración Local

Para ejecutar la aplicación localmente, sigue estos pasos:

### Clonar el Repositorio

Primero, clona el repositorio:

```bash
git clone https://github.com/tu-usuario/dragondex.git
cd dragondex

````

## Ejecutar imagen en contenedor

Construir y Ejecutar con Docker Compose
Construir y Ejecutar:

Ejecuta el siguiente comando para construir la imagen Docker y levantar el contenedor:

docker-compose up --build

Acceder a la Aplicación:

Abre un navegador web y navega a http://localhost:8080 para ver la aplicación en funcionamiento.

Detener y Eliminar Contenedores:

Para detener y eliminar los contenedores, redes y volúmenes creados por Docker Compose, usa:

docker-compose down
