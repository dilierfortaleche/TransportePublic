const express = require("express");
const router = express.Router();
const { 
    createViaje, 
    getAllViajes, 
    getViajeById, 
    updateViaje, 
    deleteViaje 
} = require("../controllers/ViajeController");

// Crear un nuevo viaje
router.post("/", createViaje);

// Obtener todos los viajes
router.get("/", getAllViajes);

// Obtener un viaje por ID
router.get("/:id", getViajeById);

// Actualizar un viaje por ID
router.put("/:id", updateViaje);

// Eliminar un viaje por ID
router.delete("/:id", deleteViaje);

module.exports = router;
