const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios';

        //Conectar a la base de datos
        this.conectarDB();

        //Middlewares ->
        this.middlewares();

        //Rutas de la aplicación

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //el 'use' es la palabra clave para dar a entender que es un middleware
        this.app.use(express.static('public') );

        //parseo y lectura del body
        this.app.use(express.json());

        //cors
        this.app.use(cors());
    }

    routes() {
        this.app.use(this.usuariosRoutePath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port , () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`)
        });
    }
}

module.exports = Server;