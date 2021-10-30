
const {Router} = require('express');
const {getDetalleVenta,crearDetalleVenta,actualizarDetalleVenta,eliminarDetalleVenta} = require('../controllers/detalleVenta.controller');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT,getDetalleVenta);

router.post('/',[
    validarJWT,
    check('venta','El ID de usuario no es válido').isMongoId(),
    check('Producto','El ID de pedido no es válido').isMongoId(),
    check('total_venta','El ID de producto no es válido').not().isEmpty(),
    check('cantidad', 'La cantidad del producto es obligatoria').not().isEmpty(),
    validarCampos
],
crearDetalleVenta);

router.put('/:id',[
    validarJWT,
    check('cantidad', 'La cantidad del producto es obligatoria').not().isEmpty(),
    validarCampos
],
actualizarDetalleVenta);

router.delete('/:id',validarJWT,eliminarDetalleVenta);

module.exports = router;
