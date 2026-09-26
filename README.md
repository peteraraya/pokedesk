<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/" target="blank"><img src="https://img.shields.io/npmjs.com/v/@nestjs/core.svg" alt="NPM Version" /></a>
</p>

# Pokédex API con NestJS + MongoDB

Aplicación backend desarrollada con NestJS para gestionar una Pokédex, usando MongoDB como base de datos y Docker para levantar la infraestructura local fácilmente.

La API permite crear, consultar, actualizar y eliminar Pokémon; además incluye un módulo de sembrado de datos iniciales consumiendo la PokeAPI.

## Tabla de contenido

- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Conceptos clave](#conceptos-clave)
- [Requisitos previos](#requisitos-previos)
- [Configuración del entorno](#configuración-del-entorno)
- [Instalación](#instalación)
- [Ejecución en desarrollo](#ejecución-en-desarrollo)
- [Ejecución en producción](#ejecución-en-producción)
- [Endpoints principales](#endpoints-principales)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Pruebas](#pruebas)
- [Notas importantes](#notas-importantes)

## Tecnologías utilizadas

- NestJS: framework backend basado en Node.js y TypeScript.
- MongoDB: base de datos NoSQL para almacenar información de Pokémon.
- Mongoose: ODM para modelar documentos y trabajar con MongoDB desde NestJS.
- Docker + Docker Compose: levantar MongoDB de forma reproducible y aislada.
- TypeScript: tipado estático y mejor mantenibilidad.
- class-validator + class-transformer: validación de DTOs y transformación automática.
- Axios: consumo de la API pública de PokéAPI.

## Arquitectura del proyecto

Este proyecto sigue una estructura modular de NestJS, donde cada funcionalidad se organiza en módulos independientes.

### Patrón principal

- `AppModule`: módulo raíz de la aplicación.
- `PokemonModule`: módulo de dominio para Pokémon.
- `SeedModule`: módulo encargado de poblar la base de datos con datos iniciales.
- `CommonModule`: reutilización de utilidades, DTOs y adaptadores compartidos.

### Flujo de la aplicación

1. El servidor inicia en `main.ts`.
2. `AppModule` se registra con:
   - carga de variables de entorno
   - validación del archivo `.env`
   - conexión a MongoDB
   - montaje de la API bajo el prefijo `api/v2`
3. Cada módulo define su controller, service y modelos de Mongoose.
4. Los controladores reciben HTTP requests y delegan la lógica al servicio.
5. Los servicios interactúan con MongoDB usando modelos de Mongoose.

## Conceptos clave

### 1) NestJS

NestJS es un framework backend para Node.js que usa una arquitectura modular y orientada a servicios. Inspirado en Angular, organiza la aplicación en:

- módulos
- controladores
- servicios
- proveedores
- DTOs
- pipes

Esto ayuda a mantener el código ordenado y escalable.

### 2) Módulos

Un módulo agrupa lógica relacionada. En este proyecto:

- `PokemonModule` contiene la entidad Pokémon, el DTO, el servicio y el controlador.
- `SeedModule` genera la semilla inicial de datos.

La idea es que cada módulo encapsule su responsabilidad y pueda reutilizarse.

### 3) Controladores

Los controladores definen las rutas HTTP y reciben las peticiones del cliente.

Por ejemplo, en `PokemonController` se exponen endpoints como:

- `POST /api/v2/pokemon`
- `GET /api/v2/pokemon`
- `GET /api/v2/pokemon/:term`
- `PATCH /api/v2/pokemon/:term`
- `DELETE /api/v2/pokemon/:id`

### 4) Servicios

Los servicios contienen la lógica de negocio. Aquí se valida, se consultan datos, se transforman datos y se ejecutan operaciones sobre MongoDB.

En `PokemonService` se implementan operaciones como:

- crear un Pokémon
- listar con paginación
- buscar por ID, número o nombre
- actualizar un registro
- eliminar un registro

### 5) MongoDB + Mongoose

MongoDB es una base de datos documental. Mongoose permite definir esquemas para estructurar datos y trabajar con modelos.

La entidad `Pokemon` tiene:

- `name`: nombre único
- `no`: número único

Esto asegura que no se dupliquen registros con el mismo nombre o número.

### 6) DTOs

Los DTOs (Data Transfer Objects) definen la estructura esperada de los datos entrantes.

Se usan para:

- validar entradas
- transformar datos
- evitar que el cliente envíe campos extraños o no permitidos

En este proyecto los DTOs viven en `src/pokemon/dto`. También existe `PaginationDto` para la paginación.

### 7) Pipes

Los pipes permiten transformar o validar datos antes de que lleguen al controlador o al servicio.

Ejemplo en este proyecto:

- `ParseMongoIdPipe`: valida que el ID recibido sea un ObjectID válido de MongoDB.

### 8) Validación global

En `main.ts` se configura un `ValidationPipe` global con:

- `whitelist: true`: elimina propiedades no definidas
- `forbidNonWhitelisted: true`: rechaza propiedades extra
- `transform: true`: convierte tipos automáticamente

Esto hace la API más segura y consistente.

### 9) Seed o semilla de datos

El módulo `SeedModule` se encarga de poblar la base de datos desde la API pública de Pokémon.

Proceso:

1. borra los registros actuales
2. llama a PokeAPI
3. extrae nombre y número del Pokémon
4. inserta muchos documentos a MongoDB

Esto sirve para inicializar el proyecto con datos reales de ejemplo.

## Requisitos previos

Necesitas tener instalado en tu máquina:

- Node.js 18 o superior
- npm o yarn
- Docker y Docker Compose
- Git

## Configuración del entorno

Crea un archivo `.env` en la raíz del proyecto con esta configuración:

```env
MONGODB_URL=mongodb://localhost:27017/nest-pokemon
PORT=3001
DEFAULT_LIMIT=5
```

### Variables explicadas

- `MONGODB_URL`: cadena de conexión a MongoDB.
- `PORT`: puerto en el que correrá la API.
- `DEFAULT_LIMIT`: cantidad de resultados por defecto al paginar.

### Validación de entorno

El proyecto usa `@nestjs/config` y `Joi` para validar variables esenciales en `src/config/joi.validation.ts`.

Esto evita que la app arranque con valores faltantes o inválidos.

## Instalación

Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd pokedex
```

Instala dependencias:

```bash
npm install
```

O con Yarn:

```bash
yarn install
```

## Ejecución en desarrollo

1. Levantar MongoDB con Docker:

```bash
docker-compose up -d
```

2. Iniciar la aplicación en modo watch:

```bash
npm run start:dev
```

O con Yarn:

```bash
yarn start:dev
```

3. La API quedará disponible en:

```bash
http://localhost:3001
```

> Ajusta el puerto según tu `.env`.

4. Para cargar datos iniciales, visita:

```bash
http://localhost:3001/api/v2/seed
```

Esto ejecuta el proceso de sembrado.

## Ejecución en producción

Construir la aplicación:

```bash
npm run build
```

Ejecutar:

```bash
npm run start:prod
```

## Endpoints principales

La API usa el prefijo global:

```bash
/api/v2
```

### Pokémon

#### Crear Pokémon

```http
POST /api/v2/pokemon
```

Body ejemplo:

```json
{
  "name": "pikachu",
  "no": 25
}
```

#### Obtener todos

```http
GET /api/v2/pokemon?limit=5&offset=0
```

#### Buscar por término

```http
GET /api/v2/pokemon/pikachu
GET /api/v2/pokemon/25
GET /api/v2/pokemon/507f1f77bcf86cd799439011
```

#### Actualizar

```http
PATCH /api/v2/pokemon/pikachu
```

#### Eliminar

```http
DELETE /api/v2/pokemon/:id
```

### Seed

```http
GET /api/v2/seed
```

Ejecuta la inserción masiva desde PokeAPI.

## Estructura del proyecto

```text
pokedex/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── common/
│   │   ├── adapters/
│   │   ├── dto/
│   │   ├── interfaces/
│   │   └── pipes/
│   ├── config/
│   │   ├── env.config.ts
│   │   └── joi.validation.ts
│   ├── pokemon/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── pokemon.controller.ts
│   │   ├── pokemon.module.ts
│   │   └── pokemon.service.ts
│   └── seed/
│       ├── interfaces/
│       ├── seed.controller.ts
│       ├── seed.module.ts
│       └── seed.service.ts
├── public/
├── test/
├── .env
├── docker-compose.yaml
├── package.json
├── tsconfig.json
├── nest-cli.json
├── README.md
└── ...
```

## Pruebas

Ejecuta la suite de pruebas:

```bash
npm run test
```

También puedes correr pruebas E2E:

```bash
npm run test:e2e
```

## Notas importantes

### Base de datos local

El proyecto usa MongoDB en localhost, por lo que es necesario tener el contenedor levantado antes de iniciar NestJS.

### Errores comunes

#### Error: invalid scheme / invalid connection string

Si ves un mensaje como:

```bash
MongoParseError: Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://"
```

revisa lo siguiente:

- que el archivo `.env` exista
- que la variable `MONGODB_URL` tenga el formato correcto
- que no haya espacios, comillas o caracteres extraños
- que `ConfigModule` esté cargando correctamente el archivo de entorno

Ejemplo válido:

```env
MONGODB_URL=mongodb://localhost:27017/nest-pokemon
```

### Base de datos vacía

Si la app corre pero no ves datos, ejecuta la ruta de semilla:

```bash
http://localhost:3001/api/v2/seed
```

## Conclusión

Este proyecto es una excelente base para aprender arquitectura backend con NestJS, manejo de MongoDB con Mongoose y consumo de APIs externas. Además muestra una estructura clara y profesional para construir APIs REST con validación, paginación y seeders.

Si quieres continuar el proyecto, puedes ampliarlo con:

- autenticación JWT
- validación de roles
- paginación más avanzada
- Swagger/OpenAPI
- pruebas unitarias e integración
- manejo de archivos y uploads
- deployment en Docker/Nginx

## Licencia

Este proyecto se distribuye como ejemplo académico y de aprendizaje. Puedes adaptarlo libremente según tus necesidades.
