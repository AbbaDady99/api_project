const{Router} = require('express');
const{check} = require('express-validator');
const{validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const{getVenta,crearVenta,actualizarVenta,eliminarVenta} = require('../controllers/venta.controller');

const router = Router();

router.get('/',getVenta);
router.post('/',
    [
        check('numero_venta','el numero de venta es obligatorio').not().isEmpty(),
        check('fecha_venta','la fecha de venta es obligatorio').not().isEmpty(),
        check('precio_venta','El precio de la venta es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    crearVenta);

router.put('/:id',validarJWT,actualizarVenta);

router.delete('/:id',validarJWT,eliminarVenta);
    
module.exports = router;        