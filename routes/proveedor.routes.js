const{Router}=require('express');
const{check}=require('express-validator');
const{validarCampos}=require('../middlewares/validar-campos');
const{validarJWT} = require('../middlewares/validar-jwt');
const {getProveedores,crearProveedores, actualizarProveedor, eliminarProveedor}= require('../controllers/proveedor.controller');

const router = Router();

router.get('/',getProveedores);

router.post('/',
    [
        check('nombre_proveedor','el nombre del proveedor es obligatorio').not().isEmpty(),
        check('direccion_proveedor', 'La direccion del proveedor es obligartorio').not().isEmpty(),
        check('ciudad','El ciudad es obligatorio').not().isEmpty(),
        check('telefono','El telefono es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearProveedores);



router.put('/:id',validarJWT, actualizarProveedor); 

router.delete('/:id',validarJWT,eliminarProveedor);

module.exports=router;