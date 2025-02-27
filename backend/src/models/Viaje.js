const mongoose = require('mongoose');

const viajeSchema = new mongoose.Schema({
    pasajero: { type: mongoose.Schema.Types.ObjectId, ref: 'Pasajero', required: true },
    ruta: { type: mongoose.Schema.Types.ObjectId, ref: 'Ruta', required: true },
    bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
    puntoInicio: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    puntoDestino: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    costo: { type: Number, required: true }, // Precio del viaje
    fechaHora: { type: Date, default: Date.now } // Fecha del viaje
});

const Viaje = mongoose.model('Viaje', viajeSchema);

module.exports = Viaje;
