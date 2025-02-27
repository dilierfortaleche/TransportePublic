const express = require("express");
const router = express.Router();
const { 
    createRuta, 
    getAllRutas, 
    getRutaById, 
    updateRuta, 
    deleteRuta 
} = require("../controllers/RutaController");

// Crear una nueva ruta
router.post("/", createRuta);

// Obtener todas las rutas
router.get("/", getAllRutas);

// Obtener una ruta por ID
router.get("/:id", getRutaById);

// Actualizar una ruta por ID
router.put("/:id", updateRuta);

// Eliminar una ruta por ID
router.delete("/:id", deleteRuta);

module.exports = router;
