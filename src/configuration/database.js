
//Configura y exporta instancia Knex para queries a MySQL/MariaDB
//Usa credenciales del fichero YAML de configuración

const knex = require('knex');
const { config } = require('./configuration');

// Crea instancia Knex con credenciales de configuración
const db = knex({
    client: 'mysql',              
    connection: {
        host: config.db.host,     
        port: config.db.port,     
        user: config.db.user,      
        password: config.db.password, 
        database: config.db.database  
    },
    useNullAsDefault: true
});

exports.db = db;