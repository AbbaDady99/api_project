/*
    path: /api/usuarios
*/
//router, permite administrar las rutas de los diversos servicios 
const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const {getUsuarios, crearUsuario, actualizarUsuario,eliminarUsuario} = require('../controllers/usuario.controller');

const router = Router();
router.get('/', validarJWT ,getUsuarios);
//El post sirve para crear Usuario
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos,
    ], 
    crearUsuario);
router.put('/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos,
    ], 
    actualizarUsuario);
router.delete('/:id',validarJWT, eliminarUsuario);

module.exports=router;