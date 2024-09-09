const {  response } = require('express');


const usuariosGet = (req, res = response) => {
    res.json({
        msg: "get API - controlador"
    });
}

const usuariosPut = (req, res = response) => {
    res.json({
        msg: "put API - controlador",
    });
};

const usuariosPost = (req, res = response) => {
    res.json({
        msg: "post API - controlador",
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