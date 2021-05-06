const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const  getUsuarios = async(req = request, res = response) => {
    // const query = req.query;
    const { limite = 2, desde = 0} = req.query;

    const usuarios = await Usuario.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(limite));


    const totalUsuarios = await Usuario.countDocuments({ estado: true });

    res.json({
        totalUsuarios,
        usuarios
    });
}

const putUsuario = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //Encriptar la contraseña
    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuarioDB = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        usuarioDB
    });
}

const postUsuario = async(req, res = response) => {

    // const body = req.body;
    // const usuario = new Usuario(body);

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //verificar si el correo existe


    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //llamamos al modelo y lo guardamos en la bdd
    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
    });
}

const deleteUsuario = async(req, res) => {

    const { id } = req.params;

    //borrado fisico
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json({
        usuario
    });
}

module.exports = {
    getUsuarios,
    putUsuario,
    postUsuario,
    deleteUsuario
}