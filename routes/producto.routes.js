const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const {getProductos, actualizarProducto, crearProducto,eliminarProducto} = require('../controllers/producto.controller');

const router = Router();

router.get('/',getProductos);

router.post('/',[   
    check('nombre_producto','El nombre del producto es obligatorio').not().isEmpty(),
    check('categoria','la categoria es obligartorio').not().isEmpty(),
    check('precio_unitario','El precio unitario es obligatorio').not().isEmpty(),
    
    check('stock','El stock es obligatorio').not().isEmpty(),
    validarCampos,
],
crearProducto);

router.put('/:id',validarJWT,actualizarProducto);

router.delete('/:id',validarJWT,eliminarProducto);

module.exports = router;    