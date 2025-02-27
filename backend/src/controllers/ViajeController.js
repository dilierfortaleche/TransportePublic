const Viaje = require("../models/Viaje");

// Crear un nuevo viaje
const createViaje = async (req, res) => {
    try {
        const nuevoViaje = new Viaje(req.body);
        await nuevoViaje.save();
        res.status(201).json({ message: "Viaje creado con éxito", viaje: nuevoViaje });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el viaje", error });
    }
};

// Obtener todos los viajes
const getAllViajes = async (req, res) => {
    try {
        const viajes = await Viaje.find()
            .populate("pasajero")
            .populate("ruta")
            .populate("bus");
        res.status(200).json(viajes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los viajes", error });
    }
};

// Obtener un viaje por ID
const getViajeById = async (req, res) => {
    try {
        const viaje = await Viaje.findById(req.params.id)
            .populate("pasajero")
            .populate("ruta")
            .populate("bus");
        if (!viaje) return res.status(404).json({ message: "Viaje no encontrado" });
        res.status(200).json(viaje);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el viaje", error });
    }
};

// Actualizar un viaje por ID
const updateViaje = async (req, res) => {
    try {
        const viajeActualizado = await Viaje.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!viajeActualizado) return res.status(404).json({ message: "Viaje no encontrado" });
        res.status(200).json({ message: "Viaje actualizado con éxito", viaje: viajeActualizado });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el viaje", error });
    }
};

// Eliminar un viaje por ID
const deleteViaje = async (req, res) => {
    try {
        const viajeEliminado = await Viaje.findByIdAndDelete(req.params.id);
        if (!viajeEliminado) return res.status(404).json({ message: "Viaje no encontrado" });
        res.status(200).json({ message: "Viaje eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el viaje", error });
    }
};

module.exports = { createViaje, getAllViajes, getViajeById, updateViaje, deleteViaje };
