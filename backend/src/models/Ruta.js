const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true }, // Nombre de la ruta
    empresa: { type: String, required: true }, // Empresa propietaria de la ruta
    puntosGPS: [{ 
        lat: { type: Number, required: true }, 
        lng: { type: Number, required: true } 
    }], // Coordenadas de la ruta
    busesAsignados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }], // Buses que operan en la ruta
    fechaCreacion: { type: Date, default: Date.now }
});

const Routes = mongoose.model('Ruta', routeSchema);

module.exports = Routes;
