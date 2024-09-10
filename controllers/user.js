const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const usuario = require('../models/usuario');


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

const usuariosPut = async(req, res = response) => {

    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;
    //TODO validar contra base de datos
    if (password) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    });
};

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });

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