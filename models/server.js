const express = require("express");
const cors = require("cors");
const dbConnection = require("../database/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = "/api/usuarios";
        this.authPath = "/api/auth";

        //Conectar a la base de datos
        this.conectarDB();


        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() { 
        await dbConnection();
    }

    middlewares() {

        this.app.use(cors());

        this.app.use(express.json());
        
        // Directorio público
        this.app.use(express.static("public"));

    }

    routes() {
        
        this.app.use(this.usuarioPath, require('../routes/user'));
        this.app.use(this.authPath, require('../routes/auth'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }
}

module.exports = Server;
