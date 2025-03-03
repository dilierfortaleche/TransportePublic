const express = require("express");
const connectDB = require("./src/config/db");
const UserRoutes = require("./src/routes/UserRouter");
const busRoutes = require("./src/routes/BusRouter");
const driverRoutes = require("./src/routes/DriverRouter");
const paradaRoutes = require("./src/routes/ParadaRouter");
const rutaRoutes = require("./src/routes/RutaRouter");
const viajeRoutes = require("./src/routes/ViajeRouter");
const cors = require("cors");

const app = express();

// Conexión a MongoDB
require("dotenv").config();
connectDB();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Rutas
app.use("/api/User", UserRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/paradas", paradaRoutes); // Rutas para paradas
app.use("/api/rutas", rutaRoutes); // Rutas de transporte
app.use("/api/viajes", viajeRoutes); // Rutas para viajes

// Inicialización del servidor
const PORT = process.env.PORT || 5000; // Valor por defecto en caso de que PORT no esté definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
