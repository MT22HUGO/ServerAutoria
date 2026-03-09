
//Archivo principal que configura Express, monta las rutas y middlewares
//Escucha en puerto 8080

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const animalesRoute = require('./route/animales');
const habitatsRoute = require('./route/habitats');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());

app.use(express.json());

app.use('/animales', animalesRoute);

app.use('/habitats', habitatsRoute);

app.use(errorHandler);

app.listen(8080, () => {
    console.log("Iniciando el backend en el puerto 8080");
});