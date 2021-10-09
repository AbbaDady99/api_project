const {response} =require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const {generarJWT}= require('../helpers/jwt');


const login = async(req, res=response)=>{
    const{email, password} = req.body;
    try {
        //para verificar el usuario por su email
        const usuarioBD= await Usuario.findOne({email});
        if(!usuarioBD){
            return res.status(404).json({
                ok: false,
                msg:'email no encontrado'

            });
        }
        // Para verificar la contraseña del
        const validarPassword= bcrypt.compareSync(password, usuarioBD.password);
        if( !validarPassword ){
            return res.status(400).json({
                ok: false,
                msg:'password incorrect'
            });
        }
        // generar el token - JWT
        const token = await generarJWT(usuarioBD.id);
        res.json({
            ok: true,
            token
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'hable con el administrador'
        })
    }
}
module.exports={
    login
}