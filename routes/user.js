const { Router } = require('express');
const { check } = require('express-validator');
const { ValidatorsImpl } = require('express-validator/src/chain');
const { getUsuarios, 
        putUsuario, 
        postUsuario, 
        deleteUsuario 
} = require('../controllers/user');
const { validarCampos } = require('../middlewares/validacionCampos');
const { valRolExistente, valEmailRepetido, valIdExistente } = require('../helpers/db-validadores');

const router = Router();

//Optimización de codigo
const notEmpty = (check) => {
        return check.not().notEmpty();
}

//endpoints -> regresa información en formato json
router.get('/', getUsuarios);

router.put('/:id', [
        check('id', 'no es un id valido').isMongoId(),
        check('id').custom(valIdExistente),
        check('rol').custom( valRolExistente),
        validarCampos
], putUsuario);

router.post('/', [
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('password', 'debe colocar una contraseña!').not().isEmpty(),
        check('password', 'la contraseña debe tener minimo 6 caracteres').isLength({ min: 6}),
        check('correo', 'el correo no es valido').isEmail(),
        check('correo').custom( valEmailRepetido),
        // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROL']),
        check('rol').custom( valRolExistente ),
        validarCampos
],postUsuario);

router.delete('/:id', [
        check('id', 'no es un id valido').isMongoId(),
        check('id').custom(valIdExistente),
        validarCampos,
], deleteUsuario)

module.exports = router;