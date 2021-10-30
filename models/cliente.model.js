const {Schema, model, SchemaTypes} = require('mongoose');

// Definicion esquema coleccion Cliente
const ClienteSchema = Schema({
    nombre_cliente:{
        type:String,
        required:true
    },
    sexo: {
        type:String,
        required:true
    },
    fecha_nacimiento: {
        type:String,
        required: true,

    },
    email: {
        type:String,
        required: true,
        unique: true
    },
});


// Cambiando el _id por uid
ClienteSchema.method('toJSON', function(){
    const{__v,_id,...object} = this.toObject();
    object.uid = _id;
    return object;
})


// Exportar el modelo, Mongoose crea el Documento
module.exports = model('Cliente',ClienteSchema);