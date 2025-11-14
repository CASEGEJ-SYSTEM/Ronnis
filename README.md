# Instalacion del Contenedor
## Tener abierto el Docker

### Si no lo tienes instalarlo  en

https://www.docker.com/

### Una ves instalarlo y tenerlo ejecutado

## Entrar en la caperta postgres en tu visual studio o la terminal

```
cd postgres

```

## Poner en la terminar una ves adentro de la caperta

```
docker compose up -d

```

### Acceder al CMD para el postgres del contenedor


```
docker exec -it postgres_gym psql -U admin -d FactorFIT

```


### Instalacion de api
```
php artisan install:api
```
# Crear las migraciones

## Entrar en la caperta backend en tu visual studio o la terminal

```
cd backend

```
## Instalar dependencias PHP con Composer
```
composer install
```
### Definir una migración para la tabla users:

```
php artisan make:migration create_users_table

```
## Poner en la terminar una ves adentro de la caperta

```
php artisan migrate:fresh

```

### Crear un modelo


```
php artisan make:model User 
```
### Crear un controlador

```
php artisan make:controller UserController

```
# Correr el servidor del backend

```
php artisan serve

```
# Correr el servidor del frontend dentro de la caprta

```
cd fronted

```
## Instalar las dependencias del proyecto Angular
```
npm install

```

## Correr el servidor del frontend

```
npm start

```
