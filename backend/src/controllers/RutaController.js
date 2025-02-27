const Ruta = require("../models/Ruta");

// Crear una nueva ruta
const createRuta = async (req, res) => {
    try {
        const nuevaRuta = new Ruta(req.body);
        await nuevaRuta.save();
        res.status(201).json({ message: "Ruta creada con éxito", ruta: nuevaRuta });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la ruta", error });
    }
};

// Obtener todas las rutas
const getAllRutas = async (req, res) => {
    try {
        const rutas = await Ruta.find().populate("busesAsignados");
        res.status(200).json(rutas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las rutas", error });
    }
};

// Obtener una ruta por ID
const getRutaById = async (req, res) => {
    try {
        const ruta = await Ruta.findById(req.params.id).populate("busesAsignados");
        if (!ruta) return res.status(404).json({ message: "Ruta no encontrada" });
        res.status(200).json(ruta);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la ruta", error });
    }
};

// Actualizar una ruta por ID
const updateRuta = async (req, res) => {
    try {
        const rutaActualizada = await Ruta.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!rutaActualizada) return res.status(404).json({ message: "Ruta no encontrada" });
        res.status(200).json({ message: "Ruta actualizada con éxito", ruta: rutaActualizada });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la ruta", error });
    }
};

// Eliminar una ruta por ID
const deleteRuta = async (req, res) => {
    try {
        const rutaEliminada = await Ruta.findByIdAndDelete(req.params.id);
        if (!rutaEliminada) return res.status(404).json({ message: "Ruta no encontrada" });
        res.status(200).json({ message: "Ruta eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la ruta", error });
    }
};

module.exports = { createRuta, getAllRutas, getRutaById, updateRuta, deleteRuta };
