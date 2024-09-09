const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuaruiosDelete } = require('../controllers/user');

const router = Router();

router.get("/", usuariosGet);
router.put("/:id", usuariosPut);
router.post("/", usuariosPost);
router.delete("/", usuaruiosDelete);



module.exports = router;