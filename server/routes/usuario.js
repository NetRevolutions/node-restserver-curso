const express = require("express");

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const {
  verificaToken,
  verificaAdmin_Role
} = require("../middlewares/autenticacion");


const app = express();


app.get('/usuario', verificaToken, (req, res) => {
    //res.send('Hello World'); // <== Esto envia HTML
    //res.json('get Usuario LOCAL!!!'); // <== Esto envia JSON

    // return res.json({
    //     usuario: req.usuario,
    //     nombre : req.usuario.nombre,
    //     email: req.usuario.email
    // });


    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true })
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios)=>{
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Usuario.countDocuments({ estado: true }, (err, conteo) =>{
                    res.json({
                        ok: true,
                        usuarios,
                        cuantos: conteo
                    });
                });
                
            });
});

app.post('/usuario', [verificaToken, verificaAdmin_Role], (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre : body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        //img: body.img
        role: body.role
    });

    usuario.save( (err, usuarioDB)=>{
        if (err)
        {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });


    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'El nombre es necesario'
    //     })
    // } else {
    //     res.json({
    //         persona: body
    //     }); // <== Esto envia JSON   
    // }


});

app.put("/usuario/:id", [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    // new: true;  // Hace que retorne el objeto actualizado
    // runValidators: true;     // Hace que corran las validaciones (lo fuerza)

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB)=>{
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

    
});

app.delete("/usuario/:id", [verificaToken, verificaAdmin_Role], (req, res) => {
    //res.json("delete Usuario"); // <== Esto envia JSON
    let id = req.params.id;

    // Eliminacion Fisica - Begin
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=>{
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }

    //     if (!usuarioBorrado) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'Usuario no encontrado'
    //             }
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     });
    // });

    // Eliminacion Fisica - End

    // Eliminacion Logica - Begin
    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });

    //Usuario.findByIdAndUpdate()
    // Eliminacion Logica - End


});


module.exports = app;