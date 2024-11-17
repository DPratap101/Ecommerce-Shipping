const Warehouse = require('../models/warehouses.model');
const redisClient = require('../utils/redisClient.utils');

// Get all warehouses from DB with Redis cache
const getAllWarehouses = async (req, res) => {
    try {
        const cachedWarehouses = await redisClient.get('warehouses');
        
        if (cachedWarehouses) {
            return res.status(200).json(JSON.parse(cachedWarehouses));
        }
        
        const warehouses = await Warehouse.find();
        redisClient.setEx('warehouses', 3600, JSON.stringify(warehouses)); // Cache for 1 hour
        res.status(200).json(warehouses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create new warehouse
const createWarehouse = async (req, res) => {
    const { warehouseId, location } = req.body;
    const newWarehouse = new Warehouse({ warehouseId, location });

    try {
        await newWarehouse.save();
        redisClient.del('warehouses'); // Invalidate cache
        res.status(201).json(newWarehouse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllWarehouses, createWarehouse };
