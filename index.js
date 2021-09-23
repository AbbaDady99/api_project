const express= require('express');// sintaxis de importacion en nodejs
require('dotenv').config();
const {dbConection}=require('./config/database')
const cors=require('cors')

//Crear el servidor express 
const app=express();

//configurar cors 
app.use(cors());

//llamando a la funcion
dbConection();
console.log(process.env);

//Rutas de la APu Proyecto
app.get('/',(req,res)=>{
    res.json({
        ok: true,
        msg: 'Binvenidos a Node Js'
    });
});

//Código para desplegar el servidor express
app.listen(process.env.PORT,()=>{
    console.log('Servidor desplegado en el puerto:'+process.env.PORT);
})
