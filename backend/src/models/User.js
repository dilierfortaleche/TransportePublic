const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Para encriptar la contraseña

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true }, // Elimina espacios extra
    email: { type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, 'Por favor, ingresa un email válido'] // Validación de email
    },
    password: { type: String, required: true },
    rol: { type: String, enum: ['admin', 'conductor', 'pasajero'], default: 'pasajero' },
    fechaCreacion: { type: Date, default: Date.now }
});

// 🔒 Encripta la contraseña antes de guardarla
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
