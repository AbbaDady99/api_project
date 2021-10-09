const {response}= require('express');
const bcrypt = require('bcryptjs');
const Usuario = require("../models/usuario.model");
const router = require("../routes/usuarios.routes");

const getUsuarios = async(req, res) => {

    const usuarios= await Usuario.find({}, 'nombre email role google');
    res.json({
        ok: true,
        usuarios
    });
}
// javaScrip es totalmete asincrono, el async para controlar el tiempo 
const crearUsuario= async(req, res=response)=>{

    //console.log(req.body);
    const {email,password,nombre}=req.body;
    try{
        //Usuario.findOne({email})--- en el Usuario buscame el email y lo colocamos en existeEmail
        const exiteEmail = await Usuario.findOne({email});
        if(exiteEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El email ya ha sido registrado'
            });
        }
        // Crear un objeto de la clase model usuario para
        const usuario= new Usuario(req.body);
        
        // Encrptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password=bcrypt.hashSync(password,salt);
        //indicamos a mongoos que registre a usuario en la base de datos
        await usuario.save(); //para decir que espere hasta que se ejecute acá
        res.json({
            ok:true,
            usuario
        });
    } catch (error) {   
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error en el servidor, revisar el logs'
        });
    }
}

const actualizarUsuario =async(req, res= response)=>{
    const uid=req.params.id;
    try{
        const usuarioDB=await Usuario.findById(uid);
        
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario con ese id'
            });
        }
        //codigo previo a la actualizacion del
        const{password, google, email, ...campos}=req.body;
        if(usuarioDB.email !== email) {
            const existeEmail= await Usuario.findOne({email});
            if(existeEmail){
                return res.status(404).json({
                    ok: false,
                    msg:'ya existe un usuario con este email'
                });
            }
        }
        campos.email = email;
        //actualizacion de datos
        const usuarioActualizado= await Usuario.findByIdAndUpdate(uid, campos, {new:true});
        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Error en la actualizacion de datos en el usuario'
        });
    }
}

const eliminarUsuario= async (req, res=response)=>{
    const uid=req.params.id;
    try {
        const usuarioBD= await Usuario.findById(uid);
        if(!usuarioBD){
            return res.status(404).json({
                ok: false,
                msg:'No existe Usuario con ese id'
            });
        }
        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg:'Usuario Eliminado de le BD'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'No es posible elimianr Usuario'
        });
    }
}
module.exports={
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario 
}