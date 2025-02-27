const Parada = require("../models/Parada");

// Crear una nueva parada
const createParada = async (req, res) => {
    try {
        const { nombre, ubicacion, rutasAsociadas } = req.body;

        const nuevaParada = new Parada({
            nombre,
            ubicacion,
            rutasAsociadas
        });

        await nuevaParada.save();
        res.status(201).json({ message: "Parada creada con éxito", parada: nuevaParada });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la parada", error });
    }
};

// Obtener todas las paradas
const getAllParadas = async (req, res) => {
    try {
        const paradas = await Parada.find().populate("rutasAsociadas");
        res.status(200).json(paradas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las paradas", error });
    }
};

// Obtener una parada por ID
const getParadaById = async (req, res) => {
    try {
        const { id } = req.params;
        const parada = await Parada.findById(id).populate("rutasAsociadas");

        if (!parada) {
            return res.status(404).json({ message: "Parada no encontrada" });
        }

        res.status(200).json(parada);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la parada", error });
    }
};

// Actualizar una parada por ID
const updateParada = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, ubicacion, rutasAsociadas } = req.body;

        const paradaActualizada = await Parada.findByIdAndUpdate(
            id,
            { nombre, ubicacion, rutasAsociadas },
            { new: true }
        );

        if (!paradaActualizada) {
            return res.status(404).json({ message: "Parada no encontrada" });
        }

        res.status(200).json({ message: "Parada actualizada", parada: paradaActualizada });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la parada", error });
    }
};

// Eliminar una parada por ID
const deleteParada = async (req, res) => {
    try {
        const { id } = req.params;
        const paradaEliminada = await Parada.findByIdAndDelete(id);

        if (!paradaEliminada) {
            return res.status(404).json({ message: "Parada no encontrada" });
        }

        res.status(200).json({ message: "Parada eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la parada", error });
    }
};

module.exports = {
    createParada,
    getAllParadas,
    getParadaById,
    updateParada,
    deleteParada
};
