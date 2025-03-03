const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const middlewareAutenticacion = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/VerificarRol');

console.log("Tipo de verificarRol:", typeof verificarRol); // 👈 Esto nos dirá qué se está importando

console.log("Contenido de verificarRol:", verificarRol);


//rutas
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/', UserController.getUsers);
router.delete('/:id', UserController.deleteUsers);


// Rutas con restricciones de roles
router.get('/admin-only', middlewareAutenticacion, verificarRol(['admin']), (req, res) => {
    res.json({ mensaje: 'Bienvenido, admin' });
});

router.get('/solo-conductores', middlewareAutenticacion, verificarRol(['conductor']), (req, res) => {
    res.json({ mensaje: 'Bienvenido, conductor' });
});

router.get('/solo-pasajeros', middlewareAutenticacion, verificarRol(['pasajero']), (req, res) => {
    res.json({ mensaje: 'Bienvenido, pasajero' });
});


module.exports = router;