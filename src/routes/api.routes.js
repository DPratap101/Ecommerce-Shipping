const express = require('express');
const warehouseController = require('../controllers/warehouse.controller');


const router = express.Router();

// Warehouse Routes
router.get('/warehouses', warehouseController.getAllWarehouses);
router.post('/warehouses', warehouseController.createWarehouse);



module.exports = router;
