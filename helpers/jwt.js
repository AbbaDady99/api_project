const jwt=require('jsonwebtoken');

//funcion que generea JWT token

const generarJWT = ( uid )=>{
    return new Promise((resolve, reject)=>{
        const payload={
            uid,
            // se puede agregar informacion adicional
        };
        //JWT_Secreta es la firma que utilizara el servidor para generar JWT_Secreta
        jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: '12h'
        }, (err,token)=>{
            if(err){
                console.log(err);
                reject('no se puedo generar el JWT');
            }else{
                resolve(token);
            }
        });
    });
}
module.exports = {
    generarJWT,
}