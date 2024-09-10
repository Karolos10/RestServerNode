const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const usuario = require('../models/usuario');


const usuariosGet = async(req, res = response) => {

    const { limit = 5, desde = 0 } = req.query;
    const query = { estado: true };
    /* const usuarios = await Usuario.find(query)
        .limit(Number(limit))
        .skip(Number(desde));

    const total = await Usuario.countDocuments(query); */

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .limit(Number(limit))
            .skip(Number(desde))
    ]);

    res.json({
        total,
        usuarios
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

    res.json(usuario);
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

const usuaruiosDelete = async(req, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json(usuario);
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuaruiosDelete
}