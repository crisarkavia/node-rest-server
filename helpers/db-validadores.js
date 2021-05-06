const Role = require('../models/role');
const Usuario = require('../models/usuario');


//Esta función valida que el rol entregado sea igual a los del esquema.
const valRolExistente = async(rol = '') => {

    const rolExiste = await Role.findOne({rol});

    if(!rolExiste) {
        throw new Error(`El rol ${ rol } no es valido`)
    }

}

//Esta función valida que el email ingresado no sea igual a uno ya existente en el sistema.
const valEmailRepetido = async(correo = '') => {

    const emailMatch = await Usuario.findOne({correo});

    if( emailMatch ) {
        throw new Error(`El correo ingresado: ${ correo } ya existe en el sistema.`);
    }

}

//

const valIdExistente = async( id ) => {
    const existeId = await Usuario.findById(id);
    if( !existeId ) {
        throw new Error(`no existe un usuario con el id: ${id}`);
    }
}


module.exports = {
    valRolExistente,
    valEmailRepetido,
    valIdExistente
}