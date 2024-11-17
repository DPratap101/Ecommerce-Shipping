const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    warehouseId: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
});

const Warehouse = mongoose.model('warehouse', warehouseSchema);

module.exports = Warehouse;
