const express = require("express");
const router = express.Router();
const BusController = require("../controllers/BusController");

// Rutas del bus
router.post("/", BusController.createBus);
router.get("/", BusController.getAllBuses);
router.get("/:id", BusController.getBusById);
router.put("/:id", BusController.updateBus);
router.delete("/:id", BusController.deleteBus);

module.exports = router;
