<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

  <p align="center">
    <a href="https://www.npmjs.com/" target="blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  </p>

# - Aplicación de Pokedex con NestJS y MongoDB
  
  

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Instalar dependencias

  ```bash
  $ npm install 
  ```

3. Tener CLI de nest instalado

```bash
$ npm install -g @nestjs/cli
```


4. Levantar la base de datos

```bash
$ docker-compose up -d
```

6. Reconstruir la base de datos solo en desarrollo

```bash
$ http://localhost:3000/seed
```


6. Ejecutar el servidor

```bash
$ npm run start:dev
```

# Ejecutar en producción

```bash
$ npm run start:prod
```

# Tests

```bash
$ npm run test
```



# Stack utilizado 
- NestJS
- MongoDB
- Docker
- Docker Compose
- TypeScript
- Mongoose
