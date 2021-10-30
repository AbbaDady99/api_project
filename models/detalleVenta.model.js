const {Schema, model, SchemaTypes} = require('mongoose');

// Definicion esquema coleccion Pedido
const detalleventaSchema = Schema({
    venta:{
        type:Schema.Types.ObjectId,
        ref:'venta',
        required:true
    },
    Producto: {
        type:Schema.Types.ObjectId,
        ref:'producto',
        required:true  
    },
    total_venta: {
        type:Number,
        required: true,
    },
    cantidad:{
        type:Number,
        required: true
    }
});


// Cambiando el _id por uid
detalleventaSchema.method('toJSON', function(){
    const{__v,_id,password,...object} = this.toObject();
    object.uid = _id;
    return object;
});


// Exportar el modelo, Mongoose crea el Documento
module.exports = model('DetalleVentas',detalleventaSchema);