const Bus = require("../models/Bus");

// Crear un nuevo bus
const createBus = async (req, res) => {
    try {
        const { nombre, placa, descripcion, capacidad, empresa, rutaAsignada, conductor, estado } = req.body;
        const nuevoBus = new Bus({ 
            nombre, 
            placa, 
            descripcion, 
            capacidad, 
            empresa, 
            rutaAsignada, 
            conductor, 
            estado 
        });
        await nuevoBus.save();
        res.status(201).json({ message: "Bus creado con éxito", bus: nuevoBus });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el bus", error });
    }
};

// Obtener todos los buses
const getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.find().populate("conductor"); // Agrega los datos del conductor si está referenciado
        res.status(200).json(buses);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los buses", error });
    }
};

// Obtener un bus por ID
const getBusById = async (req, res) => {
    try {
        const { id } = req.params;
        const bus = await Bus.findById(id).populate("conductor");
        if (!bus) {
            return res.status(404).json({ message: "Bus no encontrado" });
        }
        res.status(200).json(bus);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el bus", error });
    }
};

// Actualizar un bus
const updateBus = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBus = await Bus.findByIdAndUpdate(id, req.body, { new: true }).populate("conductor");
        if (!updatedBus) {
            return res.status(404).json({ message: "Bus no encontrado" });
        }
        res.status(200).json({ message: "Bus actualizado con éxito", bus: updatedBus });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el bus", error });
    }
};

// Eliminar un bus
const deleteBus = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBus = await Bus.findByIdAndDelete(id);
        if (!deletedBus) {
            return res.status(404).json({ message: "Bus no encontrado" });
        }
        res.status(200).json({ message: "Bus eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el bus", error });
    }
};

module.exports = { createBus, getAllBuses, getBusById, updateBus, deleteBus };
