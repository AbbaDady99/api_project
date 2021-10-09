const express= require('express');// sintaxis de importacion en nodejs  
require('dotenv').config();
const {dbConection}=require('./config/database')
const cors=require('cors')

//Crear el servidor express 
const app=express();

//configurar cors 
app.use(cors());

app.use(express.json());

//llamando a la funcion
dbConection();
console.log(process.env);

//Rutas de la APu Proyecto
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));
//Código para desplegar el servidor express
app.listen(process.env.PORT,()=>{
    console.log('Servidor desplegado en el puerto:'+process.env.PORT);
})
