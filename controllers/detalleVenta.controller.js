
const{response} = require('express');
const DetalleVenta = require('../models/detalleVenta.model');

const getDetalleVenta = async(req,res) => {

    const detalleVenta = await DetalleVenta.find();
    res.json({
        ok:true,
        detalleVenta
    });
}

const crearDetalleVenta = async(req,res) => {

    const uid = req.uid;
    const detalleVenta = new DetalleVenta({
        usuarios: uid,
        ...req.body
    });

    try {
        
        const detalleVentaDB = await detalleVenta.save();

        res.json({
            ok:true,
            detalleVenta: detalleVentaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al registrar el detalle de venta, consulte con el administrador'
        });
    }

}

const actualizarDetalleVenta = async(req,res=response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const detalleVenta = await DetalleVenta.findById(id);

        if(!detalleVenta){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un detalle de pedido con ese ID'
            });
        }

        const cambiosDetalleVenta = {
            ...req.body,
            usuarios: uid
        }

        // Actualización de los datos del detalle de pedido
        const detalleVentaActual = await DetalleVenta.findByIdAndUpdate(id,cambiosDetalleVenta,{new:true});

        res.json({
            ok: true,
            detalleVenta: detalleVentaActual
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el detalle de pedido'
        });
    }
}
const eliminarDetalleVenta = async(req,res=response) => {

    const id = req.params.id;

    try {
        
        const detalleVenta = await DetallePedido.findById(id);

        if(!detalleVenta){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un detalle de venta con ese ID'
            });
        }

        await DetalleVenta.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Detalle de venta eliminado de la BD'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el detalle de pedido'
        });
    }
}

module.exports = {
    getDetalleVenta,
    crearDetalleVenta,
    actualizarDetalleVenta,
    eliminarDetalleVenta
}
