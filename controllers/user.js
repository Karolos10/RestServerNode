const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = (req, res = response) => {

    const { q, nombre='No name', apikey, page= 1, limit } = req.query;

    res.json({
        msg: "get API - controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: "put API - controlador",
        id
    });
};

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: "Ese correo ya está registrado"
        });
    }

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        usuario
    });
};

const usuaruiosDelete = (req, res = response) => {
    res.json({
        msg: "delete API - controlador",
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuaruiosDelete
}