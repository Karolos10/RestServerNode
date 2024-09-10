const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const emailExiste = async (correo = '') => { 
    
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo: correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya está registrado`);
    }
}

const existeUsuarioPorId = async (id) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error(`El ID '${id}' no es un ID válido.`);
    }
    
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El ID '${id}' no existe en la base de datos.`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}