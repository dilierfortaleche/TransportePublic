const express = require('express');
const connectDB = require('./src/config/db');
const UserRoutes = require('./src/routes/UserRouter');
const busRoutes = require('./src/routes/BusRouter');
const driverRoutes = require("./src/routes/DriverRouter");
const paradaRoutes = require("./routes/ParadaRouter");
const rutaRoutes = require("./routes/RutaRouter");
const viajeRoutes = require("./routes/ViajeRouter");
const cors = require('cors');
const app = express();

//conecon a mongoDB
require('dotenv').config();
connectDB();

//todas las apps
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use('/api/User', UserRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/paradas", paradaRoutes); // Rutas para paradas
app.use("/api/rutas", rutaRoutes); // Rutas para rutas de transporte
app.use("/api/viajes", viajeRoutes); // Rutas para viajes



//la conexion para prender el backend
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server  corriendo en http://localhost:${PORT}`);
});