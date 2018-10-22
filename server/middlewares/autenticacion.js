const jwt = require('jsonwebtoken');


// ==========================
// Verificar Token
// ==========================

let verificaToken = (req, res, next) => {
    let token = req.get('token');   // Con req.get leo los valores del header

    jwt.verify(token, process.env.SEED, (err, decoded)=>{
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        // decoded.usuario <== Todo eso es el payload
        req.usuario = decoded.usuario;
        next();
        
    }); 
};

// ==========================
// Verifica AdminRole
// ==========================
let verificaAdmin_Role = (req, res,next) =>{
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();        
    }
    else {
        return res.json({
          ok: false,
          err: {
            message: "El usuario no es administrador"
          }
        });
    }
};


module.exports = {
    verificaToken,
    verificaAdmin_Role
}