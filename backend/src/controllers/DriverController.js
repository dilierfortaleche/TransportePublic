const Conductor = require("../models/Driver");
const bcrypt = require("bcrypt");

// Crear un nuevo conductor
const createDriver = async (req, res) => {
    try {
        const { nombre, email, password, licencia, telefono, direccion, estado } = req.body;

        // Verificar si el conductor ya existe por email o licencia
        const existingDriver = await Conductor.findOne({ $or: [{ email }, { licencia }] });
        if (existingDriver) {
            return res.status(400).json({ message: "El email o la licencia ya están registrados" });
        }

        // Encriptar contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoConductor = new Conductor({
            nombre,
            email,
            password: hashedPassword,
            licencia,
            telefono,
            direccion,
            estado
        });

        await nuevoConductor.save();
        res.status(201).json({ message: "Conductor creado con éxito", driver: nuevoConductor });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el conductor", error });
    }
};

// Obtener todos los conductores
const getAllDrivers = async (req, res) => {
    try {
        const conductores = await Conductor.find().populate("busesAsignados"); // Agrega los buses asignados
        res.status(200).json(conductores);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los conductores", error });
    }
};

// Obtener un conductor por ID
const getDriverById = async (req, res) => {
    try {
        const { id } = req.params;
        const conductor = await Conductor.findById(id).populate("busesAsignados");
        if (!conductor) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }
        res.status(200).json(conductor);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el conductor", error });
    }
};

// Actualizar un conductor
const updateDriver = async (req, res) => {
    try {
        const { id } = req.params;
        let updates = req.body;

        // Si se actualiza la contraseña, encriptarla antes de guardar
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedDriver = await Conductor.findByIdAndUpdate(id, updates, { new: true }).populate("busesAsignados");
        if (!updatedDriver) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }
        res.status(200).json({ message: "Conductor actualizado con éxito", driver: updatedDriver });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el conductor", error });
    }
};

// Eliminar un conductor
const deleteDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDriver = await Conductor.findByIdAndDelete(id);
        if (!deletedDriver) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }
        res.status(200).json({ message: "Conductor eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el conductor", error });
    }
};

module.exports = { createDriver, getAllDrivers, getDriverById, updateDriver, deleteDriver };
