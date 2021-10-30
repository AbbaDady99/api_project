const {Schema, model}= require('mongoose');
// Definimos el esquema para la coleecino de proveedor

const ProveedorShema=Schema({
    nombre_proveedor:{
        type: String,
        required: true,
    },
    //direccion ciudad telefono de
    direccion_proveedor: {
        type: String,
        required: true,
    },
    ciudad:{
        type: String,
        
    },
    telefono: {
        type: Number,
        
    },
});
ProveedorShema.method('toJSON', function(){
    const{__V, _id, ...object }=this.toObject();
    object.uid = _id;
    return object;
})

module.exports=model('Proveedor',ProveedorShema);
