const express = require("express");
const router = express.Router();
const DriverController = require("../controllers/DriverController");

// Rutas del conductor
router.post("/", DriverController.createDriver);
router.get("/", DriverController.getAllDrivers);
router.get("/:id", DriverController.getDriverById);
router.put("/:id", DriverController.updateDriver);
router.delete("/:id", DriverController.deleteDriver);

module.exports = router;
