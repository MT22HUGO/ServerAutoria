<div align="center">
  <h1>🦁 FaunaPark API</h1>
  
  ### Sistema de gestión integral para parques zoológicos
  
  [![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-5.1.0-black.svg)](https://expressjs.com/)
  [![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue.svg)](https://www.mysql.com/)
  [![Jest](https://img.shields.io/badge/Jest-Testing-red.svg)](https://jestjs.io/)
  [![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](https://www.docker.com/)
  [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
  
  <p align="center">
    <strong>Una API REST moderna, escalable y bien documentada</strong> para administrar animales, hábitats y operaciones del zoológico con arquitectura en capas y testing completo.
  </p>
</div>

---

## 📋 Descripción

**FaunaPark API** es una plataforma backend completa para la gestión integral de zoológicos y parques de animales, desarrollada con las últimas tecnologías de Node.js. La API proporciona endpoints RESTful robuostos para explorar, crear, actualizar y eliminar información sobre animales y sus hábitats, con validaciones avanzadas y manejo de errores centralizado.

El proyecto sigue una arquitectura profesional en capas (Controllers → Services → Database) garantizando mantenibilidad, escalabilidad y facilidad de testing.

## ✨ Características

- 🐾 **Gestión de Animales** - CRUD completo con validaciones avanzadas y filtrados
- 🏠 **Gestión de Hábitats** - Control integral de espacios y recursos disponibles
- 🔒 **Validación de Datos** - express-validator con esquemas complejos y personalizados
- 📊 **Arquitectura en Capas** - Separación clara: Controllers → Services → Database
- 🧪 **Testing Completo** - Unitario e integración con Jest y Supertest
- 🐳 **Docker Support** - Despliegue containerizado con Docker Compose
- ⚡ **Performance Optimizado** - Knex.js con pool de conexiones a BD
- 🌐 **CORS Habilitado** - Listo para integración con frontend
- 📝 **Manejo de Errores** - Gestión centralizada con respuestas consistentes
- 📚 **Documentación Completa** - Ejemplos de uso y guías de integración

## 🛠️ Tecnologías Utilizadas

- **[Node.js 18+](https://nodejs.org/)** - Runtime JavaScript
- **[Express 5.1](https://expressjs.com/)** - Framework web moderno
- **[MySQL 8.0+](https://www.mysql.com/)** - Base de datos relacional
- **[Knex.js 3.1](http://knexjs.org/)** - Query builder SQL
- **[express-validator 7.0](https://express-validator.github.io/)** - Validación de datos
- **[Jest 30.2](https://jestjs.io/)** - Testing framework
- **[Supertest 7.2](https://github.com/visionmedia/supertest)** - Testing HTTP
- **[Docker](https://www.docker.com/)** - Containerización
- **[CORS 2.8](https://expressjs.com/en/resources/middleware/cors.html)** - Cross-Origin Resource Sharing

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

| Requisito | Versión | Enlace |
|-----------|---------|--------|
| **Node.js** | 18+ | [nodejs.org](https://nodejs.org/) |
| **npm** | 9+ | Incluido con Node.js |
| **MySQL** | 8.0+ | [mysql.com](https://www.mysql.com/) |
| **Docker** (opcional) | Latest | [docker.com](https://www.docker.com/) |

## 🚀 Instalación Rápida

### 1. Clona el Repositorio

```bash
git clone https://github.com/tuusuario/faunapark-api.git
cd faunapark-api
```

### 2. Instala las Dependencias

```bash
npm install
```

### 3. Configura las Variables de Entorno

Crea un archivo `.env` en la raíz:

```env
# Base de Datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=faunapark
DB_PORT=3306

# Servidor
NODE_ENV=development
PORT=8080
LOG_LEVEL=debug

# CORS
CORS_ORIGIN=http://localhost:3000
```

> 💡 Copia `.env.example` como base: `cp .env.example .env`

### 4. Inicializa la Base de Datos

```bash
mysql -u root -p < db/init.sql
```

### 5. Inicia el Servidor

```bash
npm start
```

✅ **La API estará disponible en** `http://localhost:8080`

## 🏗️ Uso Rápido

### Obtener Todos los Animales

```bash
curl -X GET http://localhost:8080/animales \
  -H "Content-Type: application/json"
```

**Respuesta (200):**
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

### Crear un Nuevo Animal

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

**Respuesta (201):**
```json
{
  "status": "success",
  "message": "Animal creado correctamente",
  "data": {
    "id": 2,
    "nombre": "Simba",
    "especie": "León",
    "edad": 3
  }
}
```

## 📚 Documentación API Completa

### 🐾 Endpoints de Animales

#### `GET /animales` - Listar Animales

Obtiene todos los animales registrados con opciones de filtrado y paginación.

**Parámetros de Query:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `especie` | string | Filtrar por especie |
| `page` | number | Número de página (default: 1) |
| `limit` | number | Resultados por página (default: 20) |
| `estado` | string | Filtrar por estado (activo/inactivo) |

#### `GET /animales/:id` - Obtener Animal

Obtiene los detalles completos de un animal específico.

```bash
GET /animales/1
```

#### `POST /animales` - Crear Animal

Crea un nuevo registro de animal.

**Validaciones requeridas:**
- `nombre`: string (3-100 caracteres, solo letras)
- `especie`: string (alfabético)
- `edad`: number (0-150 años)
- `habitat_id`: number (debe existir en BD)
- `descripcion`: string (opcional, max 500 caracteres)

#### `PUT /animales/:id` - Actualizar Animal

```bash
PUT /animales/1
Content-Type: application/json

{
  "edad": 6,
  "descripcion": "Descripción actualizada"
}
```

#### `DELETE /animales/:id` - Eliminar Animal

```bash
DELETE /animales/1
```

---

### 🏠 Endpoints de Hábitats

#### `GET /habitats` - Listar Hábitats

```bash
GET /habitats
```

#### `POST /habitats` - Crear Hábitat

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

#### `PUT /habitats/:id` - Actualizar Hábitat

```bash
PUT /habitats/1
Content-Type: application/json

{
  "temperatura_ideal": 26,
  "capacidad": 20
}
```

#### `DELETE /habitats/:id` - Eliminar Hábitat

```bash
DELETE /habitats/1
```

## 📁 Estructura del Proyecto

```
faunapark-api/
├── src/
│   ├── app.js                          # Punto de entrada Express
│   ├── configuration/
│   │   └── database.js                 # Configuración Knex.js
│   ├── controller/
│   │   ├── animales.js                 # Controlador de animales
│   │   └── habitats.js                 # Controlador de hábitats
│   ├── service/
│   │   ├── animales.js                 # Lógica de negocio animales
│   │   └── habitats.js                 # Lógica de negocio hábitats
│   ├── route/
│   │   ├── animales.js                 # Rutas REST animales
│   │   └── habitats.js                 # Rutas REST hábitats
│   ├── validators/
│   │   ├── animales.js                 # Esquemas express-validator
│   │   └── habitats.js
│   ├── middlewares/
│   │   ├── errorHandler.js             # Manejo centralizado errores
│   │   └── validateResult.js           # Validación de resultados
│   └── utils/
│       ├── animalname.utils.js
│       ├── description.utils.js
│       ├── maxage.utils.js
│       └── test/                       # Tests unitarios
├── db/
│   └── init.sql                        # Script inicialización BD
├── docker-compose.dev.yaml             # Docker Compose desarrollo
├── package.json
└── README.md                           # Este archivo
```

### Flujo de Datos

```
HTTP Request
    ↓
Route Handler
    ↓
Middleware de Validación
    ↓
Controller (orquestación)
    ↓
Service (lógica de negocio)
    ↓
Database Query (Knex.js)
    ↓
JSON Response
```

## 🧪 Testing

### Ejecutar Todos los Tests

```bash
npm test
```

### Tests Unitarios con Cobertura

```bash
npm run test:unit
```

Genera cobertura para:
- Controllers
- Services
- Validators
- Utils

### Modo Watch (Desarrollo)

```bash
npm run test:watch
```

Reejuta tests automáticamente al guardar cambios.

### Cobertura Detallada

```bash
npm run test:coverage
```

Genera reporte en `coverage/lcov.info`

### Ejemplo de Test Unitario

```javascript
describe('Animal Name Validator', () => {
  test('should validate correct animal names', () => {
    expect(validateAnimalName('Leo')).toBe(true);
  });

  test('should reject invalid names', () => {
    expect(validateAnimalName('123')).toBe(false);
  });
});
```

### Ejemplo de Test de Integración

```javascript
describe('Animals API', () => {
  test('GET /animales should return 200', async () => {
    const response = await request(app)
      .get('/animales')
      .expect(200);
    
    expect(response.body.status).toBe('success');
  });

  test('POST /animales should create animal', async () => {
    const response = await request(app)
      .post('/animales')
      .send({
        nombre: 'Nuevo',
        especie: 'Leopardo',
        edad: 3,
        habitat_id: 1
      })
      .expect(201);
  });
});
```

## 🏗️ Scripts Disponibles

```bash
npm start              # Inicia servidor en puerto 8080
npm test               # Ejecuta todos los tests
npm run test:unit      # Solo tests unitarios con cobertura
npm run test:watch     # Tests en modo vigilancia (watch)
npm run test:coverage  # Reporte completo de cobertura
npm run test:integration # Tests de integración
```

## 🐳 Docker & Composición

### Levantar Entorno Completo

```bash
docker-compose -f docker-compose.dev.yaml up -d
```

Esto inicia:
- 🏗️ **API**: Servidor Node.js en puerto 8080
- 🗄️ **DB**: MySQL 8.0 en puerto 3306

### Ver Logs en Tiempo Real

```bash
docker-compose -f docker-compose.dev.yaml logs -f
```

### Detener Servicios

```bash
docker-compose -f docker-compose.dev.yaml down
```

### Reconstruir Imagen (después de cambios)

```bash
docker-compose -f docker-compose.dev.yaml up --build
```

## ⚙️ Configuración Avanzada

### Pool de Conexiones Base de Datos

```javascript
pool: { 
  min: 2,      // Conexiones mínimas
  max: 10      // Conexiones máximas
}
```

### Índices Recomendados SQL

```sql
CREATE INDEX idx_animals_species ON animales(especie);
CREATE INDEX idx_animals_habitat ON animales(habitat_id);
CREATE INDEX idx_animals_status ON animales(estado);
CREATE INDEX idx_habitats_type ON habitats(tipo);
```

### Manejo de Errores

El sistema implementa manejo centralizado:

| Código | Significado | Ejemplo |
|--------|------------|---------|
| **200** | OK | Solicitud exitosa |
| **201** | Created | Recurso creado |
| **400** | Bad Request | Validación fallida |
| **404** | Not Found | Recurso no existe |
| **500** | Server Error | Error inesperado |

**Formato de Error:**
```json
{
  "status": "error",
  "message": "El campo 'nombre' es requerido",
  "details": ["nombre es obligatorio"]
}
```

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

---

## 👥 Autores

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/MT22HUGO">
          <img src="https://avatars.githubusercontent.com/u/232877974?v=4" width="100px;" alt="Hugo"/><br />
          <sub><b>Hugo</b></sub>
        </a>
        <br />
        <p><strong>Full Stack Developer</strong></p>
      </td>
      <td align="center">
        <a href="https://github.com/Javiii3r">
          <img src="https://avatars.githubusercontent.com/u/232877625?v=4" width="100px;" alt="Javi"/><br />
          <sub><b>Javi</b></sub>
        </a>
        <br />
        <p><strong>Full Stack Developer</strong></p>
      </td>
    </tr>
  </table>
</div>

## 🏆 Créditos y Agradecimientos

<div align="center">
  <p>Este proyecto fue desarrollado con dedicación por en equipo de FaunaPark.</p>
  
  **Desarrollado con ❤️ para la gestión de zoológicos**
  
  ---
  
  Agradecemos a:
  - **The Node.js & Express Community** por herramientas excelentes
  - **Knex.js** por proporcionar un query builder robusto
  - **Jest & Supertest** por facilitarnos testing completo
  - **Docker** por simplificar el despliegue
  
</div>

---

<div align="center">
  
  [⬆ Volver al inicio](#-faunapark-api)
  
</div>