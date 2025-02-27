const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true }, // Nombre del bus
    placa: { type: String, required: true, unique: true }, // Placa única
    descripcion: { type: String, default: '' }, // Descripción opcional
    capacidad: { type: Number, required: true, min: 1 }, // Capacidad de pasajeros
    empresa: { type: String, required: true }, // Empresa propietaria del bus
    rutaAsignada: { type: String, required: true }, // Ruta en la que opera
    conductor: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: false }, // Conductor del bus
    estado: { type: String, enum: ['activo', 'mantenimiento', 'fuera de servicio'], default: 'activo' }, // Estado del bus
    fechaCreacion: { type: Date, default: Date.now } // Fecha de registro
});

// Corregido: Cambiar nombre al modelo para evitar sobrescribir la constante del esquema
const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
