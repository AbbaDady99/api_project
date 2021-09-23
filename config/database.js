const mongoose = require('mongoose');
const dbConection = async() => {
    try {
        //Debemos utilizar la cadena de conexion que tenemos en mongocompass    
        //mongodb://adminproject:jymwq3dJdPN2Frh@cluster0.gjtyx.mongodb.net:27017,cluster0-shard-00-01.gjtyx.mongodb.net:27017,cluster0-shard-00-02.gjtyx.mongodb.net:27017/test?authSource=admin&replicaSet=atlas-hm2tkp-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true    
        await mongoose.connect(process.env.DB_CNN);
        console.log('Conexion exitosa a la BD')
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a la BD');
    }
}
module.exports ={
    dbConection 
}