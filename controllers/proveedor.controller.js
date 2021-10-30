const{response}= require('express');
const Proveedor=require('../models/proveedor.model');

const getProveedores=async (req, res)=>{
    const proveedores= await Proveedor.find({},'nombre_proveedor direccion_proveedor ciudad telefono');
    res.json({
        ok: true,
        proveedores
    });
}

const crearProveedores=async (req, res)=>{

    const { nombre_proveedor, direccion_proveedor, ciudad, telefono} =req.body;
    try{
        const exitenombre_proveedor= await Proveedor.findOne({nombre_proveedor});
        if(exitenombre_proveedor){
            return res.status(400).json({
                ok:false,
                msg: 'El nombre del proveedor ya ha sido registrado'
            });
        }
        const proveedor= new Proveedor(req.body);

        await proveedor.save();
        res.json({
            ok:true,
            proveedor
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error en el servidor, revisar logs'
        });
    }


}



const actualizarProveedor= async(req, res=response)=>{
    const uid=req.params.id;
    try{
        const proveedorDB= await Proveedor.findById(uid);
        if(!proveedorDB){
            return res.status(404).json({
                ok: false,
                msg:'no existe un proveedor con ese id'
            });
        }
        const {nombre_proveedor,...campos} =req.body; 
        if(proveedorDB.nombre_proveedor!==nombre_proveedor){
            const existe_proveedor=await Proveedor.findOne({nombre_proveedor});
            if(existe_proveedor){
                return res.status(400).json({
                    ok: false,
                    msg:'Ya existe un producto con ese nombre'
                });
            }
        }   

        campos.nombre_proveedor= nombre_proveedor;

        const proveedorActualizado= await Proveedor.findByIdAndUpdate(uid,campos,{new:true});
        res.json({
            ok: true,
            proveedor: proveedorActualizado
        });
    
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg:'Error en la actualizacion de datos del proveedor'
        });
    }
}


const eliminarProveedor = async (req, res) => {
    const uid= req.params.id;

    try{
        const proveedorDb= await Proveedor.findById(uid);
        if(!proveedorDb){
            return res.status(404).json({

                ok: false,
                msg:'Proveedor not Deleteado'
            });
        }
        await Proveedor.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Proveedor eliminado de la BD'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No puede eliminar Proveedor de la BD'
        });
        
    }
}
module.exports={
    getProveedores,
    crearProveedores,
    actualizarProveedor, 
    eliminarProveedor
}