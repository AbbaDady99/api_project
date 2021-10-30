const { response }= require('express');
const Venta= require('../models/venta.model');

const getVenta= async(req,res)=> {
    const veenta=await Venta.find()
                                .populate('cliente','nombre_cliente')
                                .populate('usuario','nombre');
    res.json({
        ok: true,
        veenta
    });
}
const crearVenta = async(req,res)=> {
    const {usuario,cliente,numero_venta,fecha_venta, precio_venta,tipo_pago}=req.body;
    const uid = req.uid;
    const venta = new Venta({ 
        //cliente: uid,
        usuarios:uid,
        ...req.body 
    });

    try {
        const existeVenta = await Venta.findOne({numero_venta});
        
        if(existeVenta) {
            return res.status(400).json({
                ok:false,
                msg: 'La Venta ya ha sido registrada'
            });
        }

        const venta= new Venta(req.body);

        await venta.save();
        req.json({
            ok:true,
            venta
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error en el servidor'
        });
    }

}
const actualizarVenta= async (req,res=response)=>{
    
    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const venta = await Venta.findById(id);

        if(!venta){
            return res.status(404).json({
                ok: false,
                msg: 'No existe una venta con ese id'
            });
        }

        const cambioventa = {
            ...req.body,
            idusuario: uid
        }

        // actualizacion de los datos del pedido
        const ventaActualizada = await Venta.findByIdAndUpdate(id,cambioventa,{new:true});

        res.json({
            ok: true,
            venta: ventaActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el pedido'
        });
    }

    

}
const eliminarVenta= async (req,res=response)=>{
    const id = req.params.id;

    try{

        const venta= await Venta.findById(id);
        if(!venta){
            return res.status(404).json({
                ok:false,
                msg:'No existe venta on ese ID'
            });
        }
        await Venta.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg:'Venta eliminad de la BD'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'No es posible eliminar venta de la BD'
        });
    }

}

module.exports ={
    getVenta,
    crearVenta,
    actualizarVenta,
    eliminarVenta
}