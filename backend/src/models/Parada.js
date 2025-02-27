const mongoose = require('mongoose');

const paradaSchema = new mongoose.Schema({
    nombre: { type: String, required: true }, // Nombre de la parada
    ubicacion: { 
        lat: { type: Number, required: true }, // Latitud
        lng: { type: Number, required: true }  // Longitud
    }, // Ubicación GPS de la parada
    rutasAsociadas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ruta' }], // Rutas que pasan por esta parada
    fechaCreacion: { type: Date, default: Date.now } // Fecha de registro
});

const Parada = mongoose.model('Parada', paradaSchema);

module.exports = Parada;
