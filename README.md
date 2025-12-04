# Instalacion del Contenedor
## Tener abierto el Docker
### Si no lo tienes instalarlo  en
https://www.docker.com/

## Una ves instalarlo y tenerlo ejecutado
### Entrar en la caperta postgres en tu visual studio o la terminal
```
cd postgres
```
### Poner en la terminar una ves adentro de la caperta
```
docker compose up -d
```
### Acceder al CMD para el postgres del contenedor
```
docker exec -it postgres_gym psql -U admin -d FactorFIT
```
# En tu visual studio o la terminal al abrir el proyecto al ver la caperta Backend
## Debes buscar un archiivo llamado 
```
.env.example
```
## Debdes quitarle el 
```
.example
```
## Para dejarlo solamente asi
```
.env
```
## Para que se pueda interactuar con el sistema de Backend

# Entrar en la caperta backend 
```
cd backend
```
## Instalar dependencias PHP con Composer
```
composer install
```
### Poner en la terminar una ves adentro de la caperta migraciones de las tablas y datos
```
php artisan migrate:fresh
```

# Correr el servidor del backend
```
php artisan serve
```

# Correr el servidor del frontend dentro de la caperta
```
cd fronted
```
## Pero antes Instalar las dependencias del proyecto Angular
```
npm install
```
### Correr el servidor del frontend
```
npm start
```


# Instalar dependecias para crear Qr dentro del backend
```
composer require simplesoftwareio/simple-qrcode
```