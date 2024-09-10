const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuaruiosDelete } = require('../controllers/user');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

router.get("/", usuariosGet);
router.put("/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    /* check('id').custom(emailExiste),
    check('rol').custom(esRolValido), */
    validarCampos
], usuariosPut);
router.post("/", [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPost);
router.delete("/", usuaruiosDelete);



module.exports = router;