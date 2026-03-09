# 🦁 FaunaPark API

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-black.svg)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue.svg)](https://www.mysql.com/)
[![Jest](https://img.shields.io/badge/Jest-Testing-red.svg)](https://jestjs.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Sistema de gestión integral para parques zoológicos** - Una API REST moderna, escalable y bien documentada para administrar animales, hábitats y operaciones del zoológico.

[Características](#características) • [Instalación](#instalación) • [Uso](#uso) • [API](#documentación-api) • [Testing](#testing) • [Contribuir](#contributing)

</div>

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso-rápido)
- [Documentación API](#documentación-api)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Testing](#testing)
- [Docker](#docker)
- [Contribuir](#contributing)

---

## ✨ Características

- 🐾 **Gestión de Animales** - CRUD completo con validaciones avanzadas
- 🏠 **Gestión de Hábitats** - Control de espacios y recursos
- 🔒 **Validación de Datos** - Usando express-validator con esquemas complejos
- 📊 **Arquitectura en Capas** - Controllers → Services → Database
- 🧪 **Testing Completo** - Unitario e integración con Jest
- 🐳 **Docker Support** - Despliegue fácil con Docker Compose
- 📝 **Logging Avanzado** - Seguimiento de errores y eventos
- ⚡ **Performance** - Optimizado con Knex.js y pool de conexiones
- 🌐 **CORS Habilitado** - Listo para frontend integrado

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

| Requisito | Versión | Descarga |
|-----------|---------|----------|
| **Node.js** | 18+ | [nodejs.org](https://nodejs.org/) |
| **npm** | 9+ | Incluido con Node.js |
| **MySQL** | 8.0+ | [mysql.com](https://www.mysql.com/) |
| **Docker** (opcional) | Latest | [docker.com](https://www.docker.com/) |

---

## 🚀 Instalación

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/tuusuario/faunapark-api.git
cd faunapark-api
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de Datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=faunapark
DB_PORT=3306

# Server
NODE_ENV=development
PORT=8080
LOG_LEVEL=debug

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Paso 4: Inicializar la Base de Datos

```bash
# Con MySQL corriendo, ejecuta:
mysql -u root -p < db/init.sql
```

### Paso 5: Iniciar el Servidor

```bash
npm start
```

✅ El servidor estará disponible en `http://localhost:8080`

---

## ⚙️ Configuración

### Base de Datos

El archivo `src/configuration/database.js` configura la conexión:

```javascript
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
  }
});
```

### Middlewares

- **CORS** - Permite solicitudes cross-origin
- **Express JSON** - Parser de JSON automático
- **Error Handler** - Gestión centralizada de errores

---

## 💡 Uso Rápido

### Ejemplo Básico: Obtener Todos los Animales

```bash
curl -X GET http://localhost:8080/animales \
  -H "Content-Type: application/json"
```

**Respuesta Exitosa (200):**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "nombre": "Leo",
      "especie": "León",
      "edad": 5,
      "habitat_id": 1,
      "descripcion": "Macho adulto muy activo",
      "estado": "activo"
    }
  ]
}
```

### Ejemplo: Crear un Nuevo Animal

```bash
curl -X POST http://localhost:8080/animales \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Simba",
    "especie": "León",
    "edad": 3,
    "habitat_id": 1,
    "descripcion": "León joven macho"
  }'
```

**Respuesta Exitosa (201):**
```json
{
  "status": "success",
  "message": "Animal creado correctamente",
  "data": {
    "id": 2,
    "nombre": "Simba",
    "especie": "León",
    "edad": 3,
    "habitat_id": 1,
    "descripcion": "León joven macho",
    "estado": "activo"
  }
}
```

---

## 📚 Documentación API

### 🐾 Animales

#### GET /animales
Obtiene todos los animales registrados con opcionalmente filtrados.

```bash
# Listar todos
GET /animales

# Filtrar por especie
GET /animales?especie=León

# Paginar
GET /animales?page=1&limit=10
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `especie` | string | Filtrar por especie |
| `page` | number | Número de página (default: 1) |
| `limit` | number | Elementos por página (default: 20) |
| `estado` | string | Filtrar por estado (activo/inactivo) |

#### GET /animales/:id
Obtiene los detalles de un animal específico.

```bash
GET /animales/1
```

**Respuesta:**
```json
{
  "id": 1,
  "nombre": "Leo",
  "especie": "León",
  "edad": 5,
  "habitat_id": 1,
  "descripcion": "Macho adulto",
  "estado": "activo",
  "fecha_entrada": "2020-06-15",
  "peso": 190
}
```

#### POST /animales
Crea un nuevo animal.

```bash
POST /animales
Content-Type: application/json

{
  "nombre": "Elefanta",
  "especie": "Elefante",
  "edad": 8,
  "habitat_id": 2,
  "descripcion": "Hembra adulta de gran tamaño",
  "peso": 4500
}
```

**Validaciones:**
```javascript
// Campos requeridos
- nombre: string (3-100 caracteres)
- especie: string (alfabético)
- edad: number (0-150)
- habitat_id: number (existe en BD)
- descripcion: string (opcional, max 500 caracteres)
```

#### PUT /animales/:id
Actualiza un animal existente.

```bash
PUT /animales/1
Content-Type: application/json

{
  "edad": 6,
  "descripcion": "Ahora tiene 6 años"
}
```

#### DELETE /animales/:id
Elimina un animal del sistema.

```bash
DELETE /animales/1
```

**Respuesta:**
```json
{
  "status": "success",
  "message": "Animal eliminado correctamente"
}
```

---

### 🏠 Hábitats

#### GET /habitats
Obtiene todos los hábitats disponibles.

```bash
GET /habitats
```

**Respuesta:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "nombre": "Sabana Africana",
      "tipo": "Exterior",
      "area_m2": 5000,
      "capacidad": 15,
      "animales_actuales": 3,
      "temperatura_ideal": 28,
      "descripcion": "Hábitat para felinos y herbívoros africanos"
    }
  ]
}
```

#### POST /habitats
Crea un nuevo hábitat.

```bash
POST /habitats
Content-Type: application/json

{
  "nombre": "Acuario Principal",
  "tipo": "Interior",
  "area_m2": 2000,
  "capacidad": 50,
  "temperatura_ideal": 24,
  "descripcion": "Acuario con especies marinas"
}
```

#### PUT /habitats/:id
Actualiza información del hábitat.

```bash
PUT /habitats/1
Content-Type: application/json

{
  "temperatura_ideal": 26,
  "capacidad": 20
}
```

#### DELETE /habitats/:id
Elimina un hábitat.

```bash
DELETE /habitats/1
```

---

## 📊 Estructura del Proyecto

```
faunapark-api/
├── 📁 src/
│   ├── app.js                          # Punto de entrada
│   ├── 📁 configuration/
│   │   └── database.js                 # Configuración Knex
│   ├── 📁 controller/
│   │   ├── animales.js                 # Lógica de manejo de animales
│   │   └── habitats.js                 # Lógica de manejo de hábitats
│   ├── 📁 service/
│   │   ├── animales.js                 # Servicios de negocio
│   │   └── habitats.js
│   ├── 📁 route/
│   │   ├── animales.js                 # Rutas de animales
│   │   └── habitats.js                 # Rutas de hábitats
│   ├── 📁 validators/
│   │   ├── animales.js                 # Esquemas de validación
│   │   └── habitats.js
│   ├── 📁 middlewares/
│   │   ├── errorHandler.js             # Manejo global de errores
│   │   └── validateResult.js           # Validación de resultados
│   └── 📁 utils/
│       ├── animalname.utils.js         # Utilidades nombres
│       ├── description.utils.js        # Utilidades descripciones
│       ├── maxage.utils.js             # Validaciones edad
│       └── 📁 test/
│           ├── animalname.utils.test.js
│           ├── description.utils.test.js
│           └── maxage.utils.test.js
├── 📁 db/
│   └── init.sql                        # Script de inicialización
├── 📄 docker-compose.dev.yaml          # Composición Docker
├── 📄 package.json
└── 📄 .env.example

```

### Flujo de Datos

```
HTTP Request
    ↓
Route (route/animales.js)
    ↓
Middleware Validator (validateResult.js)
    ↓
Controller (controller/animales.js) ← Valida y orquesta
    ↓
Service (service/animales.js) ← Lógica de negocio
    ↓
Database (knex) ← Consultas SQL
    ↓
Response JSON
```

---

## 🧪 Testing

### Ejecutar Todas las Pruebas

```bash
npm test
```

### Pruebas Unitarias

```bash
npm run test:unit
```

Genera cobertura de:
- Controllers
- Services
- Validators

### Pruebas en Modo Watch

```bash
npm run test:watch
```

Ideal para desarrollo interactivo.

### Cobertura de Tests

```bash
npm run test:coverage
```

Genera reporte detallado en `coverage/lcov.info`

### Ejemplo de Test

```javascript
// src/utils/test/animalname.utils.test.js
describe('Animal Name Validator', () => {
  test('should validate correct animal names', () => {
    expect(validateAnimalName('Leo')).toBe(true);
  });

  test('should reject invalid names', () => {
    expect(validateAnimalName('123')).toBe(false);
  });

  test('should reject names with special characters', () => {
    expect(validateAnimalName('Leo@#$')).toBe(false);
  });
});
```

### Pruebas de Integración con Supertest

```javascript
const request = require('supertest');
const app = require('../app');

describe('Animals API', () => {
  test('GET /animales should return status 200', async () => {
    const response = await request(app)
      .get('/animales')
      .expect(200);
    
    expect(response.body.status).toBe('success');
  });

  test('POST /animales should create new animal', async () => {
    const response = await request(app)
      .post('/animales')
      .send({
        nombre: 'Nuevo Animal',
        especie: 'Leopardo',
        edad: 3,
        habitat_id: 1
      })
      .expect(201);
    
    expect(response.body.data.id).toBeDefined();
  });
});
```

---

## 🐳 Docker

### Levantar Entorno Completo

```bash
docker-compose -f docker-compose.dev.yaml up -d
```

Esto inicia:
- Servidor Node.js en puerto 8080
- Base de datos MySQL en puerto 3306

### Ver Logs

```bash
docker-compose -f docker-compose.dev.yaml logs -f
```

### Detener Servicios

```bash
docker-compose -f docker-compose.dev.yaml down
```

### Archivo docker-compose.dev.yaml

```yaml
version: '3.8'
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: faunapark
    ports:
      - "3306:3306"
    volumes:
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql
  
  api:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      DB_HOST: db
      DB_USER: root
      DB_PASSWORD: root
      DB_NAME: faunapark
```

---

## 🔐 Manejo de Errores

El sistema implementa manejo centralizado de errores:

```javascript
// errorHandler.js
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Error interno del servidor';
  
  res.status(status).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});
```

### Respuestas de Error Comunes

| Código | Significado | Ejemplo |
|--------|------------|---------|
| **400** | Bad Request | Validación fallida |
| **404** | Not Found | Recurso no existe |
| **500** | Server Error | Error inesperado |

```json
{
  "status": "error",
  "message": "El campo 'nombre' es requerido",
  "details": ["nombre es obligatorio"]
}
```

---

## 📈 Performance y Optimización

### Conexión a Base de Datos con Pool

```javascript
const pool = knex({
  client: 'mysql2',
  connection: {
    // ...
  },
  pool: { min: 2, max: 10 }
});
```

### Índices Recomendados

```sql
CREATE INDEX idx_animals_species ON animales(especie);
CREATE INDEX idx_animals_habitat ON animales(habitat_id);
CREATE INDEX idx_animals_status ON animales(estado);
CREATE INDEX idx_habitats_type ON habitats(tipo);
```

---

## 🚀 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| Start | `npm start` | Inicia servidor en puerto 8080 |
| Test | `npm test` | Ejecuta todos los tests |
| Test Unit | `npm run test:unit` | Solo tests unitarios |
| Test Watch | `npm run test:watch` | Modo vigilancia |
| Coverage | `npm run test:coverage` | Reporte de cobertura |
| Integration | `npm run test:integration` | Tests de integración |


---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 📧 Contacto y Soporte

- **Issues**: [GitHub Issues](https://github.com/tuusuario/faunapark-api/issues)
- **Email**: support@faunapark.com
- **Documentación**: [Wiki](https://github.com/tuusuario/faunapark-api/wiki)

---

## 🎯 Hoja de Ruta

- [ ] Autenticación JWT
- [ ] Sistema de roles y permisos
- [ ] Reportes avanzados
- [ ] Integración de cámara en vivo
- [ ] Sistema de alertas
- [ ] Dashboard administrativo
- [ ] API GraphQL

---

## 👥 Creadores del Proyecto

FaunaPark API fue creado con pasión por dos desarrolladores dedicados que forman la asociación.

<div align="center">

### Nuestro Equipo

| | **Hugo** | **Javi** |
|:---:|:---:|:---:|
| **Perfil** | [![Hugo Avatar](https://avatars.githubusercontent.com/u/MT22HUGO?v=4&s=150)](https://github.com/MT22HUGO) | [![Javi Avatar](https://avatars.githubusercontent.com/u/Javiii3r?v=4&s=150)](https://github.com/Javiii3r) |
| **GitHub** | [@MT22HUGO](https://github.com/MT22HUGO) | [@Javiii3r](https://github.com/Javiii3r) |
| **Rol** | Full Stack Developer | Full Stack Developer |

</div>

---

<div align="center">

**Hecho con ❤️ por el equipo de FaunaPark**

[⬆ Volver al inicio](#-faunapark-api)

</div>