const{Schema, model,SchemaTypes}=require('mongoose');

const VentaSchema= Schema({

    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true,
    },
    cliente:{
        type: Schema.Types.ObjectId,
        ref: 'Cliente', 
        required: true,
    },
    numero_venta:{
        type:String,
        required: true,
    },
    fecha_venta:{
        type: String,
        required: true,
    },
    precio_venta:{
        type: Number,
        required: true,
    },
    tipo_pago:{
        type: String,
    }
});

VentaSchema.method('toJSON',function(){
    const{__v,_id,...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports=model('Venta',VentaSchema);

