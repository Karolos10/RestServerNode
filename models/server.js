const express = require("express");
const cors = require("cors");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = "/api/usuarios";

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        this.app.use(cors());

        this.app.use(express.json());
        
        // Directorio público
        this.app.use(express.static("public"));

    }

    routes() {
        
        this.app.use(this.usuarioPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }
}

module.exports = Server;
