const mongoose = require('mongoose');

const conductorSchema = new mongoose.Schema({
    nombre: { type: String, required: true }, // Nombre completo del conductor
    email: { type: String, required: true, unique: true }, // Email único
    password: { type: String, required: true }, // Contraseña (encriptada)
    licencia: { type: String, required: true, unique: true }, // Número de licencia único
    telefono: { type: String, required: true }, // Teléfono de contacto
    direccion: { type: String, required: false }, // Dirección opcional
    estado: { type: String, enum: ['activo', 'suspendido'], default: 'activo' }, // Estado del conductor
    busesAsignados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }], // Relación con buses
    fechaCreacion: { type: Date, default: Date.now } // Fecha de registro
});

const Conductor = mongoose.model('Conductor', conductorSchema);

module.exports = Conductor;
