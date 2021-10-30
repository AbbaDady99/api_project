const{response} = require('express');
const Producto = require('../models/producto.model');

const getProductos = async(req,res) => {

    const productos = await Producto.find()
                                        .populate('proveedor','nombre_proveedor')

    res.json({
        ok:true,
        productos
    });
} 

const crearProducto = async(req,res) => {

    const {nombre_producto, precio_unitario,stock, categoria, proveedor} = req.body;

    const uid = req.uid;
    const producto = new Producto({ 
        proveedor: uid,
        ...req.body 
    });

    try {
        const existeProducto = await Producto.findOne({nombre_producto});

        if(existeProducto){
            return res.status(400).json({
                ok:false,
                msg: 'El producto ya ha sido registrado'
            });
        }

        // Crear el objeto de la clase model Producto
        const producto = new Producto(req.body);

        // Guardar Producto
        await producto.save();

        res.json({
            ok: true,
            producto
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor'
        });
    }
}

const actualizarProducto = async(req,res=response) => {
    const uid = req.params.id;

    try {
        const productoDB = await Producto.findById(uid);

        if(!productoDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe con ese ID'
            });
        }
        const {nombre_producto,...campos} = req.body;
        
        if(productoDB.nombre_producto !== nombre_producto){
            const existeProducto = await Producto.findOne({nombre_producto});
            if(existeProducto){
                return res.status(400).json({
                    ok:false,
                    msg:'Ya existe un producto con ese nombre'
                });
            }
        }

        campos.nombre_producto = nombre_producto;

        // Actualizar los datos del producto
        const productoActualizado = await Producto.findByIdAndUpdate(uid,campos,{new:true});
        res.json({
            ok:true,
            producto: productoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al actualizar datos del producto'
        });
    }
}


const eliminarProducto = async(req,res=response) => {
    const uid = req.params.id;

    try {

        const productoDB = await Producto.findById(uid);

        if(!productoDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe un producto con ese ID'
            });
        }

        await Producto.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg:'Producto eliminado de la BD'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'No es posible eliminar el producto'
        });
    }
}


module.exports = {
    getProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}
